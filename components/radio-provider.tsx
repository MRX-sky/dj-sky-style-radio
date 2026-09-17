"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { radioConfig } from "@/config/radio";
import type { RadioMetadata } from "@/lib/caster";

type PlayerStatus = "idle" | "loading" | "playing" | "offline" | "error" | "unconfigured";

type RadioContextValue = {
  status: PlayerStatus;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  metadata: RadioMetadata | null;
  hasStream: boolean;
  hasCasterWidget: boolean;
  errorMessage: string | null;
  togglePlayback: () => Promise<void>;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  refreshMetadata: () => Promise<void>;
};

const RadioContext = createContext<RadioContextValue | null>(null);

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<PlayerStatus>(
    radioConfig.streamUrl ? "idle" : "unconfigured",
  );
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [metadata, setMetadata] = useState<RadioMetadata | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshMetadata = useCallback(async () => {
    try {
      const response = await fetch("/api/radio", { cache: "no-store" });
      if (!response.ok) return;
      const result = (await response.json()) as {
        available?: boolean;
        metadata?: RadioMetadata | null;
      };
      if (result.available && result.metadata) setMetadata(result.metadata);
    } catch {
      // Optional metadata must never interrupt listening.
    }
  }, []);

  useEffect(() => {
    void refreshMetadata();
    const poll = window.setInterval(() => void refreshMetadata(), 20_000);
    return () => window.clearInterval(poll);
  }, [refreshMetadata]);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!radioConfig.streamUrl || !audio) {
      setStatus("unconfigured");
      setErrorMessage("Додайте NEXT_PUBLIC_RADIO_STREAM_URL до .env.local, щоб запустити потік.");
      return;
    }

    if (!audio.paused) {
      audio.pause();
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);
    try {
      await audio.play();
    } catch {
      setStatus("error");
      setErrorMessage("Не вдалося підключитися до радіопотоку.");
    }
  }, []);

  const setVolume = useCallback((value: number) => {
    const safeVolume = Math.min(1, Math.max(0, value));
    const audio = audioRef.current;
    if (audio) {
      audio.volume = safeVolume;
      if (safeVolume > 0) audio.muted = false;
    }
    setVolumeState(safeVolume);
    if (safeVolume > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const value = useMemo<RadioContextValue>(
    () => ({
      status,
      isPlaying: status === "playing",
      volume,
      isMuted,
      metadata,
      hasStream: Boolean(radioConfig.streamUrl),
      hasCasterWidget: Boolean(radioConfig.casterWidgetToken),
      errorMessage,
      togglePlayback,
      setVolume,
      toggleMute,
      refreshMetadata,
    }),
    [
      errorMessage,
      isMuted,
      metadata,
      refreshMetadata,
      setVolume,
      status,
      toggleMute,
      togglePlayback,
      volume,
    ],
  );

  return (
    <RadioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={radioConfig.streamUrl || undefined}
        preload="none"
        onCanPlay={() => setStatus((current) => (current === "loading" ? "idle" : current))}
        onPlaying={() => setStatus("playing")}
        onPause={() => setStatus((current) => (current === "playing" ? "idle" : current))}
        onError={() => {
          if (radioConfig.streamUrl) {
            setStatus("error");
            setErrorMessage("Не вдалося підключитися до радіопотоку.");
          }
        }}
      />
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);
  if (!context) throw new Error("useRadio must be used inside RadioProvider");
  return context;
}
