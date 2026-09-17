import { Instagram, Music2, Send, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Add your own URLs below. Empty links are intentionally hidden on the site. */
export const socialLinks: SocialLink[] = [
  { label: "TikTok", href: "", icon: Music2 },
  { label: "Instagram", href: "", icon: Instagram },
  { label: "Telegram", href: "", icon: Send },
  { label: "YouTube", href: "", icon: Youtube },
  { label: "Spotify", href: "", icon: Music2 },
];

export const telegramUrl = "";

export const contactDetails = {
  email: "",
  telegram: "",
  instagram: "",
} as const;
