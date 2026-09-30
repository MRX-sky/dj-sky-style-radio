[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

$broadcastRoot = Split-Path -Parent $PSCommandPath
$configPath = Join-Path $broadcastRoot "caster.config.json"
$musicPath = Join-Path $broadcastRoot "music"
$runtimePath = Join-Path $broadcastRoot "runtime"

function Stop-WithMessage([string]$Message) {
  Write-Host ""
  Write-Host $Message -ForegroundColor Red
  Write-Host "Відкрийте broadcast\README.md і виконайте підготовку." -ForegroundColor Yellow
  exit 1
}

function Get-MusicFiles {
  $supportedExtensions = ".mp3", ".m4a", ".aac", ".ogg", ".wav"
  return @(
    Get-ChildItem -LiteralPath $musicPath -File -Recurse -ErrorAction SilentlyContinue |
      Where-Object { $supportedExtensions -contains $_.Extension.ToLowerInvariant() }
  )
}

function ConvertTo-ConcatLine([string]$Path) {
  $normalizedPath = $Path.Replace("\", "/").Replace("'", "'\\''")
  return "file '$normalizedPath'"
}

if (-not (Test-Path -LiteralPath $configPath)) {
  Stop-WithMessage "Не знайдено файл налаштувань caster.config.json."
}

if (-not (Test-Path -LiteralPath $musicPath)) {
  Stop-WithMessage "Не знайдено папку з музикою broadcast\music."
}

try {
  $config = Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
} catch {
  Stop-WithMessage "Не вдалося прочитати caster.config.json. Перевірте його формат."
}

$requiredSettings = "host", "port", "mountPoint", "username", "password"
foreach ($setting in $requiredSettings) {
  if ([string]::IsNullOrWhiteSpace([string]$config.$setting) -or [string]$config.$setting -like "ВСТАВТЕ_*") {
    Stop-WithMessage "У caster.config.json не заповнено поле: $setting"
  }
}

$ffmpegCommand = Get-Command "ffmpeg.exe" -ErrorAction SilentlyContinue
if (-not $ffmpegCommand) {
  $ffmpegCommand = Get-Command "ffmpeg" -ErrorAction SilentlyContinue
}
if (-not $ffmpegCommand) {
  Stop-WithMessage "Не знайдено FFmpeg. Встановіть його за інструкцією у broadcast\README.md."
}

$initialTracks = Get-MusicFiles
if ($initialTracks.Count -eq 0) {
  Stop-WithMessage "У папці broadcast\music немає MP3 або інших підтримуваних аудіофайлів."
}

New-Item -ItemType Directory -Path $runtimePath -Force | Out-Null
$playlistPath = Join-Path $runtimePath "radio-playlist.ffconcat"
$safeMountPoint = "/" + $config.mountPoint.Trim("/")
$bitrate = if ($config.bitrateKbps) { [int]$config.bitrateKbps } else { 96 }
$encodedUser = [uri]::EscapeDataString([string]$config.username)
$encodedPassword = [uri]::EscapeDataString([string]$config.password)
$streamUrl = "icecast://$encodedUser`:$encodedPassword@$($config.host):$($config.port)$safeMountPoint"

Write-Host "DJ_SKY_STYLE RADIO: автоматичний ефір готовий." -ForegroundColor Cyan
Write-Host "Тримаєте це вікно відкритим; Ctrl+C безпечно зупиняє ефір." -ForegroundColor DarkYellow

while ($true) {
  $tracks = Get-MusicFiles
  if ($tracks.Count -eq 0) {
    Stop-WithMessage "Плейлист порожній. Додайте музику у broadcast\music."
  }

  if ($config.shuffle -ne $false -and $tracks.Count -gt 1) {
    $tracks = @($tracks | Get-Random -Count $tracks.Count)
  }

  $playlistLines = @("ffconcat version 1.0") + @($tracks | ForEach-Object { ConvertTo-ConcatLine $_.FullName })
  [System.IO.File]::WriteAllLines($playlistPath, [string[]]$playlistLines, (New-Object System.Text.UTF8Encoding($false)))

  Write-Host "Починаємо чергу з $($tracks.Count) треків..." -ForegroundColor Green
  & $ffmpegCommand.Source `
    -hide_banner `
    -nostdin `
    -re `
    -f concat `
    -safe 0 `
    -i $playlistPath `
    -vn `
    -c:a libmp3lame `
    -b:a "$bitrate`k" `
    -ar 44100 `
    -ac 2 `
    -content_type audio/mpeg `
    -f mp3 `
    $streamUrl

  Write-Host "Ефір зупинився або черга завершилась. Повтор через 5 секунд..." -ForegroundColor Yellow
  Start-Sleep -Seconds 5
}
