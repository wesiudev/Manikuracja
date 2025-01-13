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
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const serviceData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/services/${service}`
  );
  const cityData = await fetch(`${process.env.NEXT_PUBLIC_URL}/cities/${city}`);
  const s = await serviceData.json();
  const c = await cityData.json();
  return (
    <div>
      <SearchBar slugService={s} slugCity={c[0].Name} results={[]} />
    </div>
  );
}
