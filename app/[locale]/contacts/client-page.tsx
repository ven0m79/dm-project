'use client'
import React from "react";
import { useState } from 'react';
import styles from './Contacts.module.css';
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import mail from "./contacts-photo/emailContacts.png";
import phone from "./contacts-photo/telephoneContacts.png";
import adress from "./contacts-photo/locationContacts.png";
import { useIsMobile } from "../components/hooks/useIsMobile";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

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

  const [status, setStatus] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = { name, mobile, medicalFacility, city, email, message };

    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async response => {
        console.log("📡 HTTP status:", response.status); // ⬅️ Статус відповіді

        if (response.ok) {
          setStatus('Ваше повідомлення надіслано. Дякуємо!');
          // ⬇️ Вставка події у GTM
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
              event: "form_submit",
              eventModel: {
                form_id: "contact_form",
                form_name: "Контактна форма",
                form_destination: window.location.hostname,
                form_length: 6, // у тебе: name, mobile, medicalFacility, city, email, message
              },
            });
          }
          // ⬇️ Очистити форму після успішної відправки
          setName('');
          setMobile('');
          setMedicalFacility('');
          setCity('');
          setEmail('');
          setMessage('');
        } else {
          const errorBody = await response.json();
          console.error("❌ Помилка API:", errorBody); // ⬅️ Деталі помилки
          setStatus('Помилка при надсиланні. Спробуйте пізніше.');
        }
      })
      .catch(error => {
        console.error("❌ Network error:", error); // ⬅️ Наприклад, 404 або проблема з сервером
        setStatus('Сталася помилка.');
      });
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
              <span>+380 66 504-44-03<br />
                (відділ продажів)<br />
                +380 66 358-98-10<br />
                (cервісний відділ)</span>
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
                alt="logo_email"
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
                value={name}
                onChange={e => setName(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-mobile')}
                id="mobile"
                type="mobile"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-medicalFacility')}
                id="medicalFacility"
                type="medicalFacility"
                value={medicalFacility}
                onChange={e => setMedicalFacility(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-city')}
                id="city"
                type="city"
                value={city}
                onChange={e => setCity(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('contact-form-email')}
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              /><br />
              <textarea
                className={classNames("h-24 pt-2", styles.form)}
                placeholder={t('contact-form-message')}
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
              /><br />
              <button className={styles.yerSubmit} type="submit">{t('contact-form-submit')}</button>
              {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
            </form>

          </div>
        </div>

      </div>
    </MainLayout>
  );
};

