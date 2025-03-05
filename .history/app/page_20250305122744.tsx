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
  } else return <LandingPage />;
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
