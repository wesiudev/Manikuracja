import { createLinkFromText } from "@/utils/createLinkFromText";
import type { MetadataRoute } from "next";
let cachedData: { services: string[]; cities: string[] } | null = null;

async function getCachedServicesAndCities() {
  if (!cachedData) {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_URL is not defined in environment variables."
      );
    }

    const [services, cities] = await Promise.all([
      fetch(`${baseUrl}/services`).then((res) => res.json()),
      fetch(`${baseUrl}/cities`).then((res) => res.json()),
    ]);

    cachedData = { services, cities };
  }
  return cachedData;
}

function generateUrls(baseUrl: string, services: string[], cities: string[]) {
  const linkServices = services.map(createLinkFromText);
  const date = new Date(Date.now());
  return linkServices.flatMap((service) =>
    cities.map((city) => ({
      url: `${baseUrl}/${service}/${city}`,
      lastModified: date,
    }))
  );
}

export async function generateSitemaps() {
  const { services, cities } = await getCachedServicesAndCities();
  return Array.from({ length: cities.length * services.length }, (_, id) => ({
    id,
  }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const { services, cities } = await getCachedServicesAndCities();
  const baseUrl = process.env.NEXT_PUBLIC_URL!;
  const urls = generateUrls(baseUrl, services, cities);

  const start = id * 20000;
  const end = start + 20000;

  return urls.slice(start, end);
}
