import noResults from "../../public/no-results.png";
import SearchBar from "@/components/SearchBar";
import NotFound from "../not-found";
import { IService, User } from "@/types";
import { getSingleService } from "@/utils/getSingleService";
import Results from "@/components/SearchBar/Results";
import Image from "next/image";
import CtaRegisterButton from "@/components/Cta";
import PostSamples from "@/components/PostSamples";
import { Viewport } from "next";
import { getServiceUsers } from "@/utils/getCityServiceUsers";

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

  const results: User[] = await getServiceUsers(s.flatten_name);
  if (s.error) {
    return <NotFound />;
  }
  return (
    <div>
      <SearchBar slugCity="" />

      <div className="p-6 w-full bg-white rounded-lg mt-3 h-full flex-grow">
        <div>
          <h2 className="text-xl font-bold text-zinc-800 drop-shadow-sm shadow-black">
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
                Paznokcie manicure i pedicure. <br /> Zarejestruj się i
                wyświetlaj swój profil!
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
          Nowości ze świata paznokci. Zapraszamy do zapoznania się z naszymi
          wpisami!
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
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const serviceData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/service/${service}`,
    { next: { revalidate: 3600 } }
  );
  const s: IService = await serviceData.json();
  return {
    title: `${s.real_name.replace(
      /\([^)]+\)/g,
      ""
    )} Najlepszy w 2025r. - Manikuracja`,
    description: `Przeglądaj profile specjalistów oferujących ${s.real_name.replace(
      /\([^)]+\)/g,
      ""
    )}. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
    publisher: "manikuracja.pl",
    url: `https://manikuracja.pl/${s.flatten_name}`,
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
      url: `https://manikuracja.pl/${s.flatten_name}`,
      title: `${s.real_name.replace(
        /\([^)]+\)/g,
        ""
      )} - Rezerwacje i profile specjalistów`,
      description: `Przeglądaj profile specjalistów oferujących ${s.real_name.replace(
        /\([^)]+\)/g,
        ""
      )}. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
      siteName: "Manikuracja",
      images: [
        {
          url: "../../public/pricing.png",
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Manikuracja",
      title: `${s.real_name.replace(
        /\([^)]+\)/g,
        ""
      )} - Rezerwacje i profile specjalistów`,
      description: `Przeglądaj profile specjalistów oferujących ${s.real_name.replace(
        /\([^)]+\)/g,
        ""
      )}. Stwórz portfolio manicure lub pedicure i wyświetlaj usługi w swoim mieście już dziś.`,
      image: {
        url: "../../public/pricing.png",
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
