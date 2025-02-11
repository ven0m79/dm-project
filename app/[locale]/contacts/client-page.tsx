'use client'
import React from "react";

import { useState } from 'react';
import Head from 'next/head';
import styles from './Contacts.module.css';
import classNames from "classnames";

import { MainLayout } from "@app/[locale]/components/templates";
//import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import mail from "./contacts-photo/emailContacts.png";
import phone from "./contacts-photo/telephoneContacts.png";
import adress from "./contacts-photo/locationContacts.png";
import { useIsMobile } from "../components/hooks/useIsMobile";

export const ClientPage = () => {
  const t = useTranslations('ContactsPage');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [medicalFacility, setMedicalFacility] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const isMobile = useIsMobile();
  console.log({ isMobile });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = { name, mobile, medicalFacility, city, email, message };
    //console.log(data);
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => console.log('Success:', result))
      .catch(error => console.error('Error:', error));;
  };
  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-col self-center", styles.main)}>
        <div className={styles.sendUsMessage}>
          {t('title')}
        </div>
        <div className={styles.stroke}></div>
        <div className={classNames("flex flex-wrap justify-between items-start ", styles.catalogText)}>
          <div className={classNames("flex flex-col justify-normal items-start ", styles.catalogAdress)}>
            <p className="text-2xl justify-normal items-start indent-4 mt-2 sm:indent-10">
              {t('contact-adress')}
            </p>
            <p className={styles.stroke1}></p>
            <p className="flex items-center gap-3 mt-2 mb-10 text-wrap ml-10">
              <Image
                className={""}
                src={adress}
                width={30}
                height={30}
                alt="logo"
              />
              {t('contact-adress1')}
            </p>
            <p className="text-2xl justify-normal items-start indent-4 mt-2 sm:indent-10">
              {t('contact-phone')}
            </p>
            <p className={styles.stroke1}></p>
            <p className="flex items-center gap-3 mt-2 mb-10 text-wrap ml-10">
              <Image
                className={""}
                src={phone}
                width={30}
                height={30}
                alt="logo"
              />
              <span>+380 44 520-12-24 <br />
                +380 66 358-98-10 (cервіс)</span>
            </p>
            <p className="text-2xl justify-normal items-start indent-4 w-full mt-2 sm:indent-10">
              {t('contact-mail')}
            </p>
            <p className={styles.stroke1}></p>
            <p className="flex items-center gap-3 mt-2 mb-10 text-wrap ml-10">
              <Image
                className={""}
                src={mail}
                width={30}
                height={30}
                alt="logo"
              />
              <span>allinfo@dm-project.com.ua<br />
                sales@dm-project.com.ua<br />
                service@dm-project.com.ua
              </span>
            </p>
          </div>
          <div className="flex flex-1 w-1/2">
            <form onSubmit={handleSubmit} className={styles.container}>
              <div className={styles.sendUsMessage}>{t('contact-form-title')}</div>
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-name')}
                id="name"
                type="text"
                onChange={e => setName(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-mobile')}
                id="mobile"
                type="mobile"
                onChange={e => setMobile(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-medicalFacility')}
                id="medicalFacility"
                type="medicalFacility"
                onChange={e => setMedicalFacility(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-city')}
                id="city"
                type="city"
                onChange={e => setCity(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-email')}
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              /><br />
              <textarea
                className={classNames("h-24 pt-2", styles.form)}
                placeholder={t('contact-form-message')}
                id="message"
                onChange={e => setMessage(e.target.value)}
              /><br />
              <button className={styles.yerSubmit} type="submit">{t('contact-form-submit')}</button>
            </form>

          </div>
        </div>

      </div>
    </MainLayout>
  );
};

