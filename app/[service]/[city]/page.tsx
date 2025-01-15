import NotFound from "@/app/not-found";
import SearchBar from "@/components/SearchBar";
import data from "polskie-miejscowosci";
export function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((city: any) => ({
    params: { city: city.Name },
  }));
}

export default async function ServiceCitySlug({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const serviceData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/services/${service}`,
    { next: { revalidate: 3600 } }
  );
  const cityData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/cities/${city}`,
    { next: { revalidate: 3600 } }
  );
  const s = await serviceData.json();
  const c = await cityData.json();
  if (s.length === 0 || s.length === 0) {
    return <NotFound />;
  }
  return (
    <div>
      <SearchBar slugService={s} slugCity={c[0].Name} results={[]} />
    </div>
  );
}
