import SearchBar from "@/components/SearchBar";
import { Metadata, Viewport } from "next";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-screen w-full bg-background bg-cover">
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-[#B67280]/90 rounded-xl p-12 w-max max-w-[90%] h-max">
          <h1 className="text-center text-white">
            <span className="font-alta text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              MANIKURACJA
            </span>
            <br />
            <span className="font-light block mt-3 font-tenor text-xl lg:text-2xl xl:text-3xl">
              NAJLEPSZY MANICURE W TWOIM MIEŚCIE
            </span>
          </h1>
          <SearchBar slugCity="" />
          <Link href="" className="px-6 py-1.5 border border-white text-white">
            DLA SPECJALISTEK
          </Link>
        </div>
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
