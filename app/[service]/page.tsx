import SearchBar from "@/components/SearchBar";
import NotFound from "../not-found";
import { IService } from "@/types";

export async function generateStaticParams() {
  const services = await fetch(`${process.env.NEXT_PUBLIC_URL}/services`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  return services.map((service: IService) => ({
    params: { service: service.flatten_name },
  }));
}

export default async function ServiceSlug({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/service/${service}`,
    { next: { revalidate: 3600 } }
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
