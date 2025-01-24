"use server";
export async function getServiceUsers(service: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/results/${service}`,
    {
      method: "POST",
    }
  ).then((res) => res.json());

  return response;
}
