import type { Metadata } from "next";
import { ContactSection } from "@/components/about-contact";
import { PageHero } from "@/components/page-hero";
import { RequestTrack } from "@/components/request-track";

export const metadata: Metadata = { title: "Контакти — DJ_SKY_STYLE RADIO" };

export default function ContactPage() {
  return <><PageHero index="5" eyebrow="ЗВОРОТНИЙ ЗВ’ЯЗОК" title="НАПИШИ" outline="НАМ" description="Долучайтеся до спільноти DJ_SKY_STYLE RADIO або залишайте свій запит на трек." /><ContactSection /><RequestTrack /></>;
}
