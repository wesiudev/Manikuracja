/* eslint-disable @typescript-eslint/no-explicit-any */
import Logic from "./Logic";
export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="w-full relative mt-3">
        <div className="h-max w-max flex flex-col items-center justify-center text-center mx-auto">
          <Logic slugCity={slugCity} />
        </div>
      </div>
    </>
  );
}
