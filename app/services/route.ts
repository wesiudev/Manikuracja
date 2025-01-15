import { getDocuments } from "@/firebase";
import { NextResponse } from "next/server";
export async function GET() {
  const services = await getDocuments("content");
  return NextResponse.json(services);
}
