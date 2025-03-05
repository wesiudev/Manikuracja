import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ search: string }> }
) {
  const query = (await params).search;

  return NextResponse.json(cities);
}
