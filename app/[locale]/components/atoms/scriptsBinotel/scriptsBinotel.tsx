"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientScriptLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const widgetHash =
      pathname === "/services"
        ? "iwuxcf4pbms1bjtplqjy"
        : "41zcyas3q551sr3dvq5x";

    // 1️⃣ Видаляємо попередній скрипт
    const existingScript = document.querySelector(
      'script[data-binotel="true"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // 2️⃣ (опціонально) чистимо можливий контейнер віджета
    const existingWidget = document.querySelector(
      '[class*="binotel"]'
    );
    if (existingWidget) {
      existingWidget.remove();
    }

    // 3️⃣ Створюємо новий скрипт
    const script = document.createElement("script");
    script.src = `https://widgets.binotel.com/getcall/widgets/${widgetHash}.js`;
    script.async = true;
    script.setAttribute("data-binotel", "true");

    document.body.appendChild(script);

  }, [pathname]);

  return null;
}
