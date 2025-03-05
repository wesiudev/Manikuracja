import Hero from "@/components/Hero";
import { Metadata, Viewport } from "next";
import image1 from "../public/lukiery.png";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="w-full h-12 bg-[#E7C1C6]"></div>
      <div className="h-screen w-full bg-[#CFACAC] flex flex-col items-center justify-center text-center lg:flex-row lg:justify-between">
        <Image
          src={image1}
          width={1024}
          height={1024}
          alt="Lakiery do manicure"
          className="max-w-[550px]"
        />
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
