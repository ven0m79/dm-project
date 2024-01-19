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
            style={{ width: "1400px" }}
          >
            <div className="text-2xl text-blue-800">
              <div className={"font-bold"}> {'Поставлено:'}</div>
              <br />
              <div className={"py-2"}> {'4000 одиниць обладнання'}</div>
              <div> {'400 міст України'}</div>
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

          
          
          <div className="text-2xl text-blue-900 flex justify-center items-center valign-middle mt-10">
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
              <Link href="https://www.prohs.pt">
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
