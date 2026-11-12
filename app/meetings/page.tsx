import type { Metadata } from "next";
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import { fetchMeetings } from "@/lib/api";

export const metadata: Metadata = {
  title: "All Meetings",
};

async function MeetingList() {
  const meetings = await fetchMeetings();

  if (meetings.length === 0) {
    return <p className="text-muted">No meetings have been planned yet.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {meetings.map((meeting) => (
        <li key={meeting.id}>
          <MeetingCard meeting={meeting} />
        </li>
      ))}
    </ul>
  );
}

export default function MeetingsPage() {
  return (
    <main className="py-6">
      <h1 className="text-3xl font-semibold">All Meetings</h1>
      <p className="mb-6 mt-2 text-muted">Newest first. Select a meeting to see its full program.</p>
      <Suspense fallback={<p className="text-muted">Loading meetings&hellip;</p>}>
        <MeetingList />
      </Suspense>
    </main>
  );
}
