"use client";
import { getPlace } from "@/utils/getPlace";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const ManicureSalons = ({ location }: { location: any }) => {
  const [salons, setSalons] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location) return;
    const fetchSalons = async () => {
      const response = await getPlace(location.lng, location.lat);

      console.log(response);
      setSalons(response.results);
    };

    fetchSalons();
  }, [location]);

  return (
    <div className="p-4 max-h-[80vh] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 overflow-y-auto bg-white z-[125] rounded-lg">
      <h2 className="text-xl font-bold mb-4">Salony manicure blisko Ciebie</h2>
      <ul>
        {salons.map((salon) => (
          <li
            key={salon.place_id}
            className="mb-4 p-4 border rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">{salon.name}</h3>
            <p>{salon.vicinity}</p>
            {salon.rating && <p>⭐ {salon.rating} / 5</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManicureSalons;
