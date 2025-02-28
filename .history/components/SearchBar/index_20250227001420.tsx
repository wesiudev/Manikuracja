import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="bg-woman bg-contain bg-no-repeat w-full min-h-[50%] relative">
        <div className="h-full w-full p-12 py-24 flex flex-col">
          <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg shadow-black font-bold">
            {!slugCity && "Umów się na paznokcie w Twoim mieście"}
          </h2>
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
