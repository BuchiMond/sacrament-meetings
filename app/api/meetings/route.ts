import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

// GET /api/meetings
// GET /api/meetings?date=2026-11-08
export async function GET(request: Request): Promise<Response> {
  const date = new URL(request.url).searchParams.get("date");
  const meetings: SacramentMeeting[] = getMeetings(date);
  return Response.json(meetings);
}
