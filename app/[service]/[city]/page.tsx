import SearchBar from "@/components/SearchBar";
import data from "polskie-miejscowosci";
export function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((city: any) => ({
    params: { city: city.Name },
  }));
}

export default async function ServiceSlug({
  params,
}: {
  params: { service: string; city: string };
}) {
  const { service, city } = await params;
  const serviceData = await fetch(`http://localhost:3000/services/${service}`);
  const cityData = await fetch(`http://localhost:3000/cities/${city}`);
  const s = await serviceData.json();
  const c = await cityData.json();
  return (
    <div>
      <SearchBar slugService={s} slugCity={c[0].Name} results={[]} />
    </div>
  );
}
