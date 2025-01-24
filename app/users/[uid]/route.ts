import { getDocument } from "@/firebase";
import { NextResponse } from "next/server";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { secret } = await request.json();
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const { uid } = await params;
  const user = await getDocument("users", uid);
  return NextResponse.json(user);
}
