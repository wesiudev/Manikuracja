import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="bg-woman bg-cover sm:bg-contain bg-no-repeat bg-blue-400/70 w-full min-h-[50%] relative">
        <div className="h-full w-full bg-black/40 p-12 sm:py-24 flex flex-col">
          <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg shadow-black font-bold">
            Najlepszy manicure w twoim mieście!
          </h2>
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
