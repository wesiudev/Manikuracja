"use server";
export async function getCityServiceUsers(city: string, service: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/results/${service}/${city}`,
    {
      method: "POST",
    }
  ).then((res) => res.json());

  return response;
}
