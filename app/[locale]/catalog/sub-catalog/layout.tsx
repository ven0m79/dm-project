import { ReactNode } from "react";
import { MainLayout } from "@app/[locale]/components/templates";
import { SidebarProvider } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import ClientLayout from "./client-layout";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <MainLayout>
      <SidebarProvider locale={locale}>
        <ClientLayout locale={locale}>
          {children}
        </ClientLayout>
      </SidebarProvider>
    </MainLayout>
  );
}
