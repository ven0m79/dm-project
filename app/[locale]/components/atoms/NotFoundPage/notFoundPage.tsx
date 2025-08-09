"use client";

import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-190px)] text-center">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
        {t("title")}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
        {t("description")}
      </p>
    </div>
  );
}