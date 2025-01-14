import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;
const LINKS_PER_SITEMAP = 50000;

async function getTotalLinks() {
  return 7811146; // Total number of links
}

export async function GET() {
  const totalLinks = await getTotalLinks();
  const totalSitemaps = Math.ceil(totalLinks / LINKS_PER_SITEMAP);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Array.from(
        { length: totalSitemaps },
        (_, i) => `
        <sitemap>
          <loc>${BASE_URL}/sitemaps/${i}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>`
      ).join("")}
    </sitemapindex>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
