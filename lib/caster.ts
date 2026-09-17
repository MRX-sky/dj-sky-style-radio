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
  return typeof value === "object" && value !== null
    ? (value as UnknownRecord)
    : null;
}

function asText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return undefined;
}

/**
 * Converts a documented Caster.fm response into the neutral UI shape.
 *
 * Caster.fm endpoint/response formats vary by plan and are not assumed here.
 * Once you have the documented endpoint, set CASTER_API_URL and, if needed,
 * adjust this mapping to the exact JSON fields it returns.
 */
export function normalizeCasterPayload(payload: unknown): RadioMetadata | null {
  const root = asRecord(payload);
  if (!root) return null;

  const current =
    asRecord(root.nowPlaying) ??
    asRecord(root.now_playing) ??
    asRecord(root.currentTrack) ??
    asRecord(root.current_track) ??
    asRecord(root.song) ??
    root;

  const artist = asText(current.artist) ?? asText(current.dj) ?? asText(root.artist);
  const title =
    asText(current.title) ??
    asText(current.track) ??
    asText(current.name) ??
    asText(root.title);
  const artwork =
    asText(current.artwork) ??
    asText(current.cover) ??
    asText(current.image) ??
    asText(root.artwork);

  const rawHistory = root.history ?? root.recentlyPlayed ?? root.recently_played;
  const history: Track[] | undefined = Array.isArray(rawHistory)
    ? rawHistory.reduce<Track[]>((tracks, entry) => {
        const item = asRecord(entry);
        if (!item) return tracks;
        const entryArtist = asText(item.artist) ?? asText(item.dj);
        const entryTitle = asText(item.title) ?? asText(item.track) ?? asText(item.name);
        if (!entryArtist || !entryTitle) return tracks;
        const entryArtwork = asText(item.artwork) ?? asText(item.cover);
        tracks.push({
          artist: entryArtist,
          title: entryTitle,
          ...(entryArtwork ? { artwork: entryArtwork } : {}),
        });
        return tracks;
      }, [])
    : undefined;

  const listeners =
    asNumber(root.listeners) ??
    asNumber(root.listenerCount) ??
    asNumber(root.listener_count);
  const online = root.isOnline ?? root.online ?? root.status;
  const isOnline =
    typeof online === "boolean"
      ? online
      : typeof online === "string"
        ? online.toLowerCase() === "online" || online.toLowerCase() === "live"
        : undefined;

  if (!artist && !title && listeners === undefined && !history && isOnline === undefined) {
    return null;
  }

  return {
    nowPlaying: artist && title ? { artist, title, artwork } : undefined,
    listeners,
    history,
    isOnline,
  };
}
