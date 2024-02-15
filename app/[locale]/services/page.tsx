'use client'
import React from "react";

import { useState } from 'react';
import Head from 'next/head';
import styles from './Service.module.css';
import classNames from "classnames";

import imgSrc from './photos/svarka_servis.jpg';

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';
import { title } from "process";

const ServicesPage = ({ params: { locale } }: { params: { locale: string } }) => {
  //unstable_setRequestLocale(locale);
  const t = useTranslations('ServicePage');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };
    console.log(data);
  };
  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-col self-center", styles.main)}>
        <div className={styles.sendUsMessage}>
          {t('title')}
        </div>
        <div className={classNames("text-gray-900 flex flex-1 flex-row justify-normal items-start w-full")}>
          <div className={classNames("text-gray-900 flex flex-1 flex-col justify-normal items-start w-full")}>
            <div className={classNames("text-gray-900 justify-normal items-start indent-4 w-full mt-8", styles.leftContainer)}>
              <Image 
              className="float-left m-5"
              src={imgSrc}
              width={300} 
              height={200}
              alt={"photo"}>

              </Image>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, voluptate numquam. Facere magnam itaque ex fugit molestias ducimus aperiam at, id modi cumque fugiat rerum impedit similique quod expedita ea.
              Alias adipisci optio consequatur? Voluptas nisi, facere ipsum blanditiis atque, officia adipisci aliquid rem facilis amet saepe numquam vero provident, laudantium beatae incidunt consectetur qui cum dolores culpa deleniti maiores.
              Eligendi dolorem quam saepe at dolores rem neque pariatur totam eius libero eaque, eum quod accusamus illo sint nihil ut! Alias corporis odit, consectetur distinctio fuga non quasi quam enim.</div>
            <div className={classNames("text-gray-900 justify-normal items-start indent-4 w-full mt-8", styles.leftContainer)}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, voluptate numquam. Facere magnam itaque ex fugit molestias ducimus aperiam at, id modi cumque fugiat rerum impedit similique quod expedita ea.
              Alias adipisci optio consequatur? Voluptas nisi, facere ipsum blanditiis atque, officia adipisci aliquid rem facilis amet saepe numquam vero provident, laudantium beatae incidunt consectetur qui cum dolores culpa deleniti maiores.
              Eligendi dolorem quam saepe at dolores rem neque pariatur totam eius libero eaque, eum quod accusamus illo sint nihil ut! Alias corporis odit, consectetur distinctio fuga non quasi quam enim.</div>
            <div className={classNames("text-gray-900 justify-normal items-start indent-4 w-full mt-8", styles.leftContainer)}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, voluptate numquam. Facere magnam itaque ex fugit molestias ducimus aperiam at, id modi cumque fugiat rerum impedit similique quod expedita ea.
              Alias adipisci optio consequatur? Voluptas nisi, facere ipsum blanditiis atque, officia adipisci aliquid rem facilis amet saepe numquam vero provident, laudantium beatae incidunt consectetur qui cum dolores culpa deleniti maiores.
              Eligendi dolorem quam saepe at dolores rem neque pariatur totam eius libero eaque, eum quod accusamus illo sint nihil ut! Alias corporis odit, consectetur distinctio fuga non quasi quam enim.</div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className={styles.container}>
              <div className={styles.sendUsMessage}>{t('contact-form-title')}</div>
              <input
                className={classNames("h-12", styles.form)}
                placeholder={t('contact-form-name')}
                id="name"
                type="text"
                onChange={e => setName(e.target.value)}
              /><br />
              <input
                className={classNames("h-12", styles.form)}
                placeholder={t('contact-form-email')}
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              /><br />
              <textarea
                className={classNames("h-40", styles.form)}
                placeholder={t('contact-form-message')}
                id="message"
                itemType="text"
                onChange={e => setMessage(e.target.value)}
              /><br />
              <button
                className={styles.yerSubmit}
                type="submit">{t('contact-form-submit')}</button>
            </form>

          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default ServicesPage;
