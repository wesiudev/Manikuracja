import { getDocument } from "@/firebase";
import { NextResponse } from "next/server";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  const user = await getDocument("users", uid);
  return NextResponse.json(user);
}
