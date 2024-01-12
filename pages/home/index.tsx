"use client";

import React from "react";
import MapUkraine from "@app/components/molecules/mapUkraine/mapUkraine";
import { MainLayout } from "@app/components/templates";
import Slider from "@app/components/molecules/slider/slider";
import Script from "next/script";
import { Map_Data } from "@app/components/molecules/mapUkraine/map-data";
import MapOfUkraine from "@app/components/molecules/map/Map";

const HomePage = () => {
  return (
    <MainLayout>
      <div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <Slider />

          <div className="text-2xl text-blue-900 flex justify-center items-center valign-middle mb-10">
            ДМ-Проект є надійним партнером українських лікарів з 2009 року.
          </div>

          <div
            className="flex flex-1 flex-row justify-end items-center self-center"
            style={{ width: "1400px" }}
          >
            <div className="text-2xl text-blue-800">
              <p className={"font-bold"}>Поставлено:</p>
              <br />
              <p className={"py-2"}>4000 одиниць обладнання</p>
              <p>400 міст України</p>
              <br />
              <p className={"font-bold"}>Ми пропонуємо комплексні рішення:</p>
              <br />
              <p>
                - з проектування медичних закладів,
                <br />
                - з підбору та постачання оптимальної конфігурації <br />
                якісного медичного обладнання згідно потреб клієнта,
                <br />
                - навчання персоналу,
                <br />- гарантійного та післягарантійного обслуговування.
              </p>
            </div>
          </div>

          <MapOfUkraine />
          
          <div className="text-2xl text-blue-900 flex justify-center items-center valign-middle mt-10">
            Наші партнери:
          </div>
          <div className="flex flex-1 flex-row justify-center items-center valign-middle bg-white">
            <div className="m-10">
              <a href="https://www.draeger.com">
                <img
                  src="/logo-partners/dreger-log-partner.jpg"
                  width={150}
                  alt="Logo DM-Project"
                ></img>
              </a>
            </div>
            <div className="m-10">
              <a href="https://www.prohs.pt">
                <img
                  src="/logo-partners/prohs-log-partner.png"
                  width={150}
                  alt="Logo Prohs"
                ></img>
              </a>
            </div>
            <div className="m-10">
              <a href="https://www.at-os.com">
                <img
                  src="/logo-partners/atos-log-partner.jpg"
                  width={150}
                  alt="Logo AT-OS"
                ></img>
              </a>
            </div>
            <div className="m-10">
              <a href="https://www.lojer.com">
                <img
                  src="/logo-partners/lojer-log-partner.jpg"
                  width={150}
                  alt="Logo Lojer"
                ></img>
              </a>
            </div>
            <div className="m-10">
              <a href="http://renosem.com">
                <img
                  src="/logo-partners/renosem-log-partner.jpg"
                  width={150}
                  alt="Logo Renosem"
                ></img>
              </a>
            </div>
          </div>
          <div className="text-2xl text-blue-900 flex justify-center items-center valign-middle mb-10">
            ДМ-Проект допомагає зберігати життя українців!
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
