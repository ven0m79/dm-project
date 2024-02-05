import React from "react";

import { MainLayout } from "@app/[locale]/components/templates";

const Shares = () => {
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-6xl text-gray-900">{'Ви на сторінці "Акції"'}</h1>
      </div>
    </MainLayout>
  );
};

export default Shares;