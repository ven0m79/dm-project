'use client'
import React from "react";

import { useState } from 'react';
import styles from './Project.module.css';
import classNames from "classnames";
import imgProj from '../../../public/projectings.webp';
import imgProj1 from '../../../public/projectings1.webp';
import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

import { useTranslations } from 'next-intl';
import { useIsMobile } from "../components/hooks/useIsMobile";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const ClientPage = () => {
  const t = useTranslations('ProjectPage');
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [medicalFacility, setMedicalFacility] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = { name, mobile, medicalFacility, city, email, message };

    fetch('/api/sendProjectings', {
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
                form_name: "Контактна форма з Проектування",
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
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col">
          <div className={classNames("flex flex-1 flex-row justify-normal items-start")}>
            <div className={classNames("flex flex-col justify-center items-start", styles.leftContainer)}>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className=" pb-4">{t('project-head1')}</p>
                <Image
                  className="float-left mr-5 mt-2 w-full h-auto"
                  src={imgProj}
                  alt="projectings"
                  priority
                />
              </div>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className="text-bold pb-4">{t('project-head2')}</p>

              </div>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className="text-2xl pb-4">{t('project-prehead1')}</p>
              </div>

              <div className={classNames("")}>
                {t('project-paragraph1')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph2')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph3')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph4')}
              </div>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className="text-2xl pb-4">{t('project-prehead2')}</p>
              </div>
              <div className={classNames("")}>
                {t('project-paragraph5')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph6')}
              </div>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className="text-2xl pb-4">{t('project-prehead3')}</p>
              </div>
              <div className={classNames("")}>
                {t('project-paragraph7')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph8')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph9')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph10')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph11')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph12')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph13')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph14')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph15')}
              </div>            <div className={classNames("")}>
                {t('project-paragraph16')}
              </div>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className="text-2xl pb-4">{t('project-prehead4')}</p>
              </div>
              <div className={classNames("")}>
                {t('project-paragraph17')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph18')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph19')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph20')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph21')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph22')}
              </div>
              <div className={classNames("")}>
                {t('project-paragraph23')}
              </div>

              <div className={classNames("justify-normal items-start indent-4 mt-8")}>
                <p className="text-2xl pb-4">{t('project-prehead5')}</p>
              </div>
              <div className={classNames("")}>
                {t('project-paragraph24')}
              </div>
              <Image
                className="float-left mr-5 mt-2 w-full h-auto"
                src={imgProj1}
                alt="projectings"
              />
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className={styles.container}>
              <div className={styles.sendUsMessage}>{t('project-form-title')}</div>
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('project-form-name')}
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('project-form-mobile')}
                id="mobile"
                type="mobile"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('project-form-medicalFacility')}
                id="medicalFacility"
                type="medicalFacility"
                value={medicalFacility}
                onChange={e => setMedicalFacility(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('project-form-city')}
                id="city"
                type="city"
                value={city}
                onChange={e => setCity(e.target.value)}
              /><br />
              <input
                className={classNames("h-10", styles.form)}
                placeholder={t('project-form-email')}
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              /><br />
              <textarea
                className={classNames("h-24 pt-2", styles.form)}
                placeholder={t('project-form-message')}
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
              /><br />
              <button className={styles.yerSubmit} type="submit">{t('project-form-submit')}</button>
              {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

