import { IService } from "@/types";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/services`, {
    next: { revalidate: 6000 },
  }).then((res) => res.json());
  const query = (await params).query;
  const services = data
    .filter((service: IService) =>
      service.flatten_name.includes(createLinkFromText(query))
    )
    .map((service: IService) => service.real_name);
  if (services.length >= 1) {
    return NextResponse.json(services);
  } else {
    return NextResponse.json([]);
  }
}
