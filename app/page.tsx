import { Hero } from "@/components/hero";
import { HomeDestinations } from "@/components/home-destinations";
import { NowPlaying } from "@/components/now-playing";

export default function Home() {
  return (
    <>
      <Hero />
      <NowPlaying />
      <HomeDestinations />
    </>
  );
}
