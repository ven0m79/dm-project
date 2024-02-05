import classNames from "classnames";
import React from "react";
import { Link, usePathname } from "../../../../../config";
import Image from 'next/image';
import { useTranslations } from 'next-intl';



import styles from "./Footer.module.css";
import { unstable_setRequestLocale } from "next-intl/server";

const Footer = ({params: {locale}}:any) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Footer');
  return (
    <footer
      className={classNames(
        "mt-auto flex flex-col justify-center items-center", styles["footer"]
      )}
    >
      <div className={styles.footerContainer}>
        <div className={classNames('flex flex-column justify-top items-center', styles["column"])}>
          <Image src="/DM-project-logo-transparent.png" width={186} height={117} alt="Logo DM Project"/>
          <div className={styles.socialMedia}>
            <div className={classNames('flex flex-row justify-center items-center', styles["socialMedia"])}>
              <Link href="http://youtube.com"><Image src="/youtube3.png" width={30} height={30} alt="Logo Youtube"/></Link></div>
                <div className={classNames('flex flex-column justify-center items-center', styles["socialMedia"])}>
                <Link href="http://facebook.com"><Image src="/facebook3.png" width={30} height={30} alt="Logo Facebook"/></Link>
                </div>
            </div>
          </div>
        <div className={classNames('font-bold', styles["column"])}>
          <p className={classNames('font-bold mb-4 text-[20px] ml-16')}> {t('information')}</p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/about">{t('about-company')}</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/services">{t('service')}</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/decisions">{t('decisions')}</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/projects">{t('projects')}</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/shares">{t('shares')}</Link></p>
        </div>
          
        <div className={classNames('font-bold', styles["column"])}>
          <p className={classNames('font-bold mb-4 text-[20px] ml-5')}>КАТАЛОГ</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Обладнання для операційних</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Обладнання для відділень інтенсівної терації</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Неонатальне обладнання</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Стерилізаційне та дезінфекційне обладнання</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Медичне газопостачання</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Медичні меблі</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Витратні матеріали та аксесуари</p>
        </div>
        <div className={classNames('font-bold flex flex-column', styles["column"])}>
          <div>            <p className={classNames('font-bold mb-4 ml-1 text-[20px]')}>КОНТАКТИ</p></div>
        <div className={classNames('font-bold flex flex-row ml-0', styles["row"])}>
          <div className={classNames('font-normal mt-1 w-10')}>
            <p className={classNames('font-normal mt-3')}><Image src="/locationFooter.png" width={26} height={26} alt="Logo DM Project"/></p>
            <p className={classNames('font-normal mt-6')}><Image src="/telephoneFooter.png" width={26} height={26} alt="Logo DM Project"/></p>
            <p className={classNames('font-normal mt-7')}><Image src="/emailFooter.png" width={26} height={26} alt="Logo DM Project"/></p>
          </div>
          <div>
            <p className={classNames('font-normal mt-1')}>вул. Мокра, 16, оф. 385, <br /> м. Київ, 03035, Україна <br />dm-project.com.ua</p>
            <p className={classNames('font-normal mt-1')}>+380 44 520-12-24, <br />+380 44 520-12-25, <br />+380 44 520-12-45 (факс)</p>
            <p className={classNames('font-normal mt-1')}>allinfo@dm-project.com.ua <br />sales@dm-project.com.ua <br />service@dm-project.com.ua</p>
          </div>
        </div>
        </div>
      </div>
      <div className={styles.stroke}></div>
      <div className={classNames("mt-3 text-white justify-center items-center", styles["footerContainer"])}>
        © 2023 ДМ-Проект. Всі права захищені</div>
    </footer>
  );
};


export default Footer;
