import { NextResponse } from "next/server";
import { casterStatusConfig } from "@/config/radio";
import { normalizeCasterPayload } from "@/lib/caster";

export const dynamic = "force-dynamic";

/**
 * Server-side metadata proxy. It uses the public Caster.fm Icecast endpoint as
 * a reliable default and still supports a custom documented API when supplied.
 */
export async function GET() {
  const apiUrl =
    process.env.CASTER_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_CASTER_API_URL?.trim() ||
    casterStatusConfig.url;
  const apiToken =
    process.env.CASTER_API_TOKEN?.trim() ??
    process.env.NEXT_PUBLIC_CASTER_API_TOKEN?.trim();
  const stationId =
    process.env.CASTER_STATION_ID?.trim() ??
    process.env.NEXT_PUBLIC_STATION_ID?.trim();

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

    const metadata = normalizeCasterPayload(
      await response.json(),
      casterStatusConfig.mountPoint,
    );
    return NextResponse.json({ available: Boolean(metadata), metadata }, { status: 200 });
  } catch {
    // Metadata is optional: listening with Caster.fm's official player remains available.
    return NextResponse.json({ available: false }, { status: 200 });
  }
}
