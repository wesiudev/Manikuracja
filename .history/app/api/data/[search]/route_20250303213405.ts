import { addDocument, getDocument } from "@/firebase";
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
    const newPage = { id: query, content: "" };
    await addDocument("pages", newPage);
    return NextResponse.json(newPage);
  }
}
