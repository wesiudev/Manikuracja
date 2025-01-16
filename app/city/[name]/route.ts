import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";
import data from "polskie-miejscowosci";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const name = (await params).name;
  const city = data.find(
    (city) => createLinkFromText(city.Name) === name.toLowerCase()
  );
  if (city) {
    return NextResponse.json(city);
  } else {
    return NextResponse.json({ error: "City doesn't exist!" });
  }
}
