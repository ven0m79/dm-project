"use client"
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./Header.module.css";
import Image from 'next/image';
import { Link, locales, usePathname } from "../../../../../config";
import { useTranslations } from 'next-intl';

import debouce from "lodash.debounce";
import { fetchWooCommerceProductsTitles } from "../../../../../utils/woocommerce.setup";
import { SingleProductTitles } from "utils/woocomerce.types";

const Header = (locale: any) => {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState("");
  const [titles, setTitles] = useState("");

  const set = useCallback(async () => {
    try {
      const data = await fetchWooCommerceProductsTitles(searchTerm, locale);
  
      if (data) {
        console.log("SearchTerm: " + searchTerm);
        
        console.log("Data: " + data);
        
        //setSearchTerm(data as unknown as  SingleProductTitles[])
        ;
      }
    } catch (e) {
      console.warn({ e });
    }
  }, [searchTerm, locale]);

  const handleChange = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
      set();
    };
  });


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
          <Link
          href={"/home"}>
          <Image
            src="/logo-DM-project.png"
            width={120}
            height={75}
            alt="Logo DM Project"
          />
          </Link>
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
        <input className={styles.search} onChange={debouncedResults} placeholder={t('placeholder')} />
        {titles}
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