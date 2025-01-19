import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

// Fetch cities data only once and store it for reuse
let cities: { id: string }[] = [];

const fetchCities = async () => {
  if (cities.length === 0) {
    // Only fetch cities if not already fetched
    const response = await fetch(`${BASE_URL}/cities`);
    cities = await response.json();
  }
  return cities;
};

// Function to generate all the sitemaps at once
export async function generateSitemaps() {
  // Fetch cities only once
  const cities = await fetchCities();

  // Generate sitemap URLs
  let idIndex = 0;
  const links = cities.map((city: { id: string }) => ({
    url: `${BASE_URL}/paznokcie/${city.id}`,
    lastModified: new Date().toISOString(),
    id: idIndex++,
  }));

  return links;
}

// Function to generate paginated sitemaps
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Fetch cities only once
  const cities = await fetchCities();

  // Google's limit is 50,000 URLs per sitemap, paginate the cities accordingly
  const start = id * 5000;
  const end = start + 5000;

  // Generate sitemap URLs for the given page
  const links = cities.map((city: { id: string }) => ({
    url: `${BASE_URL}/paznokcie/${city.id}`,
    lastModified: new Date().toISOString(),
  }));

  // Slice the results based on pagination
  return links.slice(start, end);
}
