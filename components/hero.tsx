"use client";

import { ArrowRight, Play, Radio, Square } from "lucide-react";
import Link from "next/link";
import { LiveIndicator } from "@/components/live-indicator";
import { useRadio } from "@/components/radio-provider";

export function Hero() {
  const { hasCasterWidget, isPlaying, status, togglePlayback } = useRadio();
  const isLoading = status === "loading";

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />
      <div className="shell hero-content">
        <div className="hero-copy">
          <p className="eyebrow"><Radio size={15} aria-hidden="true" /> НЕЗАЛЕЖНЕ ОНЛАЙН-РАДІО</p>
          <h1 id="hero-title">DJ_SKY_STYLE <span>RADIO</span></h1>
          <p className="hero-subtitle">ОНЛАЙН-РАДІО</p>
          <p className="hero-description">ТВІЙ ЗВУК. ТВОЯ НІЧ. <span>24/7 МУЗИКА • DJ • ВАЙБ</span></p>
          <div className="hero-actions">
            {hasCasterWidget ? (
              <Link className="button button--primary button--large" href="/radio"><Play size={19} fill="currentColor" aria-hidden="true" /> СЛУХАТИ НАЖИВО</Link>
            ) : (
              <button className="button button--primary button--large" type="button" onClick={() => void togglePlayback()}>
                {isPlaying ? <Square size={18} fill="currentColor" aria-hidden="true" /> : <Play size={19} fill="currentColor" aria-hidden="true" />}
                {isLoading ? "З’ЄДНАННЯ…" : isPlaying ? "ПАУЗА" : "СЛУХАТИ НАЖИВО"}
              </button>
            )}
            <Link className="button button--ghost" href="/schedule"><ArrowRight size={17} aria-hidden="true" /> ДИВИТИСЯ РОЗКЛАД</Link>
          </div>
          <LiveIndicator />
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-disc">
            <div className="hero-disc__ring hero-disc__ring--outer" />
            <div className="hero-disc__ring hero-disc__ring--middle" />
            <div className="hero-disc__center">DJ<br />SKY</div>
          </div>
          <div className="hero-frequency">FM <span>∞</span> 24/7</div>
          <div className="hero-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      <Link className="scroll-cue" href="/radio" aria-label="Перейти до плеєра"><span /> ПЕРЕЙТИ ДО ЕФІРУ</Link>
    </section>
  );
}
