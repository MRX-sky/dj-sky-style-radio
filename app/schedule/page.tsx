import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Schedule } from "@/components/schedule";

export const metadata: Metadata = { title: "Розклад — DJ_SKY_STYLE RADIO" };

export default function SchedulePage() {
  return <><PageHero index="2" eyebrow="ТВІЙ ТИЖДЕНЬ У РИТМІ" title="РОЗКЛАД" outline="ЕФІРУ" description="Збережіть час улюблених сетів і повертайтеся за новою порцією вайбу." /><Schedule /></>;
}
