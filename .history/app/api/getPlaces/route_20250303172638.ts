await fetch(
    `${PLACES_API_URL}?location=${location.lat},${location.lng}&radius=5000&type=beauty_salon&keyword=manicure&key=${GOOGLE_API_KEY}`
  );

  export async function POST(req: NextRequest) {
    const data = await req.json();