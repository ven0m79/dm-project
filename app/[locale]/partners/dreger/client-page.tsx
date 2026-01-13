"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "../Partners.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

import dreger from "../../../../public/logo-partners/dreger-log-partner.webp";

export const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
    const t = useTranslations("AboutPage");

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center w-full max-w-[1000px]">
                <div className="flex flex-row">
                    <div className="w-[400px]">
                        <Image
                            className=""
                            src={dreger}
                            alt="Dräger"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify">
                        <h1 className="text-[24px]">Dräger</h1>
                        <div><strong>Рік заснування:</strong> 1889</div>
                        <div><strong>Країна:</strong> Німеччина</div>
                        <div><strong>Офіційний сайт:</strong> https://www.draeger.com/</div>
                        <div><strong>Соціальні мережі:</strong>
                            LinkedIn |
                            Facebook |
                            Instagram |
                            YouTube
                        </div></div>
                </div>
                <div className="flex flex-col self-center justify-center gap-4">
                    <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify">Dräger — бренд із Німеччини з історією понад століття. Компанія працює з 1889 року та пройшла шлях від інженерних
                        розробок до масштабного виробництва медичних систем, які використовують у лікарнях у багатьох країнах світу.
                        У медичному напрямку Dräger асоціюється з надійністю обладнання, продуманістю інтерфейсів та увагою до сценаріїв,
                        у яких важлива кожна секунда — від операційної до відділення інтенсивної терапії.

                        Асортимент медичної продукції Dräger охоплює базові потреби стаціонару та критичної допомоги. Це рішення для
                        анестезіології та операційних (анестезіологічні робочі місця й системи), апарати штучної вентиляції легень для
                        різних клінічних ситуацій, системи моніторингу пацієнта та суміжні рішення для організації безперервного контролю
                        показників. Окремий напрям — неонатальні рішення, зокрема обладнання для підтримки стабільного середовища й догляду
                        за новонародженими, що критично для відділень, де значення мають точні налаштування та прогнозована робота техніки.

                        Придбати продукцію Dräger в DM Project зручно, коли потрібен швидкий і зрозумілий підбір під задачу відділення та
                        комплектація в одному місці. Тут легше узгодити потрібні позиції між собою, уникнути помилок сумісності та
                        отримати рішення, яке коректно закриває реальний клінічний сценарій, а не просто “окремий пристрій у вакуумі”.

                        Обирайте Dräger у каталозі DM Project — щоб отримати перевірені медичні рішення з логічною комплектацією та
                        прозорим шляхом від вибору до покупки.</div>


                </div>
            </div>

        </MainLayout >
    );
};
