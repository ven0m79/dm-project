'use client'
import React from "react";

import { useState } from 'react';
import Head from 'next/head';
import styles from './Service.module.css';
import classNames from "classnames";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

const ServicesPage = ({ params: { locale } }: { params: { locale: string } }) => {
  //unstable_setRequestLocale(locale);
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
      <div className={classNames("flex flex-1 flex-row self-center", styles.main)}>
        <div className={classNames("text-gray-900 flex flex-1 flex-col justify-normal items-start w-full mt-8", styles.leftContainer)}>
        <div className=" text-black self-center h-96 text-5xl">Сервісне обслуговування</div>
        </div>
        <div className="text-gray-900 justify-center items-start pr-5">
          <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.sendUsMessage}>Contact with Service Center</div>
            <input
              className={classNames("h-12", styles.form)}
              placeholder="Name"
              id="name"
              type="text"
              onChange={e => setName(e.target.value)}
            /><br />
            <input
              className={classNames("h-12", styles.form)}
              placeholder="Email"
              id="email"
              type="email"
              onChange={e => setEmail(e.target.value)}
            /><br />
            <textarea
              className={classNames("h-40", styles.form)}
              placeholder="Write Your Message here..."
              id="message"
              itemType="text"
              onChange={e => setMessage(e.target.value)}
            /><br />
            <button 
            className={styles.yerSubmit}
            type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
