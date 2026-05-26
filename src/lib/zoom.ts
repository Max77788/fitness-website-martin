import axios from "axios";

export const isZoomConfigured = !!(
  process.env.ZOOM_CLIENT_ID &&
  process.env.ZOOM_CLIENT_SECRET &&
  process.env.ZOOM_ACCOUNT_ID
);

interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface ZoomMeetingResponse {
  id: number;
  join_url: string;
  password: string;
  start_url: string;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getZoomAccessToken(): Promise<string> {
  if (!isZoomConfigured) {
    throw new Error("Zoom credentials not configured");
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }

  const credentials = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post<ZoomTokenResponse>(
    "https://zoom.us/oauth/token",
    new URLSearchParams({
      grant_type: "account_credentials",
      account_id: process.env.ZOOM_ACCOUNT_ID!,
    }),
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedToken = {
    token: response.data.access_token,
    expiresAt: Date.now() + response.data.expires_in * 1000,
  };

  return response.data.access_token;
}

export async function createZoomMeeting(
  topic: string,
  startTime?: string,
  duration: number = 60
): Promise<ZoomMeetingResponse> {
  if (!isZoomConfigured) {
    return {
      id: 123456789,
      join_url: `https://zoom.us/j/123456789?pwd=demo`,
      password: "demo123",
      start_url: "https://zoom.us/start/demo",
    };
  }

  const token = await getZoomAccessToken();

  const response = await axios.post<ZoomMeetingResponse>(
    "https://api.zoom.us/v2/users/me/meetings",
    {
      topic,
      type: startTime ? 2 : 3,
      start_time: startTime,
      duration,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        waiting_room: true,
        registration_type: 2,
        approval_type: 0,
        enforce_login: false,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function addZoomRegistrant(
  meetingId: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<{ join_url: string; registrant_id: string }> {
  if (!isZoomConfigured) {
    return {
      join_url: `https://zoom.us/j/${meetingId}?pwd=demo&uname=${encodeURIComponent(
        firstName
      )}`,
      registrant_id: `demo_${Date.now()}`,
    };
  }

  const token = await getZoomAccessToken();

  const response = await axios.post<{
    join_url: string;
    registrant_id: string;
  }>(
    `https://api.zoom.us/v2/meetings/${meetingId}/registrants`,
    {
      email,
      first_name: firstName,
      last_name: lastName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
