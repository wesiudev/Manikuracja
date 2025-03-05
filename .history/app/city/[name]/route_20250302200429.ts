import { ICity } from "@/types";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const name = (await params).name;
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/cities`).then(
    (res) => res.json()
  );
  const city = data.find(
    (city: ICity) =>
      createLinkFromText(city.id) === name && city.Type === "city"
  );
  if (city) {
    return NextResponse.json(city);
  } else {
    return NextResponse.json({ error: "City doesn't exist!" });
  }
}
