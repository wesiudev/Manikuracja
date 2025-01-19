"use server";
export async function getCities() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/cities/`, {
    next: { revalidate: 3600 },
    method: "GET",
  }).then((res) => res.json());
  return response;
}
