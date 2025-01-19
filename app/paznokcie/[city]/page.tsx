import SearchBar from "@/components/SearchBar";
import ServicesArray from "@/components/SearchBar/ServicesArray";
import { getServices } from "@/utils/getServices";
import { getSingleCity } from "@/utils/getSingleCity";
export async function generateStaticParams() {
  const cities = await fetch(`${process.env.NEXT_PUBLIC_URL}/cities`).then(
    (res) => res.json()
  );
  return cities.map((city: string) => ({
    params: { city },
  }));
}

export default async function ServiceCitySlug({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const cityParam = (await params).city;
  const city = await getSingleCity(cityParam);
  const services = await getServices();
  return (
    <div>
      <SearchBar slugCity={city.name} />
      <ServicesArray services={services} city={city} />
    </div>
  );
}
