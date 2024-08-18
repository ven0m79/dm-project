'use client'
import React from "react";

import { useState } from 'react';
import Head from 'next/head';
import styles from './Contacts.module.css';
import classNames from "classnames";

import { MainLayout } from "@app/[locale]/components/templates";
//import { unstable_setRequestLocale } from "next-intl/server";

import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';
import mail from "./contacts-photo/emailContacts.png";
import phone from "./contacts-photo/telephoneContacts.png";
import adress from "./contacts-photo/locationContacts.png";
import { title } from "process";

const ContactsPage = ({ params: { locale } }: { params: { locale: string } }) => {
  //unstable_setRequestLocale(locale);
  const t = useTranslations('ContactsPage');
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
        <div className={styles.stroke}></div>
        <div className={classNames("flex flex-wrap justify-around items-start", styles.catalogText)}>
          <div className={classNames("flex flex-col justify-normal items-start")}>
            <p className="text-2xl justify-normal items-start indent-4 w-full mt-7">
              Адреса
            </p>
            <p className={styles.stroke1}></p>
            <p className="flex flex-wrap justify-normal items-start indent-4 mt-8 mb-10">
            <Image
              className={""}
              src={adress}
              width={30}
              height={30}
              alt="logo"
            />
              03035, Київ, Україна, вул. Мокра 16, офіс 385
            </p>
            <p className="text-2xl justify-normal items-start indent-4 w-full mt-7">
              Телефон
            </p>
            <p className={styles.stroke1}></p>
            <p className="flex flex-wrap justify-normal items-start indent-4 mt-8 mb-10">
            <Image
              className={""}
              src={phone}
              width={30}
              height={30}
              alt="logo"
            />
            +380 44 520-12-24
            </p>
            <p className="text-2xl justify-normal items-start indent-4 w-full mt-7">
              E-mail
            </p>
            <p className={styles.stroke1}></p>
            <p className="flex flex-wrap justify-normal items-start indent-4 mt-8 mb-10">
            <Image
              className={""}
              src={mail}
              width={30}
              height={30}
              alt="logo"
            />
            allinfo@dm-project.com.ua
            </p>
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

export default ContactsPage;
