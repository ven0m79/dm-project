import React from "react";

import { MainLayout } from "@app/[locale]/components/templates";

const AboutUsPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-6xl text-gray-900">{'Ви на сторінці "Контакти"'}</h1>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
