"use client";
import { useEffect, useState } from "react";

export default function LocationRequest() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("Please enable location services for a better experience.");
          console.error("Error getting location:", err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Your location: {location.lat}, {location.lng}
        </p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Requesting location...</p>
      )}
    </div>
  );
}
