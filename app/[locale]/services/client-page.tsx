'use client'
import React from "react";
import { useState } from 'react';
import classNames from "classnames";
import Image from 'next/image';
import { MainLayout } from "@app/[locale]/components/templates";
import styles from './Service.module.css';
import imgSrc from './photos/povshednyy.webp';
import imgSrc1 from './photos/learning.webp';
import { MapProvider } from "@app/[locale]/components/atoms/providers/map-provider";
import { MapComponent } from "../components/molecules/googleMaps/map";
import { useTranslations } from 'next-intl';
import { useIsMobile } from "../components/hooks/useIsMobile";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const ClientPage = () => {
  const t = useTranslations('ServicePage');
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

    fetch('/api/sendService', {
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

        <div className={classNames("flex flex-col lg:flex-row flex-1 justify-normal items-start w-full")}>
          {/* Left Section */}
          <div className={classNames("flex flex-col justify-normal items-start w-full", styles.leftContainer)}>

            {/* First Image and Text */}

            <div className="text-justify">

              <p className="text-justify text-[20px] sm:text-[22px] pb-4">{t('contact-prehead1')}</p>
              <Image
                className="float-left mr-5 mt-2 w-1/2"
                src={imgSrc}
                width={400}
                height={300}
                alt="photo"
                priority
              />
              <p>{t('contact-paragraph1')}</p>
              <p>{t('contact-paragraph2')}</p>
              <p>{t('contact-paragraph3')}</p>
              <p>{t('contact-paragraph4')}</p>
            </div>

            {/* Second Image and Text */}
            <div className="clear-both">
              <p className="text-justify text-[20px] sm:text-[22px] pb-4 mt-8">{t('contact-prehead2')}</p>
              <Image
                className="float-left mr-5 mt-2 w-1/2"
                src={imgSrc1}
                width={400}
                height={300}
                alt="photo"
              />
              <p className="text-justify">{t('contact-paragraph5')}</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-auto flex flex-col items-center justify-center">
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
            {/* <div className={classNames("w-full h-full flex flex-col items-center justify-center", styles.howUsFind)}>
              <p className="mt-2 mb-3">{t('contact-prehead3')}</p>
              <MapProvider>
                <MapComponent />
              </MapProvider>
            </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
