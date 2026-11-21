import type { Metadata } from "next";
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "All Meetings",
};

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

async function MeetingResults({
  searchParams,
}: {
  searchParams: PageProps<"/meetings">["searchParams"];
}) {
  const params = await searchParams;
  const query = firstValue(params.query).trim();
  const requestedPage = Number(firstValue(params.page));
  const currentPage = Number.isInteger(requestedPage) && requestedPage >= 1 ? requestedPage : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  if (meetings.length === 0) {
    return (
      <p className="text-muted" role="status">
        {query
          ? `No meetings match "${query}".`
          : totalPages === 0
            ? "No meetings have been planned yet."
            : "There are no meetings on this page."}
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <MeetingCard meeting={meeting} />
          </li>
        ))}
      </ul>
      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </>
  );
}

export default function MeetingsPage(props: PageProps<"/meetings">) {
  return (
    <main className="py-6">
      <h1 className="text-3xl font-semibold">All Meetings</h1>
      <p className="mb-6 mt-2 text-muted">Newest first. Select a meeting to see its full program.</p>
      <Suspense fallback={<div className="mb-6 h-12" aria-hidden="true" />}>
        <MeetingSearch />
      </Suspense>
      <Suspense fallback={<p className="text-muted">Loading meetings&hellip;</p>}>
        <MeetingResults searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}