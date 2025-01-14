import { getDocument } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;

  const user = await getDocument("users", uid);
  return NextResponse.json(user);
}
