"use server";

import { getDocument } from "@/firebase";
import { createLinkFromText } from "./createLinkFromText";

export async function createPage(lat: number, lng: number, search: string) {
  const existingPage = await getDocument("pages", createLinkFromText(search));
  if (existingPage) {
    console.log(existingPage);
  } else {
    const newPage = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/ai/createPage/`,
      {
        method: "POST",
        body: JSON.stringify({ lat, lng, search }),
      }
    );
    return newPage;
  }
}
