import type { Metadata } from "next";
import { AboutSection } from "@/components/about-contact";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Про станцію — DJ_SKY_STYLE RADIO" };

export default function AboutPage() {
  return <><PageHero index="4" eyebrow="НАША ЧАСТОТА" title="ПРО" outline="СТАНЦІЮ" description="DJ_SKY_STYLE RADIO — простір електронної музики, авторських сетів і нічної атмосфери." /><AboutSection /></>;
}
