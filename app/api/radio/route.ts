import { NextResponse } from "next/server";
import { normalizeCasterPayload } from "@/lib/caster";

export const dynamic = "force-dynamic";

/**
 * Server-side proxy for the Caster.fm metadata endpoint.
 *
 * Paste only an endpoint published in your Caster.fm account/documentation into
 * CASTER_API_URL. This project deliberately does not invent a Caster.fm URL.
 */
export async function GET() {
  // Private server variables take precedence. NEXT_PUBLIC_* fallbacks support
  // Caster.fm credentials that are explicitly documented as public.
  const apiUrl =
    process.env.CASTER_API_URL?.trim() ??
    process.env.NEXT_PUBLIC_CASTER_API_URL?.trim();
  const apiToken =
    process.env.CASTER_API_TOKEN?.trim() ??
    process.env.NEXT_PUBLIC_CASTER_API_TOKEN?.trim();
  const stationId =
    process.env.CASTER_STATION_ID?.trim() ??
    process.env.NEXT_PUBLIC_STATION_ID?.trim();

  if (!apiUrl) return NextResponse.json({ available: false }, { status: 200 });

  try {
    const headers: HeadersInit = { Accept: "application/json" };
    if (apiToken) headers.Authorization = `Bearer ${apiToken}`;
    if (stationId) headers["X-Station-Id"] = stationId;

    const response = await fetch(apiUrl, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });

    if (!response.ok) return NextResponse.json({ available: false }, { status: 200 });

    const metadata = normalizeCasterPayload(await response.json());
    return NextResponse.json({ available: Boolean(metadata), metadata }, { status: 200 });
  } catch {
    // Metadata is optional: the player remains usable if the external API fails.
    return NextResponse.json({ available: false }, { status: 200 });
  }
}
