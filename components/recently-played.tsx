"use client";

import { Music4, RadioTower, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRadio } from "@/components/radio-provider";
import type { Track } from "@/lib/caster";

type SavedTrack = Track & { capturedAt: number };
const storageKey = "dj-sky-style-radio-recent-tracks";

function trackKey(track: Track) {
  return `${track.artist}\u0000${track.title}`.toLocaleLowerCase();
}

function sessionTime(timestamp: number) {
  return new Intl.DateTimeFormat("uk-UA", { hour: "2-digit", minute: "2-digit" }).format(timestamp);
}

export function RecentlyPlayed() {
  const { metadata, refreshMetadata } = useRadio();
  const [savedHistory, setSavedHistory] = useState<SavedTrack[]>([]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as SavedTrack[];
      if (Array.isArray(parsed)) setSavedHistory(parsed.filter((track) => track?.artist && track?.title));
    } catch {
      // Browser cache is only a fallback for a visitor's listening session.
    }
  }, []);

  useEffect(() => {
    const track = metadata?.nowPlaying;
    if (!track) return;
    setSavedHistory((current) => {
      const next = [{ ...track, capturedAt: Date.now() }, ...current.filter((item) => trackKey(item) !== trackKey(track))].slice(0, 16);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Visitors can still see Caster.fm's live playlist if storage is unavailable.
      }
      return next;
    });
  }, [metadata?.nowPlaying]);

  const casterHistory = metadata?.history ?? [];
  const history = useMemo(
    () => casterHistory.map((track) => ({ ...track, capturedAt: 0 })).length ? casterHistory.map((track) => ({ ...track, capturedAt: 0 })) : savedHistory,
    [casterHistory, savedHistory],
  );
  const usesLivePlaylist = casterHistory.length > 0;

  return (
    <section id="history" className="section history-section" aria-labelledby="history-heading">
      <div className="shell">
        <div className="section-kicker"><RadioTower size={14} aria-hidden="true" /> ЖИВИЙ МУЗИЧНИЙ СЛІД</div>
        <div className="section-heading-row history-heading-row">
          <div>
            <h2 id="history-heading">ЩО <span>ЗВУЧАЛО</span></h2>
            <p className="history-description">{usesLivePlaylist ? "Плейлист оновлюється прямо зі статусу Caster.fm." : "Нові треки додаються сюди, щойно вони з’являються в ефірі."}</p>
          </div>
          <button className="metadata-refresh" type="button" onClick={() => void refreshMetadata()}><RefreshCw size={15} aria-hidden="true" /> ОНОВИТИ</button>
        </div>
        {history.length ? (
          <ol className="history-list">
            {history.slice(0, 8).map((track, index) => (
              <li key={`${track.artist}-${track.title}-${index}`}>
                <span className="history-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="history-pulse" aria-hidden="true" />
                <strong>{track.artist}</strong>
                <span className="history-separator">—</span>
                <span>{track.title}</span>
                {track.capturedAt ? <time dateTime={new Date(track.capturedAt).toISOString()}>{sessionTime(track.capturedAt)}</time> : <em>LIVE</em>}
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty-state">
            <Music4 size={28} aria-hidden="true" />
            <div><strong>Ефір щойно починається</strong><p>Як тільки Caster.fm передасть назву треку, вона автоматично з’явиться в історії.</p></div>
          </div>
        )}
      </div>
    </section>
  );
}
