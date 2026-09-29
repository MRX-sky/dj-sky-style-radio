import type { Metadata } from "next";
import { MusicLibraryPlayer } from "@/components/music-library-player";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Музична база — DJ_SKY_STYLE RADIO" };

export default function MusicPage() {
  return (
    <>
      <PageHero index="6" eyebrow="ПЛЕЙЛИСТ СТАНЦІЇ" title="МУЗИЧНА" outline="БАЗА" description="Черга ваших ліцензованих треків із автоматичним переходом до наступної композиції." />
      <MusicLibraryPlayer />
    </>
  );
}
