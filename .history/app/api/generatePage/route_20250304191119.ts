import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const chat = createChat({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-3.5-turbo",
    });
    await chat.sendMessage("Ping");
    const response = await chat.sendMessage(
      `You are generating content for the polish website. The page you should generate is: "${data.place}", "/${data.id}"`,
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
              response: {
                type: "object",
              },
            },
            required: ["title"],
          },
        },
      }
    );
    console.log(response);
    const pageRef = doc(db, "pages", data.id);
    const pageSnap = await getDoc(pageRef);

    if (!pageSnap.exists()) {
      await setDoc(pageRef, {
        id: data.id,
        place: data.place,
        response: response,
      });
    }

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error?.message },
      {
        status: 500,
      }
    );
  }
}
