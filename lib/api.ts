import { headers } from "next/headers";
import type { SacramentMeeting } from "./types";

// Server Components need an absolute URL to call our own API routes.
async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const protocol =
    h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load meetings (${res.status})`);
  }
  return (await res.json()) as SacramentMeeting[];
}

/** Returns the meeting, or null when the API says it doesn't exist / the id is invalid. */
export async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) {
    throw new Error(`Failed to load meeting (${res.status})`);
  }
  return (await res.json()) as SacramentMeeting;
}
