import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";
import { createLinkFromText } from "@/utils/createLinkFromText";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPage = {
    place: createLinkFromText(data.search),
    lat: data.lat,
    lng: data.lng,
  };
  return NextResponse.json(newPage);
  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-3.5-turbo",
  });

  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(``, {
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
  });

  return NextResponse.json(response.content);
}
