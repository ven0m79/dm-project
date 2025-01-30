import { useMediaQuery } from "usehooks-ts";

const MEDIA_QUERY = "(max-width: 650px)";

export const useIsMobile = () => {
  return useMediaQuery(MEDIA_QUERY);
};
