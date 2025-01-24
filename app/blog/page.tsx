import SearchBar from "@/components/SearchBar";
import { PostSample } from "@/types";
import { getPostSamples } from "@/utils/getPostSamples";
import { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const samples = await getPostSamples();
  return (
    <div>
      <SearchBar slugCity="" />
      <div className="p-6 rounded-lg bg-white mt-3">
        <h1 className="text-xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
          Wszystko o stylizacjach paznokci, poradniki oraz nowości ze świata
          manicure i pedicure
        </h1>
        <p className="mt-1.5">Zapoznaj się z naszymi najnowszymi postami</p>
      </div>
      {samples.map((item: PostSample, i: number) => (
        <div
          key={i}
          className="relative flex flex-col lg:flex-row mt-3 bg-white rounded-lg p-6"
        >
          <div className="lg:sticky lg:top-6 h-max left-0 w-full lg:w-1/3 xl:w-1/4">
            <Image
              width={512}
              height={512}
              src={item.image}
              alt={`Obrazek postu manicure ${item.title}`}
              className="w-full rounded-lg"
            />
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/blog/${item.url}`}
              title={`Cały post ${item.title}`}
              className="text-center mt-3 rounded-md block py-3 w-full bg-green-500 text-white hover:bg-green-600 duration-150"
            >
              Czytaj całość
            </Link>
          </div>
          <div className="w-full lg:pl-6 prose pt-6 lg:pt-0">
            <h2 className="">{item.title}</h2>
            <p>{item.shortDesc}</p>
            <h4>W skrócie:</h4>
            <h3>{item.text1Title}</h3>
            <p>{item.text1Desc}</p>
            <h3>{item.text2Title}</h3>
            <p>{item.text2Desc}</p>
            <h3>{item.text3Title}</h3>
            <p>{item.text3Desc}</p>
            <h3>{item.text4Title}</h3>
            <p>{item.text4Desc}</p>
            <h3>{item.text5Title}</h3>
            <p>{item.text5Desc}</p>
            <h3>{item.text6Title}</h3>
            <p>{item.text6Desc}</p>
            <h3>{item.text7Title}</h3>
            <p>{item.text7Desc}</p>
            <h4>{item?.tags}</h4>
          </div>
        </div>
      ))}
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
  title: "Manikuracja.pl: Blog o manicure i pedicure - poradniki i nowości",
  description:
    "Znajdziesz tutaj wiedzę o zdrowiu, stylu i nowości ze świata paznokci. Zapraszamy do zapoznania się z naszym blogiem!",
  openGraph: {
    type: "website",
    url: "https://manikuracja.pl",
    title: "Manikuracja.pl: Blog o manicure i pedicure - poradniki i nowości",
    description:
      "Znajdziesz tutaj wiedzę o zdrowiu, stylu i nowości ze świata paznokci. Zapraszamy do zapoznania się z naszym blogiem!",
    siteName: "manikuracja.pl",
  },
};
