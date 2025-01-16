import { IService } from "@/types";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/services`, {
    next: { revalidate: 6000 },
  }).then((res) => res.json());
  const name = (await params).name;
  const service = data.find(
    (service: IService) => service.flatten_name === name
  );
  if (service) {
    return NextResponse.json(service.real_name);
  } else {
    return NextResponse.json({ error: "Service doesn;t exist!" });
  }
}
