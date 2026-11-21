import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

export const ITEMS_PER_PAGE = 5;

// Postgres INTEGER (SERIAL) tops out at 2,147,483,647.
const MAX_ID = 2_147_483_647;

/** Turns a URL segment like "12" into 12. Returns null for "abc", "1.5", "0", huge numbers, etc. */
export function parseMeetingId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = Number(raw);
  return id >= 1 && id <= MAX_ID ? id : null;
}

/** Escapes % and _ so a user typing them searches for the literal character. */
function toSearchPattern(query: string): string {
  return `%${query.trim().replace(/[\\%_]/g, "\\$&")}%`;
}

function toPageNumber(page: number): number {
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

/**
 * One page of meetings (5 per page), newest first.
 * `query` matches presiding, conducting, meeting type, or any speaker name.
 */
export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const searchTerm = toSearchPattern(query);
  const offset = (toPageNumber(currentPage) - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements(speakers) AS s
        WHERE s->>'name' ILIKE ${searchTerm}
      )
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

/** How many pages the same search produces (0 when nothing matches). */
export async function getMeetingsTotalPages(query: string = ""): Promise<number> {
  const searchTerm = toSearchPattern(query);
  const rows = await sql`
    SELECT COUNT(*) AS count FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements(speakers) AS s
        WHERE s->>'name' ILIKE ${searchTerm}
      )
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

/** The meeting held on a given Sunday ('YYYY-MM-DD'), or null. */
export async function getMeetingByDate(date: string): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE date = ${date}::date
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  throw new Error("addMeeting: database implementation coming in Week 04");
}

export async function updateMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  throw new Error("updateMeeting: database implementation coming in Week 04");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error("deleteMeeting: database implementation coming in Week 04");
}