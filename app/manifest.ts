import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DJ_SKY_STYLE RADIO",
    short_name: "DJ_SKY_STYLE",
    description: "Онлайн-радіо з електронною музикою, DJ-сетами та авторськими треками.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070b",
    theme_color: "#06070b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
