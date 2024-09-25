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

const ServicesPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations('ServicePage');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [medicalFacility, setMedicalFacility] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = { name, mobile, medicalFacility, city, email, message };
    console.log(data);
  };

  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-col self-center", styles.main)}>
        <div className={styles.sendUsMessage}>
          {t('title')}
        </div>
        <div className={styles.stroke}></div>

        <div className={classNames("flex flex-1 flex-row justify-normal items-start w-full")}>
          {/* Left Section */}
          <div className={classNames("flex flex-col justify-normal items-start w-full", styles.leftContainer)}>

            {/* First Image and Text */}

            <div className="text-justify">

              <p className="text-justify text-2xl pb-4">{t('contact-prehead1')}</p>
              <Image
                className="float-left mr-5 mt-2"
                src={imgSrc}
                width={400}
                height={300}
                alt="photo"
              />
              <p>{t('contact-paragraph1')}</p>
              <p>{t('contact-paragraph2')}</p>
              <p>{t('contact-paragraph3')}</p>
              <p>{t('contact-paragraph4')}</p>
            </div>

            {/* Second Image and Text */}
            <div className="clear-both">
              <p className="text-2xl pb-4 mt-8">{t('contact-prehead2')}</p>
              <Image
                className="float-left mr-5 mt-2"
                src={imgSrc1}
                width={400}
                height={300}
                alt="photo"
              />
              <p className="text-justify">{t('contact-paragraph5')}</p>
            </div>
          </div>

          {/* Form Section */}
          <div>
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
            <div className={styles.howUsFind}>
              <p className="mt-2 mb-3">{t('contact-prehead3')}</p>
              <MapProvider>
                <MapComponent />
              </MapProvider>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default ServicesPage;
