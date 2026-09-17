"use client";

import { Pause, Play, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { LiveIndicator } from "@/components/live-indicator";
import { useRadio } from "@/components/radio-provider";
import { stationFallback } from "@/config/radio";
import { CasterWidgetPlayer } from "@/components/caster-widget-player";

export function RadioPlayer() {
  const {
    errorMessage,
    hasStream,
    hasCasterWidget,
    isMuted,
    isPlaying,
    metadata,
    refreshMetadata,
    setVolume,
    status,
    toggleMute,
    togglePlayback,
    volume,
  } = useRadio();
  const track = metadata?.nowPlaying ?? stationFallback;
  const isLoading = status === "loading";

  return (
    <section id="radio" className="section radio-section" aria-labelledby="radio-heading">
      <div className="shell">
        <div className="section-kicker">ВАША ХВИЛЯ</div>
        <div className="section-heading-row">
          <h2 id="radio-heading">ПЛЕЄР <span>ЕФІРУ</span></h2>
          <LiveIndicator compact />
        </div>
        {hasCasterWidget ? <CasterWidgetPlayer /> : (
        <div className="player-card">
          <div className="player-card__topline" aria-hidden="true"><span /><span /><span /></div>
          <div className="player-track">
            <div className="player-artwork" aria-hidden="true">
              {metadata?.nowPlaying?.artwork ? (
                <img src={metadata.nowPlaying.artwork} alt="" />
              ) : (
                <div className="record-art"><span>DJ</span></div>
              )}
            </div>
            <div className="player-track__copy">
              <p>ЗАРАЗ ТРАНСЛЮЄТЬСЯ</p>
              <h3>{track.artist}</h3>
              <span>{track.title}</span>
            </div>
          </div>

          <div className="player-controls">
            <button
              className="play-button"
              type="button"
              onClick={() => void togglePlayback()}
              aria-label={isPlaying ? "Призупинити радіо" : "Увімкнути радіо"}
              aria-busy={isLoading}
            >
              {isPlaying ? <Pause size={26} fill="currentColor" aria-hidden="true" /> : <Play size={27} fill="currentColor" aria-hidden="true" />}
            </button>
            <div className="stream-status" aria-live="polite">
              <span className={`stream-status__line ${isPlaying ? "stream-status__line--active" : ""}`} />
              <span>{isLoading ? "ПІДКЛЮЧАЄМОСЯ ДО ЕФІРУ" : isPlaying ? "ЕФІР УВІМКНЕНО" : hasStream ? "ГОТОВО ДО ВІДТВОРЕННЯ" : "ПОТРІБЕН URL ПОТОКУ"}</span>
            </div>
          </div>

          <div className="player-bottom">
            <div className="volume-control">
              <button type="button" onClick={toggleMute} aria-label={isMuted ? "Увімкнути звук" : "Вимкнути звук"}>
                {isMuted || volume === 0 ? <VolumeX size={19} aria-hidden="true" /> : <Volume2 size={19} aria-hidden="true" />}
              </button>
              <label className="sr-only" htmlFor="radio-volume">Гучність радіо</label>
              <input
                id="radio-volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </div>
            <button className="metadata-refresh" type="button" onClick={() => void refreshMetadata()} aria-label="Оновити дані поточного треку">
              <RefreshCw size={15} aria-hidden="true" /> ОНОВИТИ
            </button>
          </div>
          {errorMessage ? <p className="player-error" role="status">{errorMessage}</p> : null}
        </div>
        )}
      </div>
    </section>
  );
}
