import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const lng = data.lng;
  const lat = data.lat;
  const response = await fetch(
    `${PLACES_API_URL}?location=${location.lat},${location.lng}&radius=5000&type=beauty_salon&keyword=manicure&key=${GOOGLE_API_KEY}`
  );

  return NextResponse.json({});
}
