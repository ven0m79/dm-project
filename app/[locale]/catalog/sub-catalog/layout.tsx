import { ReactNode } from "react";
import { MainLayout } from "@app/[locale]/components/templates";
import { SidebarProvider } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import ClientLayout from "./client-layout";
import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";
import { categoriesCreation, TransformedCategoriesType } from "./helpers";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  let initialCategories: TransformedCategoriesType[] = [];
  try {
    const raw = await fetchWooCommerceCategories(locale);
    initialCategories = categoriesCreation(raw as unknown as TransformedCategoriesType[]);
  } catch {
    // fallback: SidebarProvider will fetch client-side
  }

  return (
      <SidebarProvider locale={locale} initialCategories={initialCategories}>
        <ClientLayout locale={locale}>
          {children}
        </ClientLayout>
      </SidebarProvider>
  );
}
