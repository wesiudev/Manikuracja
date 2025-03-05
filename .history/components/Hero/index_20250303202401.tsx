import SearchBar from "../SearchBar";
import SpecialistsButton from "../SpecialistsButton";

export default function Hero({ search }: { search: string }) {
  return (
    <div className="h-screen w-full bg-background bg-cover">
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-[#B67280]/90 rounded-xl py-12 md:p-12 w-max max-w-[90%] h-max">
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
          <SpecialistsButton />
        </div>
      </div>
    </div>
  );
}
