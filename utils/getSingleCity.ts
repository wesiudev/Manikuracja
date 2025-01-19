"use server";
export async function getSingleCity(city: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/city/${city}`, {
    next: { revalidate: 3600 },
    method: "GET",
  }).then((res) => res.json());
  return response;
}
