export const isIOS =
  typeof navigator !== "undefined" &&
  /iPhone|iPad|iPod/i.test(navigator.userAgent);
