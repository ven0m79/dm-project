'use client';

import { useEffect, useState } from "react";

const MEDIA_QUERY = "(max-width: 650px)";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Безпека: цей код виконується лише на клієнті
    const mediaQuery = window.matchMedia(MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Ініціалізація поточного стану
    setIsMobile(mediaQuery.matches);

    // Підписка на зміни
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isMobile;
};
