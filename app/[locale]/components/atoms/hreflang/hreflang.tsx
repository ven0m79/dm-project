export default function getHreflangLinks(path: string) {
  const BASE_URL = "https://dm-project.com.ua"; // виправив на нормальний домен без подвійного .com

  return {
    ua: `${BASE_URL}${path}`,      // UA без префікса
    en: `${BASE_URL}/en${path}`,   // EN з префіксом
    xDefault: `${BASE_URL}${path}` // x-default окремо
  };
}