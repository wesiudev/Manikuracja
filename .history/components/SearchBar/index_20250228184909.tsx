import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="w-full relative">
        <div className="h-max w-max flex flex-col items-center justify-center text-center mx-auto">
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
