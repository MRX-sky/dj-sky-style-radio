"use client";

import { Disc3, Radio, Users } from "lucide-react";
import { useRadio } from "@/components/radio-provider";
import { stationFallback } from "@/config/radio";

export function NowPlaying() {
  const { metadata } = useRadio();
  const track = metadata?.nowPlaying ?? stationFallback;

  return (
    <section className="section section--tight" aria-labelledby="now-playing-heading">
      <div className="shell now-playing-layout">
        <div>
          <div className="section-kicker">В ЕФІРІ</div>
          <h2 id="now-playing-heading">ЗАРАЗ <span>ЗВУЧИТЬ</span></h2>
        </div>
        <article className="now-playing-card">
          <div className="now-playing-cover" aria-hidden="true">
            {metadata?.nowPlaying?.artwork ? <img src={metadata.nowPlaying.artwork} alt="" /> : <Disc3 size={44} />}
          </div>
          <div className="now-playing-copy">
            <p><Radio size={14} aria-hidden="true" /> ПРЯМИЙ СИГНАЛ</p>
            <h3>{track.title}</h3>
            <span>{track.artist}</span>
          </div>
          {typeof metadata?.listeners === "number" ? (
            <div className="listeners" aria-label={`${metadata.listeners} слухачів`}>
              <Users size={16} aria-hidden="true" /> <strong>{metadata.listeners}</strong> СЛУХАЧІВ
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
