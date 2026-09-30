"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ListMusic, Radio, Shuffle, Volume2 } from "lucide-react";
import { useState } from "react";
import { musicLibrary } from "@/data/music-library";

export function MusicLibraryPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const currentTrack = musicLibrary[trackIndex];

  const moveTrack = (offset: number) => {
    setTrackIndex((index) => (index + offset + musicLibrary.length) % musicLibrary.length);
  };

  const chooseRandomTrack = () => {
    if (musicLibrary.length < 2) return;
    let nextIndex = trackIndex;
    while (nextIndex === trackIndex) nextIndex = Math.floor(Math.random() * musicLibrary.length);
    setTrackIndex(nextIndex);
  };

  return (
    <section className="section music-library-section" aria-labelledby="music-library-heading">
      <div className="shell">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker"><ListMusic size={15} aria-hidden="true" /> БАЗА МУЗИКИ</div>
            <h2>ЧЕРГА <span>ЕФІРУ</span></h2>
          </div>
          <p className="section-aside" id="music-library-heading">У базі {musicLibrary.length} MP3. Запускатор перемішує їх і сам переходить до наступного треку в ефірі.</p>
        </div>

        <div className="music-library-layout">
          <article className="library-player-card">
            <div className="library-player-card__topline"><span>{musicLibrary.length} MP3 У БАЗІ</span><Shuffle size={17} aria-hidden="true" /> АВТОЧЕРГА</div>
            <div className="library-record" aria-hidden="true"><span>DJ<br />SKY</span></div>
            <p className="library-player-card__genre">ОБРАНО ДЛЯ ПЕРЕГЛЯДУ</p>
            <h3 title={currentTrack.title}>{currentTrack.title}</h3>
            <p className="library-player-card__artist">Трек {trackIndex + 1} із {musicLibrary.length} · {currentTrack.genre}</p>
            <div className="library-controls">
              <button type="button" onClick={() => moveTrack(-1)} aria-label="Попередній трек у списку"><ChevronLeft size={22} aria-hidden="true" /></button>
              <button className="library-play-button" type="button" onClick={chooseRandomTrack} aria-label="Показати випадковий трек"><Shuffle size={24} aria-hidden="true" /></button>
              <button type="button" onClick={() => moveTrack(1)} aria-label="Наступний трек у списку"><ChevronRight size={22} aria-hidden="true" /></button>
            </div>
            <p className="library-launch-label">МУЗИКА ГРАЄ ЧЕРЕЗ ЕФІР CASTER.FM</p>
            <Link className="button button--primary library-live-link" href="/radio"><Radio size={16} aria-hidden="true" /> СЛУХАТИ ЕФІР</Link>
            <p className="library-player-card__status"><Volume2 size={15} aria-hidden="true" /> Запустіть `Запустити-радіо.cmd` на комп’ютері — черга працюватиме автоматично, а слухачі підключатимуться на сторінці радіо.</p>
          </article>

          <ol className="music-queue" aria-label="Черга треків для ефіру">
            {musicLibrary.map((track, index) => (
              <li className={index === trackIndex ? "is-current" : ""} key={track.id}>
                <button type="button" onClick={() => setTrackIndex(index)}>
                  <span className="music-queue__number">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{track.title}</strong><em>{track.artist} · {track.genre}</em></span>
                  {index === trackIndex ? <span className="music-queue__playing">ОБРАНО</span> : <ListMusic size={16} aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
