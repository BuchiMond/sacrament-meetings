import type { MeetingType } from "./types";

/** Turns '2026-11-08' into 'Sunday, November 8, 2026' without timezone shifting. */
export function formatMeetingDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Formats a Date as 'YYYY-MM-DD' using local time (toISOString would use UTC). */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Returns the most recent Sunday (today if today is Sunday) as 'YYYY-MM-DD'. */
export function getMostRecentSunday(today: Date): string {
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  return toIsoDate(sunday);
}

export const meetingTypeLabels: Record<MeetingType, string> = {
  regular: "Regular Meeting",
  testimony: "Fast & Testimony Meeting",
  stake: "Stake Conference (no sacrament)",
  general: "General Conference (no sacrament)",
};
