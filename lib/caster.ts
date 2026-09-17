export type Track = {
  artist: string;
  title: string;
  artwork?: string;
};

export type RadioMetadata = {
  nowPlaying?: Track;
  listeners?: number;
  history?: Track[];
  isOnline?: boolean;
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function asText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) return Number(value);
  return undefined;
}

function isLibraryPrefix(value: string) {
  return /^(?:\d{2,3}(?:\.\d+)?|\d{1,2}[AB]|[A-G](?:#|b)?m?)$/i.test(value);
}

function parseTrackTitle(value: unknown, fallbackArtist = "DJ_SKY_STYLE RADIO"): Track | undefined {
  const raw = asText(value);
  if (!raw) return undefined;
  const parts = raw.replace(/^[-–—]\s*/, "").split(/\s+[-–—]\s+/).map((part) => part.trim()).filter(Boolean);
  while (parts.length >= 3 && isLibraryPrefix(parts[0])) parts.shift();
  if (parts.length > 1) {
    const artist = parts.shift();
    const title = parts.join(" — ").trim();
    if (artist && title) return { artist, title };
  }
  return { artist: fallbackArtist, title: raw };
}

function toTrack(value: unknown): Track | undefined {
  if (typeof value === "string") return parseTrackTitle(value);
  const item = asRecord(value);
  if (!item) return undefined;
  const artist = asText(item.artist) ?? asText(item.dj);
  const title = asText(item.title) ?? asText(item.track) ?? asText(item.name);
  const artwork = asText(item.artwork) ?? asText(item.cover) ?? asText(item.image);
  if (!title) return undefined;
  if (!artist) {
    const parsed = parseTrackTitle(title);
    return parsed ? { ...parsed, ...(artwork ? { artwork } : {}) } : undefined;
  }
  return { artist, title, ...(artwork ? { artwork } : {}) };
}

function uniqueTracks(tracks: Track[]): Track[] {
  const seen = new Set<string>();
  return tracks.filter((track) => {
    const key = `${track.artist}\u0000${track.title}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Reads Caster.fm's public Icecast JSON: https://domain:port/admin/publicstats.json */
function normalizeIcecastPayload(payload: unknown, mountPoint?: string): RadioMetadata | null {
  const root = Array.isArray(payload)
    ? payload.map(asRecord).find((item) => item && asRecord(item.source)) ?? null
    : asRecord(payload);
  if (!root) return null;
  const sources = asRecord(root.source);
  if (!sources) return null;
  const source =
    (mountPoint ? asRecord(sources[mountPoint]) : null) ??
    Object.values(sources).map(asRecord).find(Boolean) ??
    null;
  if (!source) return null;

  const sourceMetadata = asRecord(source.metadata);
  const nowPlaying = parseTrackTitle(source["display-title"] ?? sourceMetadata?.x_icy_title ?? source.title);
  const playlist = asRecord(asRecord(source.playlist)?.playlist)?.track;
  const history = Array.isArray(playlist)
    ? uniqueTracks(playlist.map(toTrack).filter((track): track is Track => Boolean(track)).reverse())
    : undefined;
  return { nowPlaying, listeners: asNumber(source.listeners), history, isOnline: true };
}

/** Converts Caster.fm public Icecast status or a documented custom endpoint into the UI shape. */
export function normalizeCasterPayload(payload: unknown, mountPoint?: string): RadioMetadata | null {
  const icecast = normalizeIcecastPayload(payload, mountPoint);
  if (icecast) return icecast;
  const root = asRecord(payload);
  if (!root) return null;

  const current =
    asRecord(root.nowPlaying) ?? asRecord(root.now_playing) ?? asRecord(root.currentTrack) ??
    asRecord(root.current_track) ?? asRecord(root.song) ?? root;
  const artist = asText(current.artist) ?? asText(current.dj) ?? asText(root.artist);
  const title = asText(current.title) ?? asText(current.track) ?? asText(current.name) ?? asText(root.title);
  const artwork = asText(current.artwork) ?? asText(current.cover) ?? asText(current.image) ?? asText(root.artwork);
  const parsedCurrent = artist && title
    ? { artist, title, ...(artwork ? { artwork } : {}) }
    : parseTrackTitle(title);
  const rawHistory = root.history ?? root.recentlyPlayed ?? root.recently_played;
  const history = Array.isArray(rawHistory)
    ? uniqueTracks(rawHistory.map(toTrack).filter((track): track is Track => Boolean(track)))
    : undefined;
  const listeners = asNumber(root.listeners) ?? asNumber(root.listenerCount) ?? asNumber(root.listener_count);
  const online = root.isOnline ?? root.online ?? root.status;
  const isOnline = typeof online === "boolean"
    ? online
    : typeof online === "string"
      ? online.toLowerCase() === "online" || online.toLowerCase() === "live"
      : undefined;
  if (!parsedCurrent && listeners === undefined && !history && isOnline === undefined) return null;
  return { nowPlaying: parsedCurrent, listeners, history, isOnline };
}
