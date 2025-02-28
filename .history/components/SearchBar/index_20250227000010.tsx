import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="bg-marshmellow bg-cover px-6 w-full min-h-[10%] bg-white rounded-lg relative p-12">
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
    </>
  );
}
