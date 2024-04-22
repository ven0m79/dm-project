'use client'
import classNames from "classnames";
import React from "react";

import styles from "./Header.module.css";
import { transform } from "typescript";
import { Righteous } from "next/font/google";
import Image from 'next/image';
import { Link, usePathname } from "../../../../../config";
import { useTranslations } from 'next-intl';

const Header = () => {
  const t = useTranslations('Header');
  const pathname = usePathname();
  return (
    <header
      className={classNames(
        "mt-top flex flex-col w-full",
        styles["header"]
      )}
    >
      <div className=
        {classNames(
          "w-full",
          styles["lang"]
        )}>
        <div className={styles.langText}>
          <Link href={pathname} locale="en">EN</Link>{'   '}
          <Link href={pathname} locale="ua">UA</Link></div>
      </div>
      <div className={styles.containerWithLogo}>
        <div className={styles.logo}>
          <Image
            src="/logo-DM-project.png"
            width={120}
            height={75}
            alt="Logo DM Project"
          />
        </div>
        <div className={styles.contactsGroupIcons}>
          <Image
            src="/telephone.png"
            width={40}
            height={40} alt="Logo DM Project"
          />
        </div>
        <div className={styles.contactsGroup}>
          <div>+380 44 520-12-24</div>
        </div>
        <div className={styles.contactsGroupIcons}>
          <Image
            src="/email.png"
            width={40}
            height={40}
            alt="Logo DM Project"
          />
        </div>
        <div className={styles.contactsGroup}>
          <div>allinfo@dm-project.com.ua</div>
          <div>sales@dm-project.com.ua</div>
          <div>service@dm-project.com.ua</div>
        </div>
        <input className={styles.search} placeholder={t('placeholder')}></input>
        <div className={classNames('flex flex-row justify-center items-center', styles["socialMedia"])}>
              <Link href="http://youtube.com"><Image src="/youtube-ico.jpg" width={30} height={30} alt="Logo Youtube" /></Link></div>
            <div className={classNames('flex flex-column justify-center items-center', styles["socialMedia"])}>
              <Link href="http://facebook.com"><Image src="/facebook-ico.jpg" width={30} height={30} alt="Logo Facebook" /></Link>
            </div>
      </div>
      

      
    </header>

  );
};

export default Header;