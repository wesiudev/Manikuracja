import { useLoadScript } from "@react-google-maps/api";

export function useMapConsts() {
  const libraries: "places"[] = ["places"]; // Required for Places API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY || "",
    libraries,
  });
  return { isLoaded, loadError };
}
