import type { ReactNode } from "react";
import { MainLayout } from "@app/[locale]/components/templates";

type SharesLayoutProps = {
  children: ReactNode;
};

export default function SharesLayout({ children }: SharesLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
