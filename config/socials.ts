import { Instagram, MessageCircle, Music2, Send, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Add your own URLs below. Empty links are intentionally hidden on the site. */
export const socialLinks: SocialLink[] = [
  { label: "TikTok", href: "", icon: Music2 },
  { label: "Instagram", href: "https://instagram.com/dj_sky_style_", icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/380960522010", icon: MessageCircle },
  { label: "Telegram", href: "", icon: Send },
  { label: "YouTube", href: "", icon: Youtube },
  { label: "Spotify", href: "", icon: Music2 },
];

export const telegramUrl = "";

export const contactDetails = {
  email: "rudnikdenis26@gmail.com",
  phone: "+380960522010",
  telegram: "",
  instagram: "@dj_sky_style_",
} as const;