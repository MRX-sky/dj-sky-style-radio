import { Hero } from "@/components/hero";
import { HomeDestinations } from "@/components/home-destinations";
import { NowPlaying } from "@/components/now-playing";
import { RecentlyPlayed } from "@/components/recently-played";
import { StationExperience } from "@/components/station-experience";

export default function Home() {
  return (
    <>
      <Hero />
      <NowPlaying />
      <StationExperience />
      <RecentlyPlayed />
      <HomeDestinations />
    </>
  );
}
