import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="bg-woman bg-cover sm:bg-contain bg-no-repeat bg-blue-400/90 w-full min-h-[50%] relative sm:py-12">
        <div className="h-max w-max p-12 flex flex-col items-center justify-center text-center mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg shadow-black font-bold">
            Najlepszy manicure w twoim mieście!
          </h2>
          <p className="text-gray-200 drop-shadow-lg shadow-black">
            Topowe salony manicure {slugCity} i okolice
          </p>
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
