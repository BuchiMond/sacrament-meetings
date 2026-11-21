import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <main className="py-10">
      <h1 className="text-3xl font-semibold">Meeting not found</h1>
      <p className="mt-2">We couldn&apos;t find a meeting with that id.</p>
      <Link href="/meetings" className="mt-4 inline-block font-semibold text-brand underline underline-offset-4">
        Back to all meetings
      </Link>
    </main>
  );
}
