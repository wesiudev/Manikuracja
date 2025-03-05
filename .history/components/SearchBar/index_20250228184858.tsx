import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="sm:bg-contain bg-no-repeat bg-blue-400/90 w-full relative">
        <div className="h-max w-max flex flex-col items-center justify-center text-center mx-auto">
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
