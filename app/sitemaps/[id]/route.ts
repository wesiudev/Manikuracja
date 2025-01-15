import { IService } from "@/types";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;
const LINKS_PER_SITEMAP = 50000; // Google's limit

// Function to fetch services and cities data
async function fetchServicesAndCities() {
  const [services, cities] = await Promise.all([
    fetch(`${BASE_URL}/services`).then((res) => res.json()),
    fetch(`${BASE_URL}/cities`).then((res) => res.json()),
  ]);
  return { services, cities };
}

// Function to generate links for a specific range
function generateLinks(
  services: IService[],
  cities: string[],
  start: number,
  end: number
) {
  const links: { url: string; lastModified: string }[] = [];
  const date = new Date().toISOString();

  for (let i = start; i < end && i < services.length * cities.length; i++) {
    const serviceIndex = Math.floor(i / cities.length);
    const cityIndex = i % cities.length;

    links.push({
      url: `${BASE_URL}/${services[serviceIndex].flatten_name}/${cities[cityIndex]}`,
      lastModified: date,
    });
  }

  return links;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const sitemapId = parseInt(id, 10);

  if (isNaN(sitemapId)) {
    return NextResponse.json({ error: "Invalid sitemap ID" }, { status: 400 });
  }

  const { services, cities } = await fetchServicesAndCities();

  const totalLinks = services.length * cities.length;
  const start = sitemapId * LINKS_PER_SITEMAP;
  const end = Math.min(start + LINKS_PER_SITEMAP, totalLinks);

  if (start >= totalLinks) {
    return NextResponse.json({ error: "Sitemap not found" }, { status: 404 });
  }

  const links = generateLinks(services, cities, start, end);

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
