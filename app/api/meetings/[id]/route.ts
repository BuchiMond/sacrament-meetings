import { getMeetingById } from "@/lib/meetings-db";

// GET /api/meetings/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;

  // Only accept whole, positive numbers like "1" (rejects "abc", "1.5", "").
  if (!/^\d+$/.test(id)) {
    return Response.json({ error: "Meeting id must be a number" }, { status: 400 });
  }

  const meeting = getMeetingById(Number(id));
  if (!meeting) {
    return Response.json({ error: "Meeting not found" }, { status: 404 });
  }

  return Response.json(meeting);
}
