import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PwaRegister } from "@/components/pwa-register";
import { RadioProvider } from "@/components/radio-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ_SKY_STYLE RADIO — Онлайн-радіо",
  description: "DJ_SKY_STYLE RADIO — онлайн-радіо з електронною музикою, DJ-сетами та авторськими треками.",
  applicationName: "DJ_SKY_STYLE RADIO",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "DJ_SKY_STYLE RADIO — Онлайн-радіо",
    description: "DJ_SKY_STYLE RADIO — онлайн-радіо з електронною музикою, DJ-сетами та авторськими треками.",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "DJ_SKY_STYLE RADIO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ_SKY_STYLE RADIO — Онлайн-радіо",
    description: "DJ_SKY_STYLE RADIO — онлайн-радіо з електронною музикою, DJ-сетами та авторськими треками.",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        <RadioProvider>
          <PwaRegister />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </RadioProvider>
      </body>
    </html>
  );
}
