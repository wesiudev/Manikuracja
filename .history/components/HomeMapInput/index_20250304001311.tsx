/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { useRouter } from "next/navigation";
import { createPage } from "@/utils/createPage";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 52.2296756, // Default latitude
  lng: 21.0122287, // Default longitude
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

type Location = {
  lat: number;
  lng: number;
};

export const HomeMapInput = ({
  data,
  locationDetails,
  setLocationDetails,
  setData,
  loadError,
  isLoaded,
}: {
  data: any;
  locationDetails: any;
  setLocationDetails: any;
  setData: any;
  loadError: any;
  isLoaded: boolean;
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const router = useRouter();

  const [selected, setSelected] = useState<Location | null>(
    data.location || null
  );
  const [mapCenter, setMapCenter] = useState<Location>(
    data.location || defaultCenter
  );
  const [address, setAddress] = useState<string>(data.location?.address || "");

  // Initialize Geocoder when component mounts
  useEffect(() => {
    if (!geocoder.current) {
      geocoder.current = new google.maps.Geocoder();
    }
  }, []);

  // Handle Map Click
  const handleClick = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if (!event.latLng || !geocoder.current) return;

      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setSelected(location);
      setMapCenter(location);
      setLocationDetails((prev: any) => ({
        ...prev,
        lat: location.lat,
        lng: location.lng,
      }));

      // Reverse Geocoding
      geocoder.current.geocode({ location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const formattedAddress = results[0].formatted_address;

          router.push(`?search=${createLinkFromText(formattedAddress)}`);
          createPage({
            lat: location.lat,
            lng: location.lng,
            search: formattedAddress,
          });

          setAddress(formattedAddress);
          setLocationDetails((prev: any) => ({
            ...prev,
            place: formattedAddress,
          }));
          setData((prev: any) => ({
            ...prev,
            name: formattedAddress,
          }));
        } else {
          console.error("Geocoder failed due to: " + status);
          setAddress("Unknown location");
        }
      });
    },
    [router, setLocationDetails, setData]
  );

  // Update Data when selected location or address changes
  useEffect(() => {
    if (selected && address) {
      setData((prev: any) => ({
        ...prev,
        location: {
          lat: selected.lat,
          lng: selected.lng,
          address: address,
        },
      }));
    }
  }, [selected, address, setData]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <div className="relative rounded-lg overflow-hidden border border-gray-300">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={mapCenter}
          options={options}
          onClick={handleClick}
          onLoad={(map) => (mapRef.current = map)}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </div>
  );
};
