import { formatMeetingDate, meetingTypeLabels } from "@/lib/format";
import type { Hymn, SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

interface RowProps {
  label: string;
  children: React.ReactNode;
}

function Row({ label, children }: RowProps) {
  return (
    <div className="grid gap-1 border-b border-border py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
      <dt className="font-semibold text-brand">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function hymnText(hymn: Hymn): string {
  return `#${hymn.number} – ${hymn.title}`;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const hasSacrament = meeting.meetingType === "regular" || meeting.meetingType === "testimony";

  return (
    <article className="print-card rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-sm">
      <header className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {meetingTypeLabels[meeting.meetingType]}
        </p>
        <h1 className="text-3xl font-semibold">{formatMeetingDate(meeting.date)}</h1>
      </header>

      <dl>
        <Row label="Presiding">{meeting.presiding}</Row>
        <Row label="Conducting">{meeting.conducting}</Row>

        <Row label="Announcements">
          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="list-disc pl-5">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <span className="text-muted">None</span>
          )}
        </Row>

        <Row label="Opening Hymn">{hymnText(meeting.openingHymn)}</Row>
        <Row label="Opening Prayer">{meeting.openingPrayer}</Row>

        <Row label="Ward Business">
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc pl-5">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <span className="text-muted">None</span>
          )}
        </Row>

        <Row label="Stake Business">{meeting.stakeBusiness ? "Yes" : "No"}</Row>

        <Row label="Sacrament Hymn">
          {hymnText(meeting.sacramentHymn)}
          {!hasSacrament && (
            <span className="ml-2 text-sm text-muted">(no sacrament this week)</span>
          )}
        </Row>

        <Row label="Speakers & Music">
          {meeting.speakers.length > 0 ? (
            <ol className="list-decimal space-y-1 pl-5">
              {meeting.speakers.map((item) => (
                <li key={`${item.type}-${item.name}-${item.topic}`}>
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-muted">
                    {item.type === "musical-number" ? " (musical number)" : ""}
                  </span>
                  {item.topic && <span> &mdash; {item.topic}</span>}
                </li>
              ))}
            </ol>
          ) : (
            <span className="text-muted">None</span>
          )}
        </Row>

        <Row label="Closing Hymn">{hymnText(meeting.closingHymn)}</Row>
        <Row label="Closing Prayer">{meeting.closingPrayer}</Row>
      </dl>
    </article>
  );
}
