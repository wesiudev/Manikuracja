/* eslint-disable @typescript-eslint/no-explicit-any */
import Hero from "@/components/Hero";
import { Metadata, Viewport } from "next";
import image1 from "../public/lukiery.png";
import Image from "next/image";
import { getDocument } from "@/firebase";
export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.search as string | undefined;
  if (search) {
    const data = await getDocument("pages", search);
    return <>Jest search: {data?.lat}</>;
  } else
    return (
      <>
        <Hero />
        {/* <div className="p-4 max-h-[80vh] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 overflow-y-auto bg-white z-[125] rounded-lg">
        <ul>
          {data?.salons?.map((salon: any) => (
            <li
              key={salon.place_id}
              className="mb-4 p-4 border rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">{salon.name}</h3>
              <p>{salon.vicinity}</p>
              {salon.rating && <p>⭐ {salon.rating} / 5</p>}
            </li>
          ))}
        </ul>
      </div> */}
        <div className="w-full h-12 bg-[#E7C1C6]"></div>
        <div className="h-max py-12 lg:h-screen w-full lg:px-12 mx-auto bg-[#CFACAC] flex flex-col items-center justify-center lg:flex-row lg:justify-between">
          <Image
            src={image1}
            width={1024}
            height={1024}
            alt="Lakiery do manicure"
            className="w-full px-12 lg:px-0 lg:w-1/2"
          />
          <div className="px-6 2xl:px-24 lg:w-1/2 lg:flex lg:items-center">
            <div className="mt-6 lg:mt-0">
              <h2
                className="font-tenor text-3xl lg:text-5xl xl:text-6xl text-white"
                style={{ lineHeight: 1.5 }}
              >
                Dołącz do specjalistek z branży manicure i pedicure
              </h2>
              <p className="text-xl text-white font-tenor mt-3 lg:mt-6">
                Chcesz zacząć zarabiać na swoich umiejętnościach i pasji?
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ec4899",
};

export const metadata: Metadata = {
  publisher: "manikuracja.pl",
  manifest: "/manifest.json",
  icons: [
    {
      url: "/fav.png",
      sizes: "192x192",
      type: "image/png",
    },
  ],
  title:
    "Manikuracja.pl: Aplikacja zaprojektowana z myślą o Twoich paznokciach",
  description:
    "Profesjonalne profile specjalistów manicure i pedicure. Znajdź najlepsze usługi w swojej okolicy. Zarejestruj się już dziś!",
  openGraph: {
    type: "website",
    url: "https://manikuracja.pl",
    title:
      "Manikuracja.pl: Aplikacja zaprojektowana z myślą o Twoich paznokciach",
    description:
      "Profesjonalne profile specjalistów manicure i pedicure. Znajdź najlepsze usługi w swojej okolicy. Zarejestruj się już dziś!",
    siteName: "manikuracja.pl",
  },
};
