import type { ReactNode } from "react";
import { MainLayout } from "../components/templates";

type PartnersLayoutProps = {
  children: ReactNode;
};

export default function PartnersLayout({ children }: PartnersLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
