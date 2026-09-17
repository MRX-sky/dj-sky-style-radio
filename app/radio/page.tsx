import type { Metadata } from "next";
import { NowPlaying } from "@/components/now-playing";
import { PageHero } from "@/components/page-hero";
import { RadioPlayer } from "@/components/radio-player";

export const metadata: Metadata = { title: "Ефір — DJ_SKY_STYLE RADIO" };

export default function RadioPage() {
  return <><PageHero index="1" eyebrow="ПРЯМИЙ СИГНАЛ" title="ЖИВИЙ" outline="ЕФІР" description="Увімкніть хвилю DJ_SKY_STYLE RADIO та залишайтеся в ритмі ночі." /><RadioPlayer /><NowPlaying /></>;
}
