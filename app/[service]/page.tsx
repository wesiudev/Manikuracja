import noResults from "../../public/no-results.png";
import SearchBar from "@/components/SearchBar";
import NotFound from "../not-found";
import { IService } from "@/types";
import { getSingleService } from "@/utils/getSingleService";
import Results from "@/components/SearchBar/Results";
import Image from "next/image";
import CtaRegisterButton from "@/components/Cta";
// import PostSamples from "@/components/PostSamples";

export async function generateStaticParams() {
  const services = await fetch(`${process.env.NEXT_PUBLIC_URL}/services`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  return services.map((service: IService) => ({
    params: service.flatten_name,
  }));
}

export default async function ServiceSlug({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = await getSingleService(service);

  const results: string[] = [];
  if (s.error) {
    return <NotFound />;
  }
  return (
    <div>
      <SearchBar service={s} slugCity="" />

      <div className="p-6 w-full bg-white rounded-lg mt-3 h-full flex-grow">
        <div>
          <h2 className="text-xl font-bold text-zinc-800 drop-shadow-sm shadow-black">
            Przeglądaj najlepszych specjalistów{" "}
            <span className="italic">
              {s.real_name.replace(/\([^)]+\)/g, "").toLowerCase()}
            </span>{" "}
          </h2>
          {!results.length && (
            <div className="pt-6 w-full flex items-center justify-center flex-col text-center gap-4">
              <Image
                src={noResults}
                alt={`Brak specjalistów ${service}`}
                className="w-[150px] h-auto opacity-15"
              />
              <p className="text-sm text-gray-500 italic">
                Brak specjalistów manicure i pedicure. <br /> Zarejestruj się i
                wyświetlaj swoje usługi!
              </p>
              <CtaRegisterButton />
            </div>
          )}
          <Results results={results} />
        </div>
      </div>
      <div className="w-full bg-white rounded-lg mt-3 p-6">
        <h2 className="text-3xl lg:text-4xl text-zinc-800 drop-shadow-sm shadow-black font-bold text-center mb-6">
          Blog o manicure i pedicure
        </h2>
        <p className="text-center text-sm max-w-xl mb-12 mx-auto">
          Na naszym blogu jest nie tylko {s.real_name.toLowerCase()}, znajdziesz
          tam także wiedzę o zdrowiu, stylu i nowości ze świata paznokci.
          Zapraszamy do zapoznania się z naszymi wpisami!
        </p>
        {/* <PostSamples /> */}
      </div>
    </div>
  );
}
