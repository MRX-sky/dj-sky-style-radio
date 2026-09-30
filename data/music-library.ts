export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  fileName: string;
};

/**
 * The tracks stored locally in broadcast/music and sent to Caster.fm by
 * broadcast/start-radio.ps1. The audio files deliberately are not public.
 */
const importedMp3Files = [
  "4A - 126 - Libercio feat. Гриша Virus & GENESI, Wave Wave, Roland Clark - We Are Ukranians (DJ Chino x DJ De Maxwill Mashup).mp3",
  "100лиця - КАРІ ОЧІ (DJ VANYO Mashup) [Extended Mix].mp3",
  "100лиця - Привіт (Nick de Grand MashUp).mp3",
  "Анна Трінчер - No cocaina (Wed Hoill x Andreich Edit) (Extended Mix).mp3",
  "Антитіла - Вдома (Uno Kaya Remix) [Extended Mix].mp3",
  "АНТИТІЛА x STADiUMX - ЛЕТИ (Ocean Dee Edit) [Radio].mp3",
  "Артем Пивоваров - 2000 (Wed Hoill x Andreich Edit) (Extended Mix).mp3",
  "Артем Пивоваров & Quest Pistols-Очі (Wed Hoill MashUp) (Extended Mix).mp3",
  "Артем Пивоваров & The Вуса & Ірина Білик & Даша Астафʼєва & Лєра Мандзюк - YABADABADU ( CHINO Melodic Edit ) Radio .mp3",
  "Артем Пивоваров & The Вуса x Kalush - Підманула (Ocean Dee Edit) [Radio].mp3",
  "Артем Пивоваров х Оля Полякова x KREAM - Тішся (Ocean Dee Edit) [Extended Mix] G#M.mp3",
  "Артем Пивоваров х KOLA x Anyma - Ніч яка місячна (Ocean Dee Edit) [Extended Mix] #DM.mp3",
  "Артем Пивоваров x Datskie & Moon Kyoo - Блакить твоїх очей (Ocean Dee Edit) [Radio].mp3",
  "Бумбокс x Cendryma - Живий (Ocean Dee Edit) [Extended Mix] #EM.mp3",
  "Вера Кекелия x Afrosalto - Мовчати (Ocean Dee Edit) [Extended Mix] G#M.mp3",
  "Віталій Лобач, Alex Dee x Eugene Star - Федеріко Феліні (DJ De Maxwill x DJ Chino Saxxy Edit)[Radio Edit].mp3",
  "Енджі Крейда x Majestic - Враже (Ocean Dee Edit) [Radio].mp3",
  "Іван Дорн x Diverse Bind – Тебе нема сьогодні (Ocean Dee Edit) [Extended Mix] #GM.mp3",
  "Маша Кондратенко х OSTY - Білі ночі ( CHINO Afro Edit ) Radio .mp3",
  "Маша Кондратенко x Ferry Corsten - No Time To Cry (Ocean Dee Edit) [Radio].mp3",
  "Микола Серпень - Серпень (Yaroslav Tretiak Remix) [Radio Edit].mp3",
  "Міша Крупін - Пароль (DJ VANYO Mashup) [Extended Mix].mp3",
  "Міша Крупін - Пароль (DJ VANYO Mashup) [Radio Edit].mp3",
  "Настя Борщ & Шугар - Йо-Йо ( CHINO Edit ) Radio .mp3",
  "Океан Ельзи - Обійми (Wed Hoill Edit) [Extended Mix].mp3",
  "Океан Ельзи x Tiesto - Як ніколи (Ocean Dee Edit) [Extended Mix] #AM.mp3",
  "Океан Ельзиx & Cosmic Gate - Квітка (Ocean Dee Edit) [Radio].mp3",
  "Олена Тополя & EDGAR TI x Cedric Gervais - Чуєш (Ocean Dee Edit) [Extended Mix] G#M.mp3",
  "Олена Тополя & EDGAR TI x Cedric Gervais - Чуєш (Ocean Dee Edit) [Radio].mp3",
  "Очі В Очі -Симфонія (Wed Hoill MashUp) (Extended Mix).mp3",
  "ОЧІ В ОЧІ x Agents Of Time - Душа (Ocean Dee Edit) [Extended Mix] A#M.mp3",
  "ОЧІ В Очі x EDX - Зачекай (Ocean Dee Edit) [Extended Mix] G#M.mp3",
  "ОЧІ В Очі x Yeadon - Симфонія (Ocean Dee Edit) [Extended Mix] A#M.mp3",
  "Плач Єремії x Jesabel - Вона (Ocean Dee Edit) [Extended Mix] #AM.mp3",
  "ТІНА КАРОЛЬ & SADSVIT x Robby East - МИ (Ocean Dee Edit) [Radio].mp3",
  "ТНМК x Linka - ПМ’ТЙ (Ocean Dee Edit) [Extended Mix] #BM.mp3",
] as const;

export const musicLibrary: MusicTrack[] = importedMp3Files.map((fileName, index) => ({
  id: `dj-sky-track-${String(index + 1).padStart(2, "0")}`,
  title: fileName.replace(/\.mp3$/i, ""),
  artist: "Українська танцювальна добірка",
  genre: "Dance / Mashup",
  fileName,
}));
