import { getDocument } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ search: string }> }
) {
  const query = (await params).search;

  const data = await getDocument("pages", query);
  if (data) {
    return NextResponse.json(data);
  } else {
  }
}
