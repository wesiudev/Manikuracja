import { User } from "@/types";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { getUsers } from "@/utils/getUsers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ city: string }> }
) {
  const city = (await params).city;
  const users = await getUsers();
  const filteredUsers = users.filter((user: User) =>
    createLinkFromText(user.location.address).includes(city)
  );
  if (filteredUsers.length === 0) {
    return NextResponse.json([]);
  } else {
    return NextResponse.json(
      filteredUsers.map((user: User) => ({ ...user, email: "hidden" }))
    );
  }
}
