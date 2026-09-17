"use client";

import { Radio } from "lucide-react";
import { Equalizer } from "@/components/equalizer";
import { useRadio } from "@/components/radio-provider";

export function LiveIndicator({ compact = false }: { compact?: boolean }) {
  const { isPlaying, metadata, status } = useRadio();
  const isOffline = status === "error" || metadata?.isOnline === false;
  const label = isOffline ? "РАДІО ОФЛАЙН" : isPlaying ? "ЗАРАЗ В ЕФІРІ" : "ПРЯМИЙ ЕФІР";

  return (
    <div className={`live-indicator ${isOffline ? "live-indicator--offline" : ""}`}>
      <span className="live-indicator__dot" aria-hidden="true" />
      <Radio size={compact ? 13 : 15} aria-hidden="true" />
      <span>{label}</span>
      <Equalizer active={isPlaying} compact label={isPlaying ? "Аудіо відтворюється" : "Аудіо призупинено"} />
    </div>
  );
}
