import noResults from "../../../public/no-results.png";
import NotFound from "@/app/not-found";
import CtaRegisterButton from "@/components/Cta";
import PostSamples from "@/components/PostSamples";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/SearchBar/Results";
import ServicesArray from "@/components/SearchBar/ServicesArray";
import { ICity } from "@/types";
import { getCityUsers } from "@/utils/getCityUsers";
import { getServices } from "@/utils/getServices";
import { getSingleCity } from "@/utils/getSingleCity";
import { Viewport } from "next";
import Image from "next/image";
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
  params: Promise<{ city: string }>;
}) {
  const cityParam = (await params).city;
  const city = await getSingleCity(cityParam);
  const services = await getServices();
  if (city?.error) {
    return <NotFound />;
  }
  const results = await getCityUsers(city.id);
  console.log(results);
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <SearchBar slugCity={city.name} />
        <ServicesArray services={services} city={city} />
      </div>
      <div className="p-6 w-full bg-white rounded-lg mt-3 h-full">
        <div className="">
          <h2 className="text-xl font-bold text-zinc-800 drop-shadow-sm shadow-black">
            Wyniki wyszukiwania w {city.name}
          </h2>

          {!results.length && (
            <div className="pt-6 w-full flex items-center justify-center flex-col text-center gap-4">
              <Image
                src={noResults}
                alt={`Obrazek informujący o braku specjalistów w ${city.name}`}
                className="w-[150px] h-auto opacity-15"
              />
              <p className="text-sm text-gray-500 italic">
                Brak specjalistów manicure i pedicure. <br /> {city.name} czeka
                na Twoje usługi!
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
          {city.name} to wspaniałe miejsce do szerzenia wiedzy o zdrowiu, stylu
          i nowościach ze świata paznokci. Zapraszamy do zapoznania się z naszym
          blogiem!
        </p>
        <PostSamples />
      </div>
    </div>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ec4899",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { city } = await params;
  const cityData: ICity = await getSingleCity(city);
  return {
    title: `Paznokcie ${cityData.name} najlepszy wybór w 2025r. - Manikuracja`,
    description: `Przeglądaj profile specjalistów oferujących stylizacje paznokci w ${cityData.name}. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
    publisher: "manikuracja.pl",
    url: `https://manikuracja.pl/paznokcie/${cityData.id}`,
    authors: [
      {
        name: "Manikuracja",
        url: "https://manikuracja.pl",
      },
    ],
    icons: [
      {
        url: "/fav.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    openGraph: {
      type: "website",
      title: `Najlepsi specjaliści od paznokci ${cityData.name} - Rezerwacje, Profile`,
      description: `Przeglądaj profile specjalistów oferujących stylizacje paznokci w ${cityData.name}. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
      siteName: "Manikuracja",
      images: [
        {
          url: "../../../public/pricing.png",
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Manikuracja",
      title: `Najlepsi specjaliści od paznokci ${cityData.name} - Rezerwacje, Profile`,
      description: `Przeglądaj profile specjalistów oferujących stylizacje paznokci w ${cityData.name}. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
      image: {
        url: "../../../public/pricing.png",
      },
    },
    meta: [
      {
        name: "theme-color",
        content: "#ec4899",
      },
    ],
  };
}
