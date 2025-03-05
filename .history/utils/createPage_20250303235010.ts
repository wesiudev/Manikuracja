"use server";

import { getDocument } from "@/firebase";

export async function createPage(lat, lng, search) {
  const existingPage = await getDocument("pages", search);
  if (existingPage) {
    return existingPage;
  } else {
    const newPage = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/ai/createPage/`,
      {
        method: "GET",
        body: JSON.stringify({ lat, lng, search }),
      }
    );
    return newPage;
  }
}
