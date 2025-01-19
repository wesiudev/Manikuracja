"use server";
export async function getSingleService(service: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/service/${service}`,
    {
      next: { revalidate: 3600 },
      method: "GET",
    }
  ).then((res) => res.json());
  return response;
}
