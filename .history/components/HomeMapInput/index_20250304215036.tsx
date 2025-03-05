/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { addDocument, getDocument } from "@/firebase";
import { removePolishPostalCodes } from "@/utils/removePolishPostalCodes";

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
async function generatePage(data: any) {
  const existingPage = await getDocument("pages", data.id);
  if (existingPage) {
    return { error: true };
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/generatePage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
    return response;
  }
}
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

  const [selected, setSelected] = useState<Location | null>(
    data.location || null
  );
  const [mapCenter, setMapCenter] = useState<Location>(
    data.location || defaultCenter
  );
  const [address, setAddress] = useState<string>(data.location?.address || "");

  // Initialize Geocoder
  const initGeocoder = useCallback(() => {
    if (!geocoder.current) {
      geocoder.current = new google.maps.Geocoder();
    }
  }, []);
  // Handle Map Click
  const handleClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng && geocoder.current) {
        const location = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setSelected(location);
        setMapCenter(location);
        setLocationDetails({
          ...locationDetails,
          lng: event.latLng.lng(),
          lat: event.latLng.lat(),
        });

        // Reverse Geocoding
        geocoder.current.geocode({ location }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            generatePage({
              lat: locationDetails.lat,
              lng: locationDetails.lng,
              place: address,
              id: removePolishPostalCodes(createLinkFromText(address)),
            }).then((res) => {
              console.log(res)
            }
            setAddress(results[0].formatted_address);
            setLocationDetails({
              ...locationDetails,
              place: results[0].formatted_address,
            });
            setData({ ...data, name: results[0].formatted_address });
          } else {
            console.error("Geocoder failed due to: " + status);
            setAddress("Unknown location");
          }
        });
      }
    },
    [geocoder]
  );

  // Update Redux State
  useEffect(() => {
    if (selected && address) {
      setData({
        ...data,
        location: {
          lng: selected.lng,
          lat: selected.lat,
          address: address,
        },
      });
    }
  }, [selected, address]);

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
          onLoad={(map) => {
            mapRef.current = map;
            initGeocoder();
          }}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </div>
  );
};
