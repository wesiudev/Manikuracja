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
  console.log(response);
  return NextResponse.json(response);
}
// Response {
//     [Symbol(realm)]: { settingsObject: {} },
//     [Symbol(state)]: {
//       aborted: false,
//       rangeRequested: false,
//       timingAllowPassed: false,
//       requestIncludesCredentials: false,
//       type: 'default',
//       status: 200,
//       timingInfo: null,
//       cacheState: '',
//       statusText: 'OK',
//       headersList: HeadersList {
//         cookies: null,
//         [Symbol(headers map)]: [Map],
//         [Symbol(headers map sorted)]: null
//       },
//       urlList: [],
//       body: { stream: undefined, source: null, length: null }
//     },
//     [Symbol(headers)]: HeadersList {
//       cookies: null,
//       [Symbol(headers map)]: Map(14) {
//         'alt-svc' => [Object],
//         'cache-control' => [Object],
//         'content-length' => [Object],
//         'content-security-policy-report-only' => [Object],
//         'content-type' => [Object],
//         'cross-origin-opener-policy-report-only' => [Object],
//         'date' => [Object],
//         'expires' => [Object],
//         'report-to' => [Object],
//         'server' => [Object],
//         'server-timing' => [Object],
//         'vary' => [Object],
//         'x-frame-options' => [Object],
//         'x-xss-protection' => [Object]
//       },
//       [Symbol(headers map sorted)]: null
//     }
//   }
