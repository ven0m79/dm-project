import classNames from "classnames";
import React from "react";

import styles from "./Header.module.css";
import { transform } from "typescript";
import { Righteous } from "next/font/google";
import Image from 'next/image';
import Link from "next/link";


const Header = () => {
  return (
    <header
      className={classNames(
        "mt-top flex flex-col",
        styles["header"]
      )}
    >
      <div className={styles.lang}>
        <div className={styles.langText}>
        <Link href="/en" locale="en">EN</Link>{'   '}
        <Link href="/ua" locale="ua">UA</Link></div>
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
            <div>+380 95 XXX-XX-XX</div>
            <div>+380 44 XXX-XX-XX</div>
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
            <div>service@dm-project.com.ua</div>
          </div>
            <input className={styles.search} placeholder="Пошук..."></input>      
        </div>
    </header>

  );
};

export default Header;