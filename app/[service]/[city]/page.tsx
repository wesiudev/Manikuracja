import NotFound from "@/app/not-found";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/SearchBar/Results";
import ServicesArray from "@/components/SearchBar/ServicesArray";
import { IService } from "@/types";
import { getCities } from "@/utils/getCities";
import { getServices } from "@/utils/getServices";
import { getSingleCity } from "@/utils/getSingleCity";
export async function generateStaticParams() {
  const cities = await getCities();
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
    `${process.env.NEXT_PUBLIC_URL}/service/${service}`
  );
  const cityData = await getSingleCity(city);
  const s: IService = await serviceData.json();
  const services = await getServices();
  if (!s || !cityData) {
    return <NotFound />;
  }
  const results: string[] = [];
  return (
    <div className="min-h-screen flex flex-col pb-10">
      <div>
        <SearchBar service={s} slugCity={cityData.name} />
        <ServicesArray services={services} city={cityData} />
      </div>
      <div className="p-6 w-full bg-gray-200 rounded-lg mt-3 h-full flex-grow">
        <div className="">
          <h2 className="text-xl font-bold text-zinc-800 drop-shadow-sm shadow-black">
            Wyniki wyszukiwania dla{" "}
            {s.real_name.replace(/\([^)]+\)/g, "").toLowerCase()}
          </h2>
          {!results.length && (
            <p className="text-sm text-gray-600">
              Brak specjalistów. {cityData.name} potrzebuje Twoich usług
              manicure i pedicure!
            </p>
          )}
          <Results results={results} />
        </div>
      </div>
    </div>
  );
}
