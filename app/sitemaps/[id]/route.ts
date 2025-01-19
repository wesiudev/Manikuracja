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

// Function to generate all links
function generateAllLinks(
  services: IService[],
  cities: { id: string; name: string }[]
) {
  const date = new Date().toISOString();
  const links: { url: string; lastModified: string }[] = [];

  // Generate service-city links
  services.forEach((service) => {
    cities.forEach((city) => {
      links.push({
        url: `${BASE_URL}/${service.flatten_name}/${city.id}`,
        lastModified: date,
      });
    });
  });

  // Generate /paznokcie/{city.id} links
  cities.forEach((city) => {
    links.push({
      url: `${BASE_URL}/paznokcie/${city.id}`,
      lastModified: date,
    });
  });

  return links;
}

// Function to get links for a specific range
function getLinksForSitemap(
  links: { url: string; lastModified: string }[],
  start: number,
  end: number
) {
  return links.slice(start, end);
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

  // Generate all links
  const allLinks = generateAllLinks(services, cities);

  const totalLinks = allLinks.length;
  const start = sitemapId * LINKS_PER_SITEMAP;
  const end = Math.min(start + LINKS_PER_SITEMAP, totalLinks);

  if (start >= totalLinks) {
    return NextResponse.json({ error: "Sitemap not found" }, { status: 404 });
  }

  // Get links for the current sitemap
  const links = getLinksForSitemap(allLinks, start, end);

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
