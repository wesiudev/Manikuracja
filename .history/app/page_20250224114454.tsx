import { Metadata, Viewport } from "next";
import CtaRegisterButton from "@/components/Cta";
import PostSamples from "@/components/PostSamples";
import SearchBar from "@/components/SearchBar";
import heroimage from "@/public/heroimage.png";
import service1 from "@/public/home/service1.jpg";
import service2 from "@/public/home/service2.jpg";
import service3 from "@/public/home/service3.jpg";
import Image from "next/image";
import ProfileConfig from "@/components/User/ProfileConfig";

export default async function Home() {
  return (
    <div>
      {/* Search Section */}

      <SearchBar slugCity="" />
      <ProfileConfig />
      {/* Highlights Section */}
      <div>
        <div className="mt-3 rounded-lg p-6 py-12 bg-white lg:flex w-full lg:flex-row lg:items-end lg:justify-end">
          <div className="flex flex-col-reverse mx-auto">
            <h1 className="lg:text-right text-2xl md:text-4xl font-bold text-center text-zinc-800 drop-shadow-sm shadow-black">
              Pobierz aplikację Manikuracja, paznokcie w Twojej okolicy!
            </h1>
            <p className="text-center lg:text-right mb-3 text-gray-400 italic">
              Klientki na paznokcie w Twojej okolicy.
            </p>
          </div>
          <div>
            <Image
              src={heroimage}
              width={1024}
              height={1024}
              alt="Paznokcie w Twojej okolicy"
              className="w-1/2"
            />
          </div>
        </div>

        {/* Popular Services Section */}
        <div className="py-12 p-6 bg-white mt-3 rounded-lg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-3xl lg:text-4xl font-bold text-zinc-800 drop-shadow-sm shadow-black mb-6">
              Popularne usługi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <Image
                  src={service1}
                  alt="Manicure klasyczny"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-zinc-800 drop-shadow-sm shadow-black mb-2">
                  Manicure klasyczny
                </h3>
                <p className="text-gray-600 text-sm xl:text-base">
                  Ciesz się elegancją i prostotą klasycznego manicure.
                </p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <Image
                  src={service2}
                  alt="Manicure hybrydowy"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-zinc-800 drop-shadow-sm shadow-black mb-2">
                  Manicure hybrydowy
                </h3>
                <p className="text-gray-600 text-sm xl:text-base">
                  Trwałość i styl, który przetrwa tygodnie.
                </p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <Image
                  src={service3}
                  alt="Manicure magnetyczny"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-zinc-800 drop-shadow-sm shadow-black mb-2">
                  Manicure magnetyczny
                </h3>
                <p className="text-gray-600 text-sm xl:text-base">
                  Innowacyjna technologia, która zachwyca.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-12 p-6 bg-white mt-3 rounded-lg items-center justify-center flex flex-col text-center">
          <h2 className="text-zinc-800 drop-shadow-sm shadow-black text-3xl lg:text-4xl font-bold mb-4">
            Zacznij już dziś
          </h2>
          <p className="max-w-xl mb-3">
            Utwórz profil Salonu Kosmetycznego lub Pojedynczego Specjalisty,
            skonfiguruj listę oferowanych usług i wyświetlaj je w swoim mieście!
          </p>
          <CtaRegisterButton />
        </div>
        <div className="mt-3 p-6 bg-white rounded-lg w-full">
          <h2 className="text-3xl lg:text-4xl text-zinc-800 drop-shadow-sm shadow-black font-bold text-center mb-6">
            Blog o manicure i pedicure
          </h2>
          <p className="text-center text-sm max-w-xl mb-12 mx-auto">
            Znajdziesz tam wiedzę o zdrowiu, stylu i nowości ze świata paznokci.
            Zapraszamy do zapoznania się z naszym blogiem!
          </p>
          <PostSamples />
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
