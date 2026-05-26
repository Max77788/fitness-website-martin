import { NextRequest, NextResponse } from "next/server";
import { createZoomMeeting } from "@/lib/zoom";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, startTime, duration } = body;

    const meeting = await createZoomMeeting(topic, startTime, duration);

    return NextResponse.json({
      meetingId: meeting.id,
      joinUrl: meeting.join_url,
      password: meeting.password,
      startUrl: meeting.start_url,
    });
  } catch (error: any) {
    console.error("Zoom meeting creation error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to create Zoom meeting" },
      { status: 500 }
    );
  }
}
