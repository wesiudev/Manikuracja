import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";
// import { db } from "@/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore/lite";
const nailSalonData = {
  googleTitle:
    "Najlepszy Manicure w Warszawie - ul. Krawiecka 10 | Ranking Salonów",
  googleDescription:
    "Odkryj najlepszy salon paznokci w Warszawie na ul. Krawieckiej 10! Profesjonalny manicure, pedicure i stylizacja paznokci w przyjaznej atmosferze.",

  opinions: [
    {
      rating: 5,
      message:
        "Najlepszy manicure hybrydowy w Warszawie! Paznokcie trzymają się idealnie przez tygodnie.",
      author: "Katarzyna M.",
    },
    {
      rating: 4,
      message:
        "Bardzo miła obsługa i duży wybór kolorów. Polecam każdemu, kto szuka precyzyjnego manicure.",
      author: "Marta P.",
    },
    {
      rating: 5,
      message:
        "Rewelacyjny pedicure! Stopy wyglądają świetnie, a atmosfera w salonie jest bardzo relaksująca.",
      author: "Anna W.",
    },
    {
      rating: 3,
      message:
        "Manicure ładny, ale czekałam trochę za długo na swoją kolej. Poza tym wszystko super!",
      author: "Joanna L.",
    },
    {
      rating: 5,
      message:
        "Przemiłe stylistki i perfekcyjna precyzja! Polecam zwłaszcza zdobienia – prawdziwe dzieła sztuki!",
      author: "Ewa R.",
    },
  ],
};
const seoContentPropositions = {
  googleTitle:
    "Paznokcie Warszawa Mokotów - Ranking Salonów Manicure | ul. Krawiecka 10",
  googleDescription:
    "Odkryj ranking najlepszych salonów manicure na ul. Krawiecka 10 w Warszawie. Poznaj opinie klientów, usługi oraz porady ekspertów dla idealnego manicure.",

  // Headings and structure for enhanced content hierarchy
  headerTags: {
    h1: "Najlepsze Salony Paznokci w Warszawie - ul. Krawiecka 10",
    h2: ["Ranking Salonów Manicure", "Opinie Klientów", "Porady Ekspertów"],
    h3: [
      "Oferta Usług",
      "FAQ – Najczęściej Zadawane Pytania",
      "Lokalizacja i Kontakt",
    ],
  },

  // Content structure proposals for a well-organized page
  contentStructure: {
    introduction:
      "Wprowadzenie do oferty, unikalnych zalet i wyróżników salonów paznokci na ul. Krawiecka 10.",
    rankingSection:
      "Szczegółowy ranking salonów oparty o autentyczne opinie klientów i analizę jakości usług.",
    testimonialSection:
      "Sekcja opinii klientów wraz z recenzjami i zdjęciami efektów prac.",
    faqSection:
      "Często zadawane pytania dotyczące usług manicure, pedicure, pielęgnacji paznokci oraz rezerwacji wizyt.",
    callToAction:
      "Wyraźne wezwanie do działania z informacjami kontaktowymi i formularzem rezerwacyjnym.",
    opinion1:
      "Najlepszy manicure hybrydowy w Warszawie! Paznokcie trzymają się idealnie przez tygodnie.",
    opinion2:
      "Bardzo miła obsługa i duży wybór kolorów. Polecam każdemu, kto szuka precyzyjnego manicure.",
    opinion3:
      "Rewelacyjny pedicure! Stopy wyglądają świetnie, a atmosfera w salonie jest bardzo relaksująca.",
    opinion4:
      "Manicure ładny, ale czekałam trochę za długo na swoją kolej. Poza tym wszystko super!",
  },

  // Rich media content for user engagement and improved search snippet appearance
  richMedia: {
    images:
      "Galeria wysokiej jakości zdjęć prezentujących efekty zabiegów, z opisowymi alt tagami.",
    video:
      "Film promocyjny prezentujący salon, stylizacje paznokci oraz opinie zadowolonych klientów.",
  },

  // Additional keyword recommendations to boost search relevance
  keywords: [
    "manicure Warszawa",
    "salon paznokci Warszawa",
    "paznokcie ul. Krawiecka 10",
    "ranking salonów manicure",
    "najlepszy manicure w Warszawie",
  ],
};
export async function POST(req: NextRequest) {
  const data = await req.json();
  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4",
  });

  // Send the initial message and wait for response
  await chat.sendMessage("Ping");
  const removePolishPostalCodes = (text: string): string => {
    const regEx = /\b\d{2}-\d{3}\b/g;
    return text.replace(regEx, "");
  };
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
  console.log(response);
  return NextResponse.json({
    pageData: response.content,
    id: data.id,
    place: data.place,
  });
}
