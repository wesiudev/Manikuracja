"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createLinkFromText } from "@/utils/createLinkFromText";

interface City {
  Name: string;
  Province: string;
}

export default function Logic({
  slugService,
  slugCity,
}: {
  slugService?: string;
  slugCity?: string;
}) {
  const [service, setService] = useState<string>("");
  const [city, setCity] = useState<City>({
    Name: "",
    Province: "",
  });
  const [currentCitiesArray, setCurrentCitiesArray] = useState<City[]>([]);
  const [currentServicesArray, setCurrentServicesArray] = useState<string[]>(
    []
  );
  const router = useRouter();
  // Debounce state updates
  const [debouncedCityName, setDebouncedCityName] = useState<string>(city.Name);
  const [debouncedService, setDebouncedService] = useState<string>(service);

  // Fetch services
  const fetchServices = async (query: string, signal: AbortSignal) => {
    try {
      const serviceLink = createLinkFromText(query);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/services/${serviceLink}`,
        { signal }
      );
      const data = await response.json();
      setCurrentServicesArray(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching services:", error);
      }
    }
  };

  // Fetch cities
  const fetchCities = async (query: string, signal: AbortSignal) => {
    try {
      const cityLink = createLinkFromText(query);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/cities/${cityLink}`,
        { signal }
      );
      const data: City[] = await response.json();

      const uniqueCities = data.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.Name === value.Name && t.Province === value.Province
          )
      );

      if (uniqueCities.length > 0 && uniqueCities[0].Name === city.Name) {
        setCity({
          Name: uniqueCities[0].Name,
          Province: uniqueCities[0].Province,
        });
      }
      setCurrentCitiesArray(uniqueCities);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching cities:", error);
      }
    }
  };

  // Handle debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCityName(city.Name), 300);
    return () => clearTimeout(handler);
  }, [city.Name]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedService(service), 300);
    return () => clearTimeout(handler);
  }, [service]);

  // Fetch cities when debouncedCityName changes
  useEffect(() => {
    if (!debouncedCityName) return;

    const controller = new AbortController();
    fetchCities(debouncedCityName, controller.signal);

    return () => controller.abort(); // Cleanup
  }, [debouncedCityName]);

  // Fetch services when debouncedService changes
  useEffect(() => {
    if (!debouncedService) return;

    const controller = new AbortController();
    fetchServices(debouncedService, controller.signal);

    return () => controller.abort(); // Cleanup
  }, [debouncedService]);

  const search = () => {
    if (!service) {
      toast.error("Proszę wybrać usługę.", {
        position: "top-center",
        draggable: true,
        autoClose: 5000,
      });
      return;
    }
    if (!city.Name && service) {
      const cityLink = createLinkFromText(city.Name);
      const serviceLink = createLinkFromText(service);
      router.push(`${process.env.NEXT_PUBLIC_URL}/${serviceLink}/${cityLink}`);
    }
    if (city.Name && service) {
      const cityLink = createLinkFromText(city.Name);
      const serviceLink = createLinkFromText(service);
      router.push(`${process.env.NEXT_PUBLIC_URL}/${serviceLink}/${cityLink}`);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4 mt-6">
      <div className="relative w-full">
        <label htmlFor="service" className="text-gray-800">
          Usługa
        </label>
        <input
          type="text"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder={slugService || "Wybierz usługę"}
          className="rounded-md mt-1 w-full px-2 py-2 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          autoComplete="off"
          list="no-autocomplete"
        />
        <datalist id="no-autocomplete"></datalist>
        {service.length > 2 &&
          service !== currentServicesArray[0] &&
          currentServicesArray.length > 0 && (
            <ul className="z-[60] absolute w-full max-h-[300px] overflow-y-auto mt-2 shadow-lg">
              {currentServicesArray.map((service, index) => (
                <li
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                  } px-4 py-2 hover:bg-pink-400 hover:text-white cursor-pointer`}
                  onClick={() => {
                    setService(service);
                    setCurrentServicesArray([]);
                  }}
                >
                  {service}
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="relative w-full">
        <label htmlFor="city" className="text-gray-800">
          Miasto
        </label>
        <input
          type="text"
          name="city"
          value={city.Name}
          onChange={(e) => setCity({ ...city, Name: e.target.value })}
          placeholder={slugCity || "Wybierz miasto"}
          className="rounded-md mt-1 w-full px-2 py-2 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          autoComplete="off"
          list="no-autocomplete"
        />
        {city.Name !== currentCitiesArray[0]?.Name &&
          currentCitiesArray.length > 0 && (
            <ul className="z-[60] absolute w-full max-h-[300px] overflow-y-auto mt-2 shadow-lg">
              {currentCitiesArray.map((c, index) => (
                <li
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                  } px-4 py-2 hover:bg-pink-400 hover:text-white cursor-pointer`}
                  onClick={() => {
                    setCity({ ...city, Name: c.Name, Province: c.Province });
                    setCurrentCitiesArray([]);
                  }}
                >
                  {c.Name}{" "}
                  <span className="text-xs text-gray-600">{c.Province}</span>
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="w-full items-end flex">
        <button
          type="button"
          className="w-full py-2 lg:py-0 lg:h-3/5 px-6 text-lg rounded-lg bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-300"
          onClick={search}
        >
          Szukaj
        </button>
      </div>
    </div>
  );
}
