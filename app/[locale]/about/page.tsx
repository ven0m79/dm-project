import React from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./About.module.css";

const AboutPage = () => {

  return (
    <MainLayout>
      <div
        className={classNames(
          "flex flex-1 justify-center items-start",
          styles["aboutContainer"],
        )}
      >
        <div
          className={classNames(
            "flex justify-center items-start rounded-xl w-30",
            styles["aboutMainPhoto"],
          )}
        />
        <div
          className={classNames(
            "flex flex-column justify-center items-start",
            styles["aboutText"],
          )}
        >
          <div className={classNames("m-2 indent-5 text-justify")}>
            {
              "ТОВ «ДМ-ПРОЕКТ» засноване у 2009 році. Ми є офіційним представником в Україні міжнародної компанії Dräger, світового лідера у виробництві систем життєзабезпечення людини.Наше медичне обладнання успішно використовується у багатьох лікувальних закладах країни. Так ми поставили понад 1000 апаратів штучної вентиляції легень, що надійно працюють у всіх областях України."
            }
          </div>
          <div className={classNames("m-2 indent-5 text-justify")}>
            {
              "Наркозно - дихальні апарати, апарати ШВЛ, монітори стану пацієнта, реанімаційні місця, інкубатори для новона-роджених, медичні архітектурні системи (медичні консолі, приліжкові панелі), операційні світильники та освітлювальні системи для операційних, а також витратні матеріали для медичного обладнання - ось неповний перелік нами продукції."
            }
          </div>
          <div className={classNames("m-2 indent-5 text-justify")}>
            {
              "Наслідуючи сучасні принципи всебічного та якісного обслуговування наших клієнтів, ми забезпечуємо надання широкого переліку послуг: прорахунок оптимальної конфігурації медичного обладнання, введення його в експлуатацію, навчання персоналу, гарантійний та післягарантійний ремонт, постачання витратних матеріалів. Наші клієнти завжди можуть бути впевнені у допомозі професіоналів. Ще одна дуже перспективна сфера діяльності нашої компанії пов'язана з таким високотехнологічним продуктом, як «чисті приміщення»."
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
