import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";
import data from "polskie-miejscowosci";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  const cities = data.filter((city) =>
    createLinkFromText(city.Name).includes(query.toLowerCase())
  );
  return NextResponse.json(cities);
}
