import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4",
  });

  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Generujesz post na bloga, który ma być bardziej rozbudowany i obejmować 7 sekcji. Napisz angażujący tekst na temat ${topic}. Uwzględnij poprawne odmiany pisowni polskiej. Tekst powinien składać się z 1500-2000 znaków`,
    {
      expect: {
        examples: [
          {
            title: "Jak algorytm TikToka może zmienić strategię twórców",
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

  return NextResponse.json(response.content);
}
