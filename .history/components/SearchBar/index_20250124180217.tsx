import Image from "next/image";
import logo from "../../public/logo.png";
import Logic from "./Logic";
import { IService } from "@/types";
export default async function SearchBar({
  slugCity,
  service,
}: {
  slugCity: string;
  service?: IService;
}) {
  return (
    <>
      <div className="mt-6 p-6 w-full min-h-[10%] bg-white rounded-lg relative">
        <div className="absolute -top-6 -translate-x-1/2 left-1/2 bg-white py-3 px-6 rounded-lg">
          <Image
            src={logo}
            alt={`Rezerwacja paznokci ${slugCity}`}
            className="w-[150px]"
            priority
          />
        </div>
        {slugCity && !service && (
          <h1 className="mt-3 text-2xl sm:text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
            Najlepsi specjaliści od paznokci{" "}
            <span className="text-[#FF5F8F]">{slugCity}</span>
          </h1>
        )}
        {slugCity && service && (
          <h1 className="mt-3 text-2xl sm:text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
            Zarezerwuj {service.real_name.toLowerCase()} w{" "}
            <span className="text-[#FF5F8F]">{slugCity}</span>
          </h1>
        )}{" "}
        <h2 className="mt-3 text-2xl sm:text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
          {!slugCity && (
            <>
              Umów się na paznokcie w{" "}
              <span className="text-[#FF5F8F]">Twoim mieście</span>
            </>
          )}
        </h2>
        <Logic slugCity={slugCity} />
      </div>
    </>
  );
}
