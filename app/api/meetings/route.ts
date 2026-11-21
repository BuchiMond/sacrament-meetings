import { getMeetingByDate, getMeetings } from "@/lib/meetings-db";

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

// GET /api/meetings                      -> first page (5 meetings), newest first
// GET /api/meetings?query=smith&page=2   -> search + pagination
// GET /api/meetings?date=2026-11-08      -> the meeting on that Sunday (array of 0 or 1)
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");
  if (date) {
    if (!isValidIsoDate(date)) {
      return Response.json({ error: "date must look like YYYY-MM-DD" }, { status: 400 });
    }
    const meeting = await getMeetingByDate(date);
    return Response.json(meeting ? [meeting] : []);
  }

  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const meetings = await getMeetings(query, page);
  return Response.json(meetings);
}