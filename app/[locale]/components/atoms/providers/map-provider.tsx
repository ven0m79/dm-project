"use client";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

// Определяем список библиотек для загрузки из API Google Карт 
const libraries: Libraries = ["places", "drawing", "geometry"];

// Определить компонент функции MapProvider, который принимает свойство children 
export function MapProvider({ children }: { children: ReactNode }) {
  const googleMapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey ?? "",
    libraries,
  });
  if (!googleMapsApiKey) {
    return null;
  }
  if (loadError) {
    return <p>Failed to load Google Maps.</p>;
  }

  if (!isLoaded) {
    return <p>Loading map script...</p>;
  }

  return children;
}