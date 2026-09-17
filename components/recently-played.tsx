"use client";

import { History, Music4 } from "lucide-react";
import { useRadio } from "@/components/radio-provider";

export function RecentlyPlayed() {
  const { metadata } = useRadio();
  const history = metadata?.history ?? [];

  return (
    <section id="history" className="section history-section" aria-labelledby="history-heading">
      <div className="shell">
        <div className="section-kicker">ОСТАННІ ТРАНСЛЯЦІЇ</div>
        <div className="section-heading-row">
          <h2 id="history-heading">ЩО <span>ЗВУЧАЛО</span></h2>
          <History className="section-symbol" size={28} aria-hidden="true" />
        </div>
        {history.length ? (
          <ol className="history-list">
            {history.slice(0, 6).map((track, index) => (
              <li key={`${track.artist}-${track.title}-${index}`}>
                <span className="history-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="history-pulse" aria-hidden="true" />
                <strong>{track.artist}</strong>
                <span className="history-separator">—</span>
                <span>{track.title}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty-state">
            <Music4 size={28} aria-hidden="true" />
            <div><strong>Історія треків з’явиться тут</strong><p>Підключіть документований endpoint метаданих Caster.fm, щоб показати останні треки.</p></div>
          </div>
        )}
      </div>
    </section>
  );
}
