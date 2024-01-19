import classNames from "classnames";
import React from "react";
import Link from 'next/link';
import Image from 'next/image';


import styles from "./Footer.module.css";

const Footer = () => {
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
          <p className={classNames('font-bold mb-4 text-[20px] ml-16')}>ІНФОРМАЦІЯ</p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/about">Про компанію</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/services">Сервіс</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/decisions">Рішення</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/projects">Проектування</Link></p>
          <p className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}><Link href="/shares">Акції</Link></p>
        </div>
          
        <div className={classNames('font-bold', styles["column"])}>
          <p className={classNames('font-bold mb-4 text-[20px] ml-5')}>КАТАЛОГ</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Обладнання для анестезії  <br />та реанімації</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Неонаталогія</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Обладнання для операційних</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Обладнання для дезінфекції  <br />та стерилізації</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Медичні меблі</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Меблі</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Витратні матеріали</p>
          <p className={classNames('font-normal mt-1 ml-5')}>Аксесуари</p>
        </div>
        <div className={classNames('font-bold flex flex-column', styles["column"])}>
          <div>            <p className={classNames('font-bold mb-4 ml-1 text-[20px]')}>КОНТАКТИ</p></div>
        <div className={classNames('font-bold flex flex-row ml-0', styles["column"])}>
          <div className={classNames('font-normal mt-1 w-10')}>
            <p className={classNames('font-normal mt-3')}><Image src="/locationFooter.png" width={26} height={26} alt="Logo DM Project"/></p>
            <p className={classNames('font-normal mt-6')}><Image src="/telephoneFooter.png" width={26} height={26} alt="Logo DM Project"/></p>
            <p className={classNames('font-normal mt-6')}><Image src="/emailFooter.png" width={26} height={26} alt="Logo DM Project"/></p>
          </div>
          <div>
            <p className={classNames('font-normal mt-1')}>ул. Кудряшова, 16, оф. 385, <br /> г. Киев, 03035, Украина <br />dm-project.com.ua</p>
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
