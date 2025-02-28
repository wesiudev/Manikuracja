import noResults from "../../../public/no-results.png";
import NotFound from "@/app/not-found";
import CtaRegisterButton from "@/components/Cta";
import PostSamples from "@/components/PostSamples";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/SearchBar/Results";
import ServicesArray from "@/components/SearchBar/ServicesArray";
import { ICity, IService, User } from "@/types";
import { getCities } from "@/utils/getCities";
import { getServices } from "@/utils/getServices";
import { getCityServiceUsers } from "@/utils/getServiceUsers";
import { getSingleCity } from "@/utils/getSingleCity";
import { Viewport } from "next";
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
  const s: IService = await serviceData.json();
  const cityData: ICity = await getSingleCity(city);
  const services = await getServices();
  if (!s || !cityData) {
    return <NotFound />;
  }
  const results: User[] = await getCityServiceUsers(
    cityData.id,
    s.flatten_name
  );
  return (
    <div className="flex flex-col">
      <div>
        <SearchBar slugCity={cityData.name} />
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
                Brak ofert manicure i pedicure {cityData.name}{" "}
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
          Paznokcie {cityData.name}, manicure i pedicure - nowości ze świata
          paznokci. Zapraszamy do zapoznania się z naszym blogiem!
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
  const { service, city } = await params;
  const serviceData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/service/${service}`,
    { next: { revalidate: 3600 } }
  );
  const s: IService = await serviceData.json();
  const cityData: ICity = await getSingleCity(city);
  return {
    title: `${s.real_name.replace(/\([^)]+\)/g, "")} - Paznokcie ${
      cityData.name
    }`,
    description: `Przeglądaj profile specjalistów oferujących ${s.real_name.replace(
      /\([^)]+\)/g,
      ""
    )} w ${
      cityData.name
    }. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
    publisher: "manikuracja.pl",
    url: `https://manikuracja.pl/${s.flatten_name}/${cityData.id}`,
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
      url: `https://manikuracja.pl/${s.flatten_name}/${cityData.id}`,
      title: `${s.real_name.replace(/\([^)]+\)/g, "")} - Paznokcie ${
        cityData.name
      }`,
      description: `Przeglądaj profile specjalistów oferujących ${s.real_name.replace(
        /\([^)]+\)/g,
        ""
      )} w ${
        cityData.name
      }. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
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
      title: `${s.real_name.replace(/\([^)]+\)/g, "")} - Paznokcie ${
        cityData.name
      }`,
      description: `Przeglądaj profile specjalistów oferujących ${s.real_name.replace(
        /\([^)]+\)/g,
        ""
      )} w ${
        cityData.name
      }. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
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
