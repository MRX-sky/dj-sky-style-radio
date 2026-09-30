import type { Metadata } from "next";
import { MusicLibraryPlayer } from "@/components/music-library-player";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Музична база — DJ_SKY_STYLE RADIO" };

export default function MusicPage() {
  return (
    <>
      <PageHero index="6" eyebrow="ПЛЕЙЛИСТ СТАНЦІЇ" title="МУЗИЧНА" outline="БАЗА" description="36 MP3 у локальній черзі DJ_SKY_STYLE RADIO. Запускатор сам перемішує композиції та передає їх у прямий ефір." />
      <MusicLibraryPlayer />
    </>
  );
}
