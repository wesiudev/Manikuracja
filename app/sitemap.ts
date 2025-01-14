import { createLinkFromText } from "@/utils/createLinkFromText";
import type { MetadataRoute } from "next";
import data from "polskie-miejscowosci";

// Helper function to generate URLs for services and cities
function generateUrls(
  services: string[]
): { url: string; lastModified: Date }[] {
  const linkCities = data.map((city) => createLinkFromText(city.Name));
  const linkServices = services.map((service) => createLinkFromText(service));
  const url = process.env.NEXT_PUBLIC_URL;
  let idCounter = 1;
  return linkServices.flatMap((service) =>
    linkCities.map((city) => ({
      id: idCounter++,
      url: `${url}/${service}/${city}`,
      lastModified: new Date(),
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
  const start = id * 5000;
  const end = start + 5000;

  return urls.slice(start, end);
}
