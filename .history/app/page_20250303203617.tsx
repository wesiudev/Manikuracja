import Hero from "@/components/Hero";
import { Viewport } from "next";
import image1 from "../public/lukiery.png";
import Image from "next/image";
import ManicureSalons from "@/components/ManicureSalons";

// After
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  return {
    title: "Test",
  };
}
export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Hero />
      <div className="w-full h-12 bg-[#E7C1C6]"></div>
      <div className="h-max py-12 lg:h-screen w-full lg:px-12 mx-auto bg-[#CFACAC] flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <Image
          src={image1}
          width={1024}
          height={1024}
          alt="Lakiery do manicure"
          className="w-full lg:w-1/2"
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
        <ManicureSalons search={searchParams.search} data={} />
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
// export const metadata: Metadata = {
//   publisher: "manikuracja.pl",
//   manifest: "/manifest.json",
//   icons: [
//     {
//       url: "/fav.png",
//       sizes: "192x192",
//       type: "image/png",
//     },
//   ],
//   title:
//     "Manikuracja.pl: Aplikacja zaprojektowana z myślą o Twoich paznokciach",
//   description:
//     "Profesjonalne profile specjalistów manicure i pedicure. Znajdź najlepsze usługi w swojej okolicy. Zarejestruj się już dziś!",
//   openGraph: {
//     type: "website",
//     url: "https://manikuracja.pl",
//     title:
//       "Manikuracja.pl: Aplikacja zaprojektowana z myślą o Twoich paznokciach",
//     description:
//       "Profesjonalne profile specjalistów manicure i pedicure. Znajdź najlepsze usługi w swojej okolicy. Zarejestruj się już dziś!",
//     siteName: "manikuracja.pl",
//   },
// };
