"use client";
import { getPlace } from "@/utils/getPlace";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

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
    <div className="p-4 max-h-[80vh] fixed left-0 top-0 overflow-y-auto bg-white z-[125]">
      <h2 className="text-xl font-bold mb-4">Manicure Salons Near You</h2>
      {error && <p className="text-red-500">{error}</p>}
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
