"use client";
import Logic from "./Logic";
import Results from "./Results";
export default function SearchBar({
  slugService,
  slugCity,
  results,
}: {
  slugService: string;
  slugCity: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[];
}) {
  return (
    <div className="">
      <Logic slugService={slugService} slugCity={slugCity} />
      <Results results={results} />
    </div>
  );
}
