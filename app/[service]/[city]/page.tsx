import noResults from "../../../public/no-results.png";
import NotFound from "@/app/not-found";
import CtaRegisterButton from "@/components/Cta";
// import PostSamples from "@/components/PostSamples";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/SearchBar/Results";
import ServicesArray from "@/components/SearchBar/ServicesArray";
import { ICity, IService } from "@/types";
import { getCities } from "@/utils/getCities";
import { getServices } from "@/utils/getServices";
import { getSingleCity } from "@/utils/getSingleCity";
import Image from "next/image";
export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((city: ICity) => ({
    params: city.id,
  }));
}

export default async function ServiceCitySlug({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const serviceData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/service/${service}`,
    { next: { revalidate: 3600 } }
  );
  const cityData = await getSingleCity(city);
  const s: IService = await serviceData.json();
  const services = await getServices();
  if (!s || !cityData) {
    return <NotFound />;
  }
  const results: string[] = [];
  return (
    <div className="flex flex-col">
      <div>
        <SearchBar service={s} slugCity={cityData.name} />
        <ServicesArray services={services} city={cityData} />
      </div>
      <div className="p-6 w-full bg-white rounded-lg mt-3 h-full">
        <div className="">
          <h2 className="text-xl font-bold text-zinc-800 drop-shadow-sm shadow-black">
            Przeglądaj najlepszych specjalistów{" "}
            <span className="italic">
              {s.real_name.replace(/\([^)]+\)/g, "").toLowerCase()}
            </span>{" "}
          </h2>
          {!results.length && (
            <div className="flex items-center justify-center flex-col space-y-3 mt-6">
              <Image
                src={noResults}
                alt={`Brak specjalistów manicure/pedicure ${cityData.name}`}
                className="w-[150px] h-auto opacity-10"
              />
              <p className="text-sm text-gray-500 italic text-center">
                Brak specjalistów manicure i pedicure. <br /> {cityData.name}{" "}
                czeka na Twoje usługi!
              </p>
              <CtaRegisterButton />
            </div>
          )}

          <Results results={results} />
        </div>
      </div>
      <div className="p-6 rounded-lg mt-3 bg-white">
        <h2 className="text-3xl lg:text-4xl text-zinc-800 drop-shadow-sm shadow-black font-bold text-center mb-6">
          Blog o manicure i pedicure
        </h2>
        <p className="text-center text-sm max-w-xl mb-12 mx-auto">
          {cityData.name} to wspaniałe miejsce do szerzenia wiedzy o zdrowiu,
          stylu i nowościach ze świata paznokci. Zapraszamy do zapoznania się z
          naszym blogiem!
        </p>
        {/* <PostSamples /> */}
      </div>
    </div>
  );
}
