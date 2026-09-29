"use client";

import { ChevronLeft, ChevronRight, ListMusic, Pause, Play, Repeat2, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { musicLibrary } from "@/data/music-library";

export function MusicLibraryPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [continuePlaying, setContinuePlaying] = useState(false);
  const [message, setMessage] = useState("Оберіть «Запустити базу», щоб почати відтворення.");
  const currentTrack = musicLibrary[trackIndex];

  const playCurrent = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setMessage("Підключаємо трек…");
    try {
      await audio.play();
      setContinuePlaying(true);
      setIsPlaying(true);
      setMessage("Автоперехід увімкнено: після треку почнеться наступний.");
    } catch {
      setIsPlaying(false);
      setContinuePlaying(false);
      setMessage("Файл ще не знайдено. Додайте ліцензований MP3 у public/music згідно з інструкцією.");
    }
  };

  const pauseCurrent = () => {
    audioRef.current?.pause();
    setContinuePlaying(false);
    setIsPlaying(false);
    setMessage("Відтворення призупинено.");
  };

  const selectTrack = (index: number) => {
    setTrackIndex(index);
    setMessage("Обрано трек. Натисніть «Запустити базу».");
  };

  const moveTrack = (offset: number) => {
    setTrackIndex((index) => (index + offset + musicLibrary.length) % musicLibrary.length);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (continuePlaying) void playCurrent();
    // The track index is the deliberate trigger for automatic queue playback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  return (
    <section className="section music-library-section" aria-labelledby="music-library-heading">
      <div className="shell">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker"><ListMusic size={15} aria-hidden="true" /> БАЗА МУЗИКИ</div>
            <h2 id="music-library-heading">ТВОЯ <span>ЧЕРГА</span></h2>
          </div>
          <p className="section-aside">Після першого запуску треки грають по черзі. Додайте до бази лише музику, на яку маєте права.</p>
        </div>

        <div className="music-library-layout">
          <article className="library-player-card">
            <div className="library-player-card__topline"><span>ЛОКАЛЬНА БАЗА</span><Repeat2 size={17} aria-hidden="true" /> АВТОПЕРЕХІД</div>
            <div className="library-record" aria-hidden="true"><span>DJ<br />SKY</span></div>
            <p className="library-player-card__genre">{currentTrack.genre}</p>
            <h3>{currentTrack.title}</h3>
            <p className="library-player-card__artist">{currentTrack.artist}</p>
            <div className="library-controls">
              <button type="button" onClick={() => moveTrack(-1)} aria-label="Попередній трек"><ChevronLeft size={22} aria-hidden="true" /></button>
              {isPlaying ? (
                <button className="library-play-button" type="button" onClick={pauseCurrent} aria-label="Призупинити базу"><Pause size={24} fill="currentColor" aria-hidden="true" /></button>
              ) : (
                <button className="library-play-button" type="button" onClick={() => void playCurrent()} aria-label="Запустити базу"><Play size={25} fill="currentColor" aria-hidden="true" /></button>
              )}
              <button type="button" onClick={() => moveTrack(1)} aria-label="Наступний трек"><ChevronRight size={22} aria-hidden="true" /></button>
            </div>
            <p className="library-launch-label">{isPlaying ? "База зараз грає" : "Натисніть центральну кнопку, щоб запустити базу"}</p>
            <p className="library-player-card__status"><Volume2 size={15} aria-hidden="true" /> {message}</p>
            <audio
              ref={audioRef}
              preload="metadata"
              src={currentTrack.source}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => moveTrack(1)}
              onError={() => {
                setIsPlaying(false);
                setContinuePlaying(false);
                setMessage("Файл ще не знайдено. Додайте ліцензований MP3 у public/music згідно з інструкцією.");
              }}
            />
          </article>

          <ol className="music-queue" aria-label="Черга треків">
            {musicLibrary.map((track, index) => (
              <li className={index === trackIndex ? "is-current" : ""} key={track.id}>
                <button type="button" onClick={() => selectTrack(index)}>
                  <span className="music-queue__number">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{track.title}</strong><em>{track.artist} · {track.genre}</em></span>
                  {index === trackIndex ? <span className="music-queue__playing">ЗАРАЗ</span> : <Play size={16} aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
