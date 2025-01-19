"use server";
export async function getServices() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/services/`, {
    method: "GET",
  }).then((res) => res.json());
  return response;
}
