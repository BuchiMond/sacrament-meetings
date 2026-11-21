import Link from "next/link";
import { formatMeetingDate, meetingTypeLabels } from "@/lib/format";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter((s) => s.type === "speaker").length;
  const musicalCount = meeting.speakers.filter((s) => s.type === "musical-number").length;
  const hasSacrament = meeting.meetingType === "regular" || meeting.meetingType === "testimony";

  return (
    <article className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        {meetingTypeLabels[meeting.meetingType]}
      </p>
      <h2 className="mt-1 text-xl font-semibold">
        <Link
          href={`/meetings/${meeting.id}`}
          className="underline-offset-4 hover:underline"
        >
          {formatMeetingDate(meeting.date)}
        </Link>
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <dt className="text-muted">Conducting</dt>
        <dd>{meeting.conducting}</dd>
        <dt className="text-muted">Speakers</dt>
        <dd>{speakerCount}</dd>
        <dt className="text-muted">Musical numbers</dt>
        <dd>{musicalCount}</dd>
        <dt className="text-muted">Sacrament</dt>
        <dd>{hasSacrament ? "Yes" : "No"}</dd>
      </dl>
      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-4 inline-block text-sm font-semibold text-brand underline underline-offset-4"
        aria-label={`View program for ${formatMeetingDate(meeting.date)}`}
      >
        View program &rarr;
      </Link>
    </article>
  );
}
