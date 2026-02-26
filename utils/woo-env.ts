import "server-only";

type WooEnv = {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
};

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function getWooEnv(): WooEnv {
  const baseUrlRaw =
    process.env.WC_BASE_URL || process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!baseUrlRaw) {
    throw new Error(
      "Woo base URL is required. Set WC_BASE_URL or NEXT_PUBLIC_WORDPRESS_RITE_URL.",
    );
  }

  if (!consumerKey) {
    throw new Error("WC_CONSUMER_KEY is required");
  }

  if (!consumerSecret) {
    throw new Error("WC_CONSUMER_SECRET is required");
  }

  return {
    baseUrl: normalizeBaseUrl(baseUrlRaw),
    consumerKey,
    consumerSecret,
  };
}
