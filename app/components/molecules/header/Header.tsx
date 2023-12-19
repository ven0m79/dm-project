import classNames from "classnames";
import React from "react";

import styles from "./Header.module.css";
import { transform } from "typescript";
import { Righteous } from "next/font/google";

const Header = () => {
  return (
    <header
      className={classNames(
        "mt-top flex flex-col",
        styles["header"]
      )}
    >
      <div className={styles.lang}>
        <div className={styles.langText}>EN UA</div>
      </div>
      <div className={styles.containerWithLogo}>
        <div className={styles.logo}>
            <img src="/logo-DM-project.png" width={120} alt="Logo DM Project"></img>
          </div>
          <div className={styles.contactsGroupIcons}>
            <img src="/telephone.png" width="40" height="40" alt="Logo DM Project"></img>
          </div>
          <div className={styles.contactsGroup}>
            <p>+380 95 XXX-XX-XX</p>
            <p>+380 44 XXX-XX-XX</p>
          </div>          
          <div className={styles.contactsGroupIcons}>
            <img src="/email.png" width="40" height="40"  alt="Logo DM Project"></img>
          </div>
          <div className={styles.contactsGroup}>
            <p>service@dm-project.com.ua</p>
          </div>
            <input className={styles.search} placeholder="Пошук..."></input>      
        </div>
    </header>

  );
};

export default Header;