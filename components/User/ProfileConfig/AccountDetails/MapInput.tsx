import React, { useState, useCallback, useRef, memo, useEffect } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import { User } from "@/types";

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

export const MapInput = memo(function MapInput({
  user,
  loadError,
  isLoaded,
}: {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadError: any;
  isLoaded: boolean;
}) {
  const dispatch = useDispatch();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const [selected, setSelected] = useState<Location | null>(
    user.location || null
  );
  const [mapCenter, setMapCenter] = useState<Location>(
    user.location || defaultCenter
  );
  const [address, setAddress] = useState<string>(user.location?.address || "");

  // Initialize Geocoder
  const initGeocoder = useCallback(() => {
    if (!geocoder.current) {
      geocoder.current = new google.maps.Geocoder();
    }
  }, []);

  // Handle Place Selection
  const handlePlaceSelect = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelected(location);
        setMapCenter(location);
        setAddress(place.formatted_address || "");
      }
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
        // Reverse Geocoding
        geocoder.current.geocode({ location }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            setAddress(results[0].formatted_address);
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
      dispatch(
        setUser({
          ...user,
          location: {
            lng: selected.lng,
            lat: selected.lat,
            address: address,
          },
        })
      );
    }
  }, [selected, address]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Autocomplete
          onLoad={(ref) => {
            autocompleteRef.current = ref;
            initGeocoder();
          }}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Allow manual input
            placeholder="Rozpocznij wyszukiwanie"
            style={{
              width: "100%",
              height: "40px",
              padding: "0 12px",
              fontSize: "16px",
            }}
            className="border-gray-300 border rounded-md p-2 mt-1"
          />
        </Autocomplete>
      </div>
      <div className="overflow-hidden relative rounded-lg">
        <div className="absolute bottom-0 left-0 h-[22px] bg-gray-200 w-full z-50"></div>
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
});
