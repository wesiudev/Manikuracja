import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";
import { removePolishPostalCodes } from "@/utils/removePolishPostalCodes";
import { addDocument } from "@/firebase";
// import { db } from "@/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore/lite";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4",
  });

  // Send the initial message and wait for response
  await chat.sendMessage("Ping");

  const response = await chat.sendMessage(
    `Generate PL content about Nails, Manicure in towns and streets of Poland. Details: "${removePolishPostalCodes(
      data.place
    )}", "/${removePolishPostalCodes(data.id)}"`,
    {
      expect: {
        examples: [
          {
            address: "ul. Krawiecka 10, Warszawa",
            googleTitle:
              "Paznokcie Warszawa - Ranking Salonów Manicure | ul. Krawiecka 10",
            googleDescription:
              "Odkryj ranking najlepszych salonów manicure na ul. Krawiecka 10 w Warszawie. Poznaj opinie klientów, usługi oraz porady ekspertów dla idealnego manicure.",
            businessName: "Salon Paznokci Warszawa",
            introduction:
              "Cennik, modelki do manicure, oferty pracy i wyróżnione salony paznokci na ul. Krawiecka 10.",
            rankingSection:
              "Ranking salonów oparty o opinie klientów i jakość usług manicure.",
            testimonialSection: "Opinie klientów na ul. Krawiecka 10 Warszawa",
            faqSection:
              "Często zadawane pytania dotyczące usług manicure, pedicure, pielęgnacji paznokci oraz rezerwacji wizyt.",
            h1: "Najlepsze Salony Paznokci w Warszawie - ul. Krawiecka 10",
            h2: "Ranking Salonów Manicure, Opinie Klientów, Modelki na manicure",
            opinion1:
              "Najlepszy manicure hybrydowy w Warszawie! Paznokcie trzymają się idealnie przez tygodnie.",
            opinion2:
              "Bardzo miła obsługa i duży wybór kolorów. Polecam każdemu, kto szuka precyzyjnego manicure.",
            opinion3:
              "Rewelacyjny pedicure! Stopy wyglądają świetnie, a atmosfera w salonie jest bardzo relaksująca.",
            opinion4:
              "Manicure ładny, ale czekałam trochę za długo na swoją kolej. Poza tym wszystko super!",
          },
        ],
        properties: {
          response: {
            googleTitle: "string",
          },
        },
        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: { type: "object" },
          },
          required: ["googleTitle"],
        },
      },
    }
  );
  if (response) {
    addDocument("pages", data.id, {
      id: data.id,
      page: response.content,
      place: data.place,
      lat: data.lat,
      lng: data.lng,
    });
  }
  return NextResponse.json({
    success: true,
  });
}
