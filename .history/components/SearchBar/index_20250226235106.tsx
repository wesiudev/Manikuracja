import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className=" p-6 w-full min-h-[10%] bg-white rounded-lg relative">
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
