import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/cities`).then(
    (res) => res.json()
  );
  const cities = data.filter((city: { id: string }) => city.id.includes(query));
  cities.sort((a: { id: string }, b: { id: string }) => {
    if (a.id === query) return -1;
    if (b.id === query) return 1;
    return 0;
  });
  return NextResponse.json(cities);
}
