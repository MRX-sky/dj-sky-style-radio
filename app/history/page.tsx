import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RecentlyPlayed } from "@/components/recently-played";

export const metadata: Metadata = { title: "Історія треків — DJ_SKY_STYLE RADIO" };

export default function HistoryPage() {
  return <><PageHero index="3" eyebrow="МУЗИЧНИЙ АРХІВ" title="ІСТОРІЯ" outline="ТРЕКІВ" description="Тут залишається музичний слід кожного ефіру." /><RecentlyPlayed /></>;
}
