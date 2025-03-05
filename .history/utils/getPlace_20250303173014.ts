"use server";
export async function getPlace(lng: number, lat: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getPlaces/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lng, lat }),
    }
  ).then((res) => res.json());
  return response;
}
