import type { ReactNode } from "react";
import { MainLayout } from "../components/templates";

type SharesLayoutProps = {
  children: ReactNode;
};

export default function SharesLayout({ children }: SharesLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
