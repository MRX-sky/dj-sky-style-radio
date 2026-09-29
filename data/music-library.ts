export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  source: string;
};

/**
 * The station's self-hosted playlist.
 *
 * Put the licensed MP3 files into public/music using these file names, then
 * update the artist/title data below. The player continues with the next track
 * automatically after a listener presses the first Play button.
 */
export const musicLibrary: MusicTrack[] = [
  {
    id: "night-drive-01",
    title: "Нічний сет 01",
    artist: "DJ_SKY_STYLE",
    genre: "Dance / House",
    source: "/music/dj-sky-night-01.mp3",
  },
  {
    id: "night-drive-02",
    title: "Нічний сет 02",
    artist: "DJ_SKY_STYLE",
    genre: "Club / Electro",
    source: "/music/dj-sky-night-02.mp3",
  },
  {
    id: "night-drive-03",
    title: "Нічний сет 03",
    artist: "DJ_SKY_STYLE",
    genre: "Deep / Progressive",
    source: "/music/dj-sky-night-03.mp3",
  },
  {
    id: "night-drive-04",
    title: "Нічний сет 04",
    artist: "DJ_SKY_STYLE",
    genre: "Pop Dance",
    source: "/music/dj-sky-night-04.mp3",
  },
];
