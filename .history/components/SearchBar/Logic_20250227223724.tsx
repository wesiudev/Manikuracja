"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { getCityQuery } from "@/utils/getCityQuery";

interface City {
  name: string;
  id: string;
}

export default function Logic({ slugCity }: { slugCity?: string }) {
  const [city, setCity] = useState<City>({
    name: "",
    id: "",
  });
  const [currentCitiesArray, setCurrentCitiesArray] = useState<City[]>([]);
  const router = useRouter();
  // Debounce state updates
  const [debouncedCityName, setDebouncedCityName] = useState<string>(city.name);
  // Fetch cities
  const fetchCities = async (query: string) => {
    try {
      const cityLink = createLinkFromText(query);
      const data = await getCityQuery(cityLink);

      if (data.length > 0 && data[0].name === city.name) {
        setCity({
          name: data[0].name,
          id: data[0].id,
        });
      }
      setCurrentCitiesArray(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching cities:", error);
      }
    }
  };

  // Handle debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCityName(city.name), 300);
    return () => clearTimeout(handler);
  }, [city.name]);

  // Fetch cities when debouncedCityName changes
  useEffect(() => {
    if (!debouncedCityName) return;

    if (city.name.length > 2) {
      fetchCities(debouncedCityName);
    }
  }, [debouncedCityName]);

  const search = () => {
    if (!city.name.length) {
      toast.error("Proszę wybrać miasto.", {
        position: "top-center",
        draggable: true,
        autoClose: 5000,
      });
      return;
    }
    if (city.name.length > 0) {
      const cityLink = createLinkFromText(city.name);
      router.push(`${process.env.NEXT_PUBLIC_URL}/paznokcie/${cityLink}`);
    }
  };
  return (
    <div className="flex flex-col mt-3 w-full relative">
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          name="city"
          value={city.name}
          onChange={(e) => setCity({ ...city, name: e.target.value })}
          placeholder={slugCity || "Wpisz miasto"}
          style={{ boxShadow: "inset 0px 0px 4px #000" }}
          className="rounded-md mt-3 max-w-[300px] bg-black/50 text-lg placeholder:text-white z-[91] block sm:max-w-1/2 px-2 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="off"
          list="no-autocomplete"
        />

        <button
          type="button"
          className="block mt-3 font-archivo z-[50] w-max max-w-full px-6 text-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300"
          onClick={search}
        >
          SZUKAJ
        </button>
      </div>
      {city.name !== currentCitiesArray[0]?.name &&
        currentCitiesArray.length > 0 && (
          <div
            className="fixed bg-black/50 top-0 left-0 w-full h-full"
            onClick={() => setCurrentCitiesArray([])}
          ></div>
        )}
      {city.name !== currentCitiesArray[0]?.name &&
        currentCitiesArray.length > 0 && (
          <ul className="z-[60] absolute w-full max-h-[300px] overflow-y-auto top-[72px]">
            {currentCitiesArray.map((c, index) => (
              <li
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                } px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer`}
                onClick={() => {
                  setCity({ ...city, name: c.name, id: c.id });
                  setCurrentCitiesArray([]);
                }}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
