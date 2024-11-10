import { useRouter } from "../../../../config";
import { useCallback } from "react";

const PATHNAME_TO_NAVIGATE = "/catalog/sub-catalog";

export const useNavigateTo = () => {
  const router = useRouter();

  const navigateWithDelay = useCallback(
    (category: string) => {
      const params = new URLSearchParams();
      params.set("category", category);

      const timerID = setTimeout(() => {
        router.push(`${PATHNAME_TO_NAVIGATE}?${params}`);
        clearTimeout(timerID);
      }, 500);
    },
    [router],
  );

  return {
    navigateWithDelay,
  };
};
