import { useEffect, useState } from "react";

const MEDIA_QUERY = "(max-width: 650px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Next.js / SSR safety
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);

    const update = () => setIsMobile(mediaQuery.matches);

    // initial value
    update();

    // subscribe
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}
