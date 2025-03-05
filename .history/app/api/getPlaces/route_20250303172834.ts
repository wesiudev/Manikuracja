import { NextRequest, NextResponse } from "next/server";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY; // Replace with your API Key
const PLACES_API_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
export async function POST(req: NextRequest) {
  const data = await req.json();
  const lng = data.lng;
  const lat = data.lat;
  const response = await fetch(
    `${PLACES_API_URL}?location=${lat},${lng}&radius=5000&type=beauty_salon&keyword=manicure&key=${GOOGLE_API_KEY}`
  );
  return NextResponse.json(response);
}
