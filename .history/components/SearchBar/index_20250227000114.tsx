import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="bg-marshmellow px-6 w-full min-h-[10%] rounded-lg relative p-12">
        <div className="h-full w-full bg-black/50">
          <h2 className="text-2xl sm:text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold">
            {!slugCity && (
              <>
                Umów się na paznokcie w{" "}
                <span className="text-[#FF5F8F]">Twoim mieście</span>
              </>
            )}
          </h2>
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
