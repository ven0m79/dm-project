import React from "react";

import { MainLayout } from "@app/[locale]/components/templates";

const ServicesPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-6xl text-black">Ви на сторінці Сервіс</h1>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;