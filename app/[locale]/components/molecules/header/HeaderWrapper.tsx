import { Suspense } from "react";
import Header from "./Header";

export default function HeaderWrapper() {
  return (
    <Suspense fallback={<header style={{ visibility: "hidden" }} />}>
      <Header />
    </Suspense>
  );
}
