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
  return NextResponse.json(filteredUsers);
}
