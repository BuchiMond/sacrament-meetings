import { getMeetingById, parseMeetingId } from "@/lib/meetings-db";

// GET /api/meetings/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;

  // Only accept whole, positive numbers like "1" (rejects "abc", "1.5", "0", "").
  const meetingId = parseMeetingId(id);
  if (meetingId === null) {
    return Response.json({ error: "Meeting id must be a number" }, { status: 400 });
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    return Response.json({ error: "Meeting not found" }, { status: 404 });
  }

  return Response.json(meeting);
}