import Image from "next/image";
import logo from "../../public/logo.png";
import Logic from "./Logic";
import { IService } from "@/types";
export default function SearchBar({
  slugCity,
  service,
}: {
  slugCity: string;
  service?: IService;
}) {
  return (
    <>
      <div className="mt-6 p-6 w-full min-h-[10%] bg-gray-200 rounded-lg relative">
        <div className="absolute -top-6 -translate-x-1/2 left-1/2 bg-gray-200 py-3 px-6 rounded-lg">
          <Image
            src={logo}
            alt={`Rezerwacja paznokci ${slugCity}`}
            className="w-[150px]"
            priority
          />
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
          {slugCity && !service && (
            <>
              Zarezerwuj manicure i pedicure w{" "}
              <span className="text-[#FF5F8F]">{slugCity}</span>
            </>
          )}
          {slugCity && service && (
            <>
              Zarezerwuj {service.real_name.toLowerCase()} w{" "}
              <span className="text-[#FF5F8F]">{slugCity}</span>
            </>
          )}{" "}
          {!slugCity && (
            <>
              Umów się na paznokcie w{" "}
              <span className="text-[#FF5F8F]">Twoim mieście</span>
            </>
          )}
        </h1>

        <Logic slugCity={slugCity} />
      </div>
    </>
  );
}
