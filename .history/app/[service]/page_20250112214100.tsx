import SearchBar from "@/components/SearchBar";

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
  params: { service: string };
}) {
  const { service } = await params;
  const data = await fetch(`http://localhost:3000/services/${service}`);
  const s = await data.json();
  return (
    <div>
      <SearchBar slugService={s} slugCity="" results={[]} />
    </div>
  );
}
