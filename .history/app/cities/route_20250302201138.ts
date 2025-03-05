import data from "polskie-miejscowosci";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";

export async function GET() {
  const uniqueCities = Array.from(
    new Set(
      data
        .filter((city) => city.Type !== "village") // Exclude villages
        .map((city) => city.Name)
    )
  ).map((name) => ({
    id: createLinkFromText(name),
    name,
    Type: "city",
  }));

  return NextResponse.json(uniqueCities);
}
