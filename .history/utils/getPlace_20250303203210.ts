"use server";
export async function getPlace(search: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getPlaces/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    }
  ).then((res) => res.json());
  return response;
}
