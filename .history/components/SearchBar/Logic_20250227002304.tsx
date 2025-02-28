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
    <div className="flex flex-col sm:flex-row gap-4 mt-3 w-full">
      <div className="relative w-full mt-6">
        <label
          htmlFor="city"
          className="block w-max text-white text-lg font-bold"
        >
          Miasto
        </label>
        <input
          type="text"
          name="city"
          value={city.name}
          onChange={(e) => setCity({ ...city, name: e.target.value })}
          placeholder={slugCity || "Wpisz miasto"}
          style={{ boxShadow: "inset 0px 0px 4px #000" }}
          className="bg-black/50 placeholder:text-white z-[91] block mt-1 w-full px-2 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-800"
          autoComplete="off"
          list="no-autocomplete"
        />
        {city.name !== currentCitiesArray[0]?.name &&
          currentCitiesArray.length > 0 && (
            <ul className="z-[60] absolute w-full max-h-[300px] overflow-y-auto mt-2 shadow-lg rounded-md">
              {currentCitiesArray.map((c, index) => (
                <li
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                  } px-4 py-2 hover:bg-pink-400 hover:text-white cursor-pointer`}
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
      <div className="w-full items-end flex">
        <button
          type="button"
          className="z-[50] w-full py-2 lg:py-0 lg:h-3/5 px-6 text-lg rounded-lg bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-300"
          onClick={search}
        >
          Szukaj
        </button>
      </div>
    </div>
  );
}
