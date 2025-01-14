"use server";
export async function fetchUser(uid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/users/${uid}?secret=${process.env.SECRET}`
  );
  const user = await response.json();
  return user;
}
