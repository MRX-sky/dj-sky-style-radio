/**
 * Public, browser-safe radio settings.
 *
 * Add your Caster.fm stream URL to NEXT_PUBLIC_RADIO_STREAM_URL in .env.local.
 * Do not add an API token here unless Caster.fm expressly marks it as public.
 */
/**
 * Caster.fm's requested public configuration shape. Values remain empty until
 * you add the real values to .env.local; no Caster.fm URL or token is invented.
 */
export const casterPublicConfig = {
  STREAM_URL: process.env.NEXT_PUBLIC_RADIO_STREAM_URL?.trim() ?? "",
  STATION_NAME: "DJ_SKY_STYLE RADIO",
  STATION_URL: process.env.NEXT_PUBLIC_STATION_URL?.trim() ?? "",
  WIDGET_PUBLIC_TOKEN:
    process.env.NEXT_PUBLIC_CASTER_PUBLIC_TOKEN?.trim() ?? "",
  WIDGET_CHANNEL_ID:
    process.env.NEXT_PUBLIC_CASTER_CHANNEL_ID?.trim() ?? "",
  API_URL: process.env.NEXT_PUBLIC_CASTER_API_URL?.trim() ?? "",
  API_TOKEN: process.env.NEXT_PUBLIC_CASTER_API_TOKEN?.trim() ?? "",
  STATION_ID: process.env.NEXT_PUBLIC_STATION_ID?.trim() ?? "",
} as const;

export const radioConfig = {
  streamUrl: casterPublicConfig.STREAM_URL,
  stationName: casterPublicConfig.STATION_NAME,
  stationUrl: casterPublicConfig.STATION_URL,
  casterWidgetToken: casterPublicConfig.WIDGET_PUBLIC_TOKEN,
  casterWidgetChannelId: casterPublicConfig.WIDGET_CHANNEL_ID,
  requestTrackEndpoint:
    process.env.NEXT_PUBLIC_REQUEST_TRACK_ENDPOINT?.trim() ?? "",
} as const;

export const stationFallback = {
  artist: "DJ_SKY_STYLE RADIO",
  title: "ПРЯМИЙ ЕФІР",
} as const;
