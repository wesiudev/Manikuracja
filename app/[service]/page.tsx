import SearchBar from "@/components/SearchBar";
import NotFound from "../not-found";

interface IService {
  name: string;
  description: string;
  type: string;
  ownerId: string;
  id: string;
}
export function generateStaticParams() {
  const services: IService[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `${i}`,
    name: `Service ${i}`,
    description: `This is the description of service ${i}`,
    ownerId: `${i}`,
    type: "Manicure Hybrydowy",
  }));
  return services.map((service: IService) => ({
    params: { service: service.type },
  }));
}

export default async function ServiceSlug({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/services/${service}`
  );
  const s = await data.json();
  if (s.length === 0) {
    return <NotFound />;
  }
  return (
    <div>
      <SearchBar slugService={s} slugCity="" results={[]} />
    </div>
  );
}
