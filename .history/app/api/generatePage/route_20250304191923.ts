/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";
// import { db } from "@/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore/lite";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.id || !data.place) {
    return NextResponse.json(
      { success: false, error: "Missing required parameters." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not set in environment variables.");
  }

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
  });

  // Send the initial message and wait for response
  await chat.sendMessage("Ping");

  const response = await chat.sendMessage(
    `You are generating content for a Polish website. The page you should generate is: "${data.place}", "/${data.id}"`,
    {
      expect: {
        examples: [
          {
            googleTitle:
              "Paznokcie Warszawa Mokotów - Ranking Salonów Manicure",
          },
          {
            googleTitle:
              "Najlepsze Salony Manicure w Warszawie – Opinie i Ceny",
          },
          {
            googleTitle: "Stylizacje Paznokci – Trendy i Inspiracje na 2025",
          },
          {
            googleTitle:
              "Manicure Hybrydowy Warszawa – Gdzie Warto Umówić Wizytę?",
          },
          {
            googleTitle:
              "Pedicure Warszawa – Sprawdź Salony z Najlepszymi Opiniami",
          },
        ],
        properties: {
          response: {
            title: "string",
          },
        },
        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: { type: "object" },
          },
          required: ["response"],
        },
      },
    }
  );
  console.log(response);

  // if (!response) {
  //   throw new Error("Invalid response format from OpenAI API.");
  // }

  // const pageRef = doc(db, "pages", data.id);
  // const pageSnap = await getDoc(pageRef);

  // if (!pageSnap.exists()) {
  //   await setDoc(pageRef, {
  //     id: data.id,
  //     place: data.place,
  //     title: response,
  //   });
  // }

  return NextResponse.json({ success: true, title: response });
}
