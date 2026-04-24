const BASE_URL = "https://dm-project.com.ua";

export default function getHreflangLinks(path: string) {
  return {
    ua: `${BASE_URL}${path}`,
    en: `${BASE_URL}/en${path}`,
    xDefault: `${BASE_URL}${path}`,
  };
}

export function getAlternates(uaPath: string, locale: string, enPath?: string) {
  const resolvedEnPath = enPath ?? uaPath;
  const canonical =
    locale === "en" ? `${BASE_URL}/en${resolvedEnPath}` : `${BASE_URL}${uaPath}`;
  return {
    canonical,
    languages: {
      uk: `${BASE_URL}${uaPath}`,
      en: `${BASE_URL}/en${resolvedEnPath}`,
      "x-default": `${BASE_URL}${uaPath}`,
    },
  };
}