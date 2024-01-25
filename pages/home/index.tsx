"use client";

import React from "react";
import { MainLayout } from "@app/components/templates";
import Slider from "@app/components/molecules/slider/slider";
import MapOfUkraine from "@app/components/molecules/map/Map";
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  return (
    <MainLayout>
      <div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <Slider />

          <div className="text-2xl text-blue-900 flex justify-center items-center valign-middle mb-10">
            {'ДМ-Проект є надійним партнером українських лікарів з 2009 року.'}
          </div>

          <div
            className="flex flex-1 flex-row justify-end items-center self-center"
            style={{ width: "85%", maxWidth: "1400px" }}>
            
            <div className="text-2xl text-blue-800">
              <div className={"font-bold"}> {'Поставлено:'}</div>
              <br />
                <div className="flex flex-1 flex-row items-center self-center">
                  <div
                    className="self-start"
                    style={{ width: "50px" }}>
                      <Image
                          alt="Галочка"
                          width={25}
                          height={25}
                          src={"/galka.png"} />
                  </div>
                    <div className={"font-bold"}> {'4200 одиниць обладнання'}</div>

              </div>
              <div className="flex flex-1 flex-row">
                  <div
                    className="self-start align-top"
                    style={{ width: "50px" }}>
                      <Image
                          alt="Галочка"
                          width={25}
                          height={25}
                          src={"/galka.png"} />
                  </div>

                    <div className={"font-bold"}> {'400 міст України'}</div>
              </div>
              <br />
              <div className={"font-bold"}> {'Ми пропонуємо комплексні рішення:'}</div>
              <br />
              <div>
                {'- з проектування медичних закладів,'}
                <br />
                {'- з підбору та постачання оптимальної конфігурації '}
                <br />
                {'якісного медичного обладнання згідно потреб клієнта,'}
                <br />
                {'- навчання персоналу,'}
                <br />
                {'- гарантійного та післягарантійного обслуговування.'}
              </div>
            </div>
            <div>
              <MapOfUkraine />
            </div>
          </div>
        </div>

        <div
          className="flex flex-1 flex-col text-slate-900 justify-center items-center m-auto p-10"
          style={{ width: "1400px" }}> {/*Сервіс та Проєктування*/}
          <div className="flex flex-col self-start"
            style={{ width: "900px" }}>
            <div className="flex flex-1 flex-col text-6xl font-bold indent-5"
              style={{ color: "#0061AA" }}>
              СЕРВіС
            </div>
            <div className="flex flex-1 flex-row text-slate-200 text-2xl">
              <Link href={"/services"}>
                <div className="p-5 text-blue-800 indent-5 text-justify"
                  style={{ width: "800px" }}>{'Offering solutions and products that are verifiably effective - that is our vision. She is our guiding principle on all levels - whether in strategic decision making within the management teams or in the daily operative work of each of our employees. Our vision always pushes us to develop and offer high quality solutions and products which can be proven to be effective and efficient in their application.'}</div>
              </Link>
              <div>
                <Link href={"/services"}>
                  <Image
                    src="/service.jpg"
                    alt={"Сервіс"}
                    width={250}
                    height={250} />
                </Link>
              </div>
            </div>

          </div>
          <div className="flex flex-col self-end"
            style={{ width: "1034px" }}>
            <div className="flex flex-1 flex-col text-slate-600 text-6xl font-bold self-end mt-10"
              style={{ color: "#0061AA" }}>
              ПРОЄКТУВАННЯ
            </div>
            <div className="flex flex-1 flex-row text-slate-200 text-2xl">
              <div>
                <Link href={"/projects"}>
                  <Image
                    src="/projection.jpg"
                    alt={"Проектування"}
                    width={250}
                    height={250} />
                </Link>
              </div>
              <Link href={"/projects"}>
                <div className="p-5 text-blue-800 indent-5 text-justify"
                  style={{ width: "800px" }}>

                  {'Offering solutions and products that are verifiably effective - that is our vision. She is our guiding principle on all levels - whether in strategic decision making within the management teams or in the daily operative work of each of our employees. Our vision always pushes us to develop and offer high quality solutions and products which can be proven to be effective and efficient in their application.'}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="text-4xl text-blue-900 flex justify-center items-center valign-middle mt-10">
            Наші партнери:
          </div>
          <div className="flex flex-1 flex-row justify-center items-center valign-middle bg-white">
            <div className="m-10">
              <Link href="https://www.draeger.com">
                <Image
                  src="/logo-partners/dreger-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo DM-Project"
                />
              </Link>
            </div>
            <div className="m-10">
              <Link href="https://www.prohs.pt/en/home/">
                <Image
                  src="/logo-partners/prohs-log-partner.png"
                  width={150}
                  height={150}
                  alt="Logo Prohs"
                />
              </Link>
            </div>
            <div className="m-10">
              <Link href="https://www.at-os.com">
                <Image
                  src="/logo-partners/atos-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo AT-OS"
                />
              </Link>
            </div>
            <div className="m-10">
              <Link href="https://www.lojer.com">
                <Image
                  src="/logo-partners/lojer-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo Lojer"
                />
              </Link>
            </div>
            <div className="m-10">
              <Link href="http://renosem.com">
                <Image
                  src="/logo-partners/renosem-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo Renosem"
                />
              </Link>
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
