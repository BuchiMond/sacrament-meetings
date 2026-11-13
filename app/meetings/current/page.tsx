import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getMostRecentSunday } from "@/lib/format";
import { getMeetingByDate } from "@/lib/meetings-db";

// This page only redirects, so it is allowed to wait for the request
// instead of streaming a static shell first.
export const instant = false;

export default async function CurrentMeetingPage() {
  // "Today" is different on every request.
  await connection();
  const sunday = getMostRecentSunday(new Date());
  const meeting = getMeetingByDate(sunday);

  // Fall back to the full list when no meeting is planned for this Sunday.
  return redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}
