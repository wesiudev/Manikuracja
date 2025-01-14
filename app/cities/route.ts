import data from "polskie-miejscowosci";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";

export async function GET() {
  const cities = data.map((city) => createLinkFromText(city.Name));
  return NextResponse.json(cities);
}
