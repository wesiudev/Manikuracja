"use server";
export async function createPage(l) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/${uid}`, {
    method: "POST",
    body: JSON.stringify({ secret: process.env.SECRET }),
  });
  const user = await response.json();
  return user;
}
