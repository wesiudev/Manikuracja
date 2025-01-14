import { createLinkFromText } from "@/utils/createLinkFromText";
import type { MetadataRoute } from "next";
import data from "polskie-miejscowosci";

// Helper function to generate URLs for services and cities
function generateUrls(
  services: string[]
): { url: string; lastModified: Date }[] {
  if (!process.env.NEXT_PUBLIC_URL) {
    throw new Error("NEXT_PUBLIC_URL is not defined in environment variables.");
  }
  const linkCities = data.map((city) => createLinkFromText(city.Name));
  const linkServices = services.map((service) => createLinkFromText(service));
  let idCounter = 1;
  return linkServices.flatMap((service) =>
    linkCities.map((city) => ({
      id: idCounter++,
      url: `${process.env.NEXT_PUBLIC_URL}/${service}/${encodeURIComponent(
        city
      )}`,
      lastModified: new Date(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
      ),
    }))
  );
}

// Fetch services data
async function fetchServices(): Promise<string[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/services`);
  if (!response.ok) {
    throw new Error("Failed to fetch services data.");
  }
  return response.json();
}

// Generate all sitemaps
export async function generateSitemaps() {
  const services = await fetchServices();
  return generateUrls(services);
}

// Generate paginated sitemap
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const services = await fetchServices();

  // Google's limit is 50,000 URLs per sitemap
  const urls = generateUrls(services);
  const start = id * 50000;
  const end = start + 50000;

  return urls.slice(start, end);
}
