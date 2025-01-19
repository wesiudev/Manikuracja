import { IService } from "@/types";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;

// Function to fetch services and cities data
async function fetchServicesAndCities() {
  const [services, cities] = await Promise.all([
    fetch(`${BASE_URL}/services`).then((res) => res.json()),
    fetch(`${BASE_URL}/cities`).then((res) => res.json()),
  ]);
  return { services, cities };
}

// Function to generate links for each city
function generateLinksForCities(
  services: IService[],
  cities: { id: string; name: string }[]
) {
  const links: { url: string; lastModified: string }[] = [];
  const date = new Date().toISOString();

  for (const city of cities) {
    links.push({
      url: `${BASE_URL}/paznokcie/${city.id}`,
      lastModified: date,
    });
  }

  return links;
}

export async function GET() {
  const { services, cities } = await fetchServicesAndCities();
  const links = generateLinksForCities(services, cities);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${links
        .map(
          (link) => `
        <url>
          <loc>${link.url}</loc>
          <lastmod>${link.lastModified}</lastmod>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
