import Hero from "@/components/Hero";
import { Metadata, Viewport } from "next";
import image1 from "../public/lukiery.png";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="w-full h-12 bg-[#E7C1C6]"></div>
      <div className="h-max py-12 lg:h-screen w-full lg:px-24 mx-auto bg-[#CFACAC] flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <Image
          src={image1}
          width={1024}
          height={1024}
          alt="Lakiery do manicure"
          className="w-3/4 lg:max-w-[550px]"
        />
        <div className="px-6 lg:px-24">
          <h2
            className="mt-12 lg:mt-0 font-tenor text-3xl lg:text-6xl lg:w-3/4 text-white"
            style={{ lineHeight: 1.5 }}
          >
            Dołącz do specjalistek z branży manicure i pedicure
          </h2>
          <p className="text-lg lg:text-xl text-white font-tenor mt-6">
            Zarejestruj się już dziś i zacznij zarabiać na swoich
            umiejętnościach
          </p>
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
