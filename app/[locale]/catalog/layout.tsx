import { ReactNode } from "react";
import { MainLayout } from "../components/templates";

type Props = {
  children: ReactNode;
};

export default function CatalogLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
