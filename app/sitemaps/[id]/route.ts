import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;
const LINKS_PER_SITEMAP = 50000; // Google's limit

// Mock function to fetch the total links (replace with actual logic)
async function getTotalLinks() {
  return 7811146; // Total number of links
}

// Mock function to fetch links for a specific range (replace with DB or API logic)
async function getLinks(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => ({
    url: `${BASE_URL}/item-${start + i}`,
    lastModified: new Date().toISOString(),
  }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const sitemapId = parseInt(id as string, 10);

  const totalLinks = await getTotalLinks();
  const start = sitemapId * LINKS_PER_SITEMAP;
  const end = Math.min(start + LINKS_PER_SITEMAP, totalLinks);

  if (start >= totalLinks) {
    return NextResponse.json({ error: "Sitemap not found" });
  }

  const links = await getLinks(start, end);

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
