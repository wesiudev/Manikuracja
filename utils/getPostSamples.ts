"use server";
export async function getPostSamples() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts/postSamples`,
    {
      next: { revalidate: 9999 },
      method: "GET",
    }
  ).then((res) => res.json());
  return response;
}
