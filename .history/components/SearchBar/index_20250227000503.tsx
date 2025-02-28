import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="bg-hand bg- bg-no-repeat w-full min-h-[10%] rounded-xl relative">
        <div className="h-full w-full bg-black/50 p-12 rounded-xl flex flex-col">
          <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg shadow-black font-bold">
            {!slugCity && "Umów się na paznokcie w Twoim mieście"}
          </h2>
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
