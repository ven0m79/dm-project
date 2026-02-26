'use client'
import React, { Suspense, useEffect } from "react";
import { useState } from 'react';
import styles from './Contacts.module.css';
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import mail from "./contacts-photo/emailContacts.png";
import phone from "./contacts-photo/telephoneContacts.png";
import adress from "./contacts-photo/locationContacts.png";
//import { useIsMobile } from "../components/hooks/useIsMobile";
import Link from "next/link";

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
  const [productName, setProductName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  //const isMobile = useIsMobile();
  const [status, setStatus] = useState('');
  //const searchParams = useSearchParams();
  const [isProductFromUrl, setIsProductFromUrl] = useState(false); // ✅ новий стейт

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

useEffect(() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const productFromUrl = params.get("productName");

    if (productFromUrl) {
      setProductName(productFromUrl.replace(/\+/g, " "));
      setIsProductFromUrl(true); // ✅ тільки якщо параметр є
    }
  }
}, []);



  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = { name, city, medicalFacility, mobile, email, productName, message };

    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async response => {
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
                form_length: 7, // у мене: name, city, medicalFacility, mobile, email, productName, message
              },
            });
          }
          // ⬇️ Очистити форму після успішної відправки
          setName('');
          setMobile('');
          setMedicalFacility('');
          setProductName('');
          setCity('');
          setEmail('');
          setMessage('');
        } else {
          await response.json();
          setStatus('Помилка при надсиланні. Спробуйте пізніше.');
        }
      })
      .catch(() => {
        setStatus('Сталася помилка.');
      });
  };

  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-col self-center h-auto", styles.main)}>
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
              <Link href="https://share.google/OF6z6AYY01nQkUYRX">{t('contact-adress1')}</Link>
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
              <p>
                <a href="tel:+380754482535" className="block hover:none">+380 75-448-25-35 (відділ продажів)</a>
                <a href="tel:+380663589810" className="block hover:none">+380 66 358-98-10 (cервісний відділ)</a>
              </p>
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
              <p><a href="mailto:allinfo@dm-project.com.ua" className="block hover:none">allinfo@dm-project.com.ua</a>
                <a href="mailto:sales@dm-project.com.ua" className="block hover:none">sales@dm-project.com.ua</a>
                <a href="mailto:service@dm-project.com.ua" className="block hover:none">service@dm-project.com.ua</a>
              </p>
            </p>
          </div>
          <div className="flex flex-1 w-1/2">
            {isClient && (
              <form onSubmit={handleSubmit} className={styles.container}>
                <div className={styles.sendUsMessage}>{t('contact-form-title')}</div>
                <input
                  className={classNames("h-10", styles.form)}
                  placeholder={t('contact-form-name')}
                  id="name"
                  type="text"
                  aria-label={t('contact-form-name')}
                  value={name}
                  onChange={e => setName(e.target.value)}
                /><br />
                <input
                  className={classNames("h-10", styles.form)}
                  placeholder={t('contact-form-city')}
                  id="city"
                  type="text"
                  aria-label={t('contact-form-city')}
                  value={city}
                  onChange={e => setCity(e.target.value)}
                /><br />
                <input
                  className={classNames("h-10", styles.form)}
                  placeholder={t('contact-form-medicalFacility')}
                  id="medicalFacility"
                  type="text"
                  aria-label={t('contact-form-medicalFacility')}
                  value={medicalFacility}
                  onChange={e => setMedicalFacility(e.target.value)}
                /><br />
                <input
                  className={classNames("h-10", styles.form)}
                  placeholder={t('contact-form-mobile')}
                  id="mobile"
                  type="tel"
                  aria-label={t('contact-form-mobile')}
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                /><br />
                <input
                  className={classNames("h-10", styles.form)}
                  placeholder={t('contact-form-email')}
                  id="email"
                  type="email"
                  aria-label={t('contact-form-email')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                /><br />
              <input
                className={classNames("h-10", styles.form, { "bg-[#ECF3FE] cursor-default": isProductFromUrl } // ✅ синій текст, якщо з URL
                )}
                placeholder={t('contact-form-productName')}
                id="productName"
                type="text"
                aria-label={t('contact-form-productName')}
                value={productName}
                onChange={e => setProductName(e.target.value)}
                readOnly={isProductFromUrl} // ✅ заблоковано, якщо з URL
              /><br />
                <textarea
                  className={classNames("h-24 pt-2", styles.form)}
                  placeholder={t('contact-form-message')}
                  id="message"
                  aria-label={t('contact-form-message')}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                /><br />
                <button className={styles.yerSubmit} type="submit">{t('contact-form-submit')}</button>
                {status && <p className="mt-2 text-sm text-green-600">{status}</p>}
              </form>
            )}
          </div>
        </div>

      </div>
    </MainLayout >

  );
};
