'use client'
import React, { Suspense, useEffect, useRef, useState } from "react";
import styles from './Contacts.module.css';
import classNames from "classnames";
import { MainLayout } from "../components/templates";
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
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const thanksTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (thanksTimeoutRef.current) {
        clearTimeout(thanksTimeoutRef.current as unknown as number);
        thanksTimeoutRef.current = null;
      }
    };
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

    // client-side validation for required fields
    let hasError = false;
    if (!name.trim()) {
      setNameError("Будь ласка, вкажіть ім'я");
      hasError = true;
    } else {
      setNameError('');
    }

    if (!mobile.trim()) {
      setMobileError("Будь ласка, вкажіть телефон");
      hasError = true;
    } else {
      setMobileError('');
    }

    if (hasError) {
      setStatus("Будь ласка, заповніть обов'язкові поля");
      return;
    }

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
          // push GTM event if available
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
              event: "form_submit",
              eventModel: {
                form_id: "contact_form",
                form_name: "Контактна форма",
                form_destination: window.location.hostname,
                form_length: 7,
              },
            });
          }
          // Clear form and errors after successful submit
          setName('');
          setMobile('');
          setMedicalFacility('');
          setProductName('');
          setCity('');
          setEmail('');
          setMessage('');
          setNameError('');
          setMobileError('');
          // show floating thanks toast and auto-hide
          setShowThanks(true);
          if (thanksTimeoutRef.current) {
            clearTimeout(thanksTimeoutRef.current as unknown as number);
          }
          thanksTimeoutRef.current = setTimeout(() => {
            setShowThanks(false);
            thanksTimeoutRef.current = null;
          }, 4000);
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
            <div className="flex items-center gap-3 mt-2 mb-10 text-wrap ml-10">
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
            </div>
            <p className="text-2xl justify-normal items-start indent-4 w-full mt-2 sm:indent-10">
              {t('contact-mail')}
            </p>
            <p className={styles.stroke1}></p>
            <div className="flex items-center gap-3 mt-2 mb-10 text-wrap ml-10">
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
            </div>
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
                  onChange={e => {
                    setName(e.target.value);
                    if (nameError && e.target.value.trim()) setNameError('');
                  }}
                  onBlur={() => {
                    if (!name.trim()) setNameError("Будь ласка, вкажіть ім'я");
                    else setNameError('');
                  }}
                  required
                  aria-required="true"
                /><br />
                {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
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
                  onChange={e => {
                    setMobile(e.target.value);
                    if (mobileError && e.target.value.trim()) setMobileError('');
                  }}
                  onBlur={() => {
                    if (!mobile.trim()) setMobileError("Будь ласка, вкажіть телефон");
                    else setMobileError('');
                  }}
                  required
                  aria-required="true"
                /><br />
                {mobileError && <p className="text-red-600 text-sm mt-1">{mobileError}</p>}
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
                <span className="flex pl-8 text-left">{`* - Обов'язкові поля`}</span>
                <button
                  className={classNames(styles.yerSubmit, { 'opacity-60 cursor-not-allowed': !name.trim() || !mobile.trim() })}
                  type="submit"
                  disabled={!name.trim() || !mobile.trim()}
                >
                  {t('contact-form-submit')}
                  
              
                </button>
                {status && <p className="mt-2 text-sm text-green-600">{status}</p>}
              </form>
            )}
          </div>
        </div>

      </div>

      {showThanks && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            role="status"
            aria-live="polite"
            className="min-w-55 max-w-sm bg-white rounded-lg shadow-lg p-4 flex items-start gap-3 border border-gray-200"
          >
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Дякуємо!</div>
              <div className="text-sm text-gray-600">{status}</div>
            </div>
            <button
              onClick={() => {
                setShowThanks(false);
                if (thanksTimeoutRef.current) {
                  clearTimeout(thanksTimeoutRef.current as unknown as number);
                  thanksTimeoutRef.current = null;
                }
              }}
              aria-label="Close"
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </MainLayout >

  );
};
