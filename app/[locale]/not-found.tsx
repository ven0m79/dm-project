// app/[locale]/not-found.tsx

import NotFoundPage from "./components/atoms/NotFoundPage/notFoundPage";
import { MainLayout } from "./components/templates";

export default async function NotFound() {
  return (
    <MainLayout>
      <NotFoundPage />
    </MainLayout>
  );
}
