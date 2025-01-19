import { IService } from "@/types";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;
const LINKS_PER_SITEMAP = 50000;

// Fetch services and cities data
const [services, cities] = await Promise.all([
  fetch(`${BASE_URL}/services`).then((res) => res.json()),
  fetch(`${BASE_URL}/cities`).then((res) => res.json()),
]);

const date = new Date().toISOString();

// Generate links for services with cities and additional /paznokcie/{city.id} URLs
const links = [
  ...services.flatMap((service: IService) =>
    cities.map((city: { id: string; name: string }) => ({
      url: `${BASE_URL}/${service.flatten_name}/${city.id}`,
      lastModified: date,
    }))
  ),
];

export async function GET() {
  const totalLinks = links.length;
  const totalSitemaps = Math.ceil(totalLinks / LINKS_PER_SITEMAP);

  // Generate sitemap index
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Array.from(
        { length: totalSitemaps },
        (_, i) => `
        <sitemap>
          <loc>${BASE_URL}/sitemaps/${i}</loc>
          <lastmod>${date}</lastmod>
        </sitemap>`
      ).join("")}
    </sitemapindex>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
