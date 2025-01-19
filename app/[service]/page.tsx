import SearchBar from "@/components/SearchBar";
import NotFound from "../not-found";
import { IService } from "@/types";
import { getSingleService } from "@/utils/getSingleService";
import Results from "@/components/SearchBar/Results";

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
  const data = await getSingleService(service);
  const s = await data.json();
  const results: string[] = [];
  if (s.error) {
    return <NotFound />;
  }
  return (
    <div>
      <SearchBar service={s} slugCity="" />
      <div className="p-6 w-full bg-gray-200 rounded-lg mt-3">
        <div className="">
          <h2 className="text-3xl">Wyniki wyszukiwania dla</h2>
          <Results results={results} />
        </div>
      </div>
    </div>
  );
}
