import NotFound from "@/app/not-found";
import SearchBar from "@/components/SearchBar";
export async function generateStaticParams() {
  const cities = await fetch(`${process.env.NEXT_PUBLIC_URL}/cities`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  return cities.map((city: string) => ({
    params: { city },
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
