import Image from "next/image";
import logo from "../../public/logo.png";
import Logic from "./Logic";
import Results from "./Results";
export default function SearchBar({
  slugService,
  slugCity,
  results,
}: {
  slugService: string;
  slugCity: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[];
}) {
  return (
    <>
      <div className="p-6 w-full min-h-[10%] bg-gray-200 rounded-lg">
        <Image
          src={logo}
          alt="Rezerwacja paznokci"
          className="w-[150px]"
          priority
        />

        <h1 className="mt-3 text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
          {slugService && !slugCity ? (
            <>
              Zarezerwuj <span className="text-[#FF5F8F]">{slugService}</span>
            </>
          ) : (
            slugService
          )}{" "}
          {slugCity && <span className="text-[#FF5F8F]">{slugCity}</span>}
          {!slugService && (
            <>
              Umów się na paznokcie w{" "}
              <span className="text-[#FF5F8F]">Twoim mieście</span>
            </>
          )}
        </h1>

        <Logic slugService={slugService} slugCity={slugCity} />
      </div>
      <Results results={results} />
    </>
  );
}
