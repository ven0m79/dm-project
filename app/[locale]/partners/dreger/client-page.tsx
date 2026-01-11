"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "../Partners.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

import roman from "../../../public/roman.webp";
import vystavka from "../../../public/vystavka.webp";


export const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
    const t = useTranslations("AboutPage");

    return (
        <MainLayout>
            <div className={classNames("flex flex-1 sm:px-5 text-black", styles.aboutText)}>
                DREGER
            </div>
    </MainLayout >
  );
};
