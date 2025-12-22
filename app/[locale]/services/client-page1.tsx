'use client'
import React from "react";
import { useState } from 'react';
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from './Service.module.css';
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import Image from "next/image";
import Snowfall from "react-snowfall"
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

const imgSrc = "/service/povshednyy.webp";
const imgSrc1 = "/service/shvl.webp";
const imgSrc2 = "/service/narkoz1.webp";
const imgSrc3 = "/service/neonatal.webp";
const imgSrc4 = "/service/monitor1.webp";
const imgSrc5 = "/service/dez.webp";
const imgSrc6 = "/service/gaz1.webp";
const imgSrcUkr = "/service/ukraine.webp";
const imgSrcLearn = "/service/learning.webp";


declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}

export const ClientPage = () => {
    const t = useTranslations('ServicePage');
    const isMobile = useIsMobile();
    const cards = [
        { id: 1, front: imgSrc1, title: "Апарати штучної вентиляції легень (ШВЛ)", subtitle: ["ШВЛ для дорослих, дітей і новонароджених", "спеціалізовані неонатальні апарати"], back: ["Babylog Family (8000 / 8000plus / VN500 / VN600 / VN800)", "Carina", "Savina Family (Savina 300 / Select / Classic)", "Evita Family (V300 / V500 / V600 / V800,  S2 / CAP / Evita 2dura /Evita 4, Evita XL)", "Oxylog Family (2000plus / 3000 / 3000plus / VE300)"] },
        { id: 2, front: imgSrc2, title: "Наркозно-дихальні апарати (НДА) та комплектуючі", subtitle: ["анестезіологічні станції", "наркозно-дихальні апарати"], back: ["Primus", "Perseus A500", "Atlan A3xx Family", "Випаровувачі Vapor 2000/3000 Family (Sev / Iso / Hal / Des)", "Блоки газоаналізу Scio / Vamos Family"] },
        { id: 3, front: imgSrc3, title: "Обладнання для неонатології", subtitle: ["інкубатори", "транспортні інкубатори", "відкриті реанімаційні системи та ін."], back: ["Реанімаційні столики Babytherm 8000 / 8004 / 8010", "Реанімаційні столики Resuscitaire RW-82/Babyroo TN300 Інкубатор Caleo Інкубатор Isolette 8000 / 8000 plus/ C2000", "Транспортний інкубатор TI 500", "Гібридний інкубатор Babyleo TN500", "Білірубінометр JM-105", "Лампа для фототерапії Bililux"] },
        { id: 4, front: imgSrc4, title: "Моніторинг пацієнта", subtitle: ["монітори пацієнта", "центральні станції моніторингу"], back: ["Центральні станції моніторингу Infinity Central Station / Vista Central Station ", "Монітори пацієнта IACS (Infinity Acute Care System) та M540", "Монітори Infinity Family (Delta / Delta XL / Gamma / Gamma XL / Vista)", "Монітори пацієнта Vista Family (Vista 120/120 S/300/300 S)", "Амагнітні монітори пацієнта TESLA M3 / TESLA DUO"] },
        { id: 5, front: imgSrc5, title: "Стерилізаційне та дезінфекційне обладнання", subtitle: ["мийно-дезінфекційні машини", "парові стерилізатори", "низькотемпературні (плазмові) стерилізатори"], back: ["Мийно-дезінфекційні машини серії AWD655", "Машини для дезінфекції суден серії AF2", "Парові стерилізатори серії PROHS FJ", "Низькотемпературні плазмові стерилізатори серії RENO"] },
        { id: 6, front: imgSrc6, title: "Системи медичного газопостачання, медичні архітектурні системи та операційні світильники", subtitle: ["системи постачання кисню, повітря, вакууму та закису азоту", "газорозподільні панелі", "газові розетки та розетки вакууму", "стельові консолі ", "настінні панелі ", "операційні світильники (мобільні, стельові)"], back: ["Системи постачання кисню, повітря, вакууму та закису азоту", "Газові розетки та розетки вакууму", "Стельові консолі Agila / Movita / Ambia / Ponta", "Настінні панелі Gemina / Linea", "Операційні світильники Polaris 100/200/600"] }
    ];
    const items = [
        "Планове технічне обслуговування",
        "Аварійні ремонти",
        "Діагностика та відновлення після збоїв",
        "Калібрування функціональних вузлів",
        "Встановлення та введення в експлуатацію",
        "Оновлення та налаштування ПЗ",
        "Аудит технічного стану",
        "Підбір і заміна оригінальних запчастин",
        "Ще один пункт",
    ];
    const items1 = [
        "Діагностика та візуальний огляд",
        "Перевірка безпеки й функціональних тестів",
        "Заміна сервісних наборів і витратних матеріалів",
        "Калібрування систем та модулів",
        "Тестування та звіт з рекомендаціями",
    ];
    const items2 = [
        "Офіційна робота за регламентами виробників",
        "Досвід у сервісуванні широкого спектра обладнання",
        "Спеціалізоване навчання інженерів",
        "Використання оригінальних комплектуючих",
        "Оперативне реагування",
        "Власний сервісний центр",
        "Прозора звітність",
        "Сервісні пакети під потреби медзакладу",
        "Склад запчастин у Києві постійно поповнюється",
    ];

    const items3 = [
        "Апарати ШВЛ",
        "Анестезіологічні станції",
        "Наркозно-дихальні апарати",
        "Монітори пацієнта",
        "Неонатальне обладнання",
        "Хірургічне освітлення",
        "Обладнання для медичного газопостачання",
    ];
    const items4 = [
        "Запуск і підготовка до роботи",
        "Налаштування параметрів",
        "Моніторинг роботи",
        "Реагування на нестандартні ситуації",
        "Профілактика помилок користувача",
        "Підвищення ефективності експлуатації",
    ];

    const tableData = [
        {
            label: "Основна мета",
            plan: "Профілактика збоїв",
            emergency: "Усунення наявних несправностей",
        },
        {
            label: "Строки виконання",
            plan: "Прогнозовані строки",
            emergency: "Строки залежать від ситуації",
        },
        {
            label: "Результат",
            plan: "Продовження ресурсу обладнання",
            emergency: "Відновлення функціональності",
        },
        {
            label: "Витрати",
            plan: "Менше витрат у довгостроковій перспективі",
            emergency: "Може вимагати більший обсяг робіт",
        },
    ];

    const [flipped, setFlipped] = useState<Record<number, boolean>>({});
    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [medicalFacility, setMedicalFacility] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const toggleFlip = (id: number) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Розбиваємо масив на рядки по 3 елементи
    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
        rows.push(items.slice(i, i + 3));
    }

    const rows1 = [];
    const row1Count = 5;
    const row1Size = Math.ceil(items1.length / row1Count);
    for (let i = 0; i < items1.length; i += row1Size) {
        rows1.push(items1.slice(i, i + row1Size));
    }

    const rows2 = [];
    for (let i = 0; i < items2.length; i += 3) {
        rows2.push(items2.slice(i, i + 3));
    }

    const planRef = React.useRef<HTMLDivElement>(null);
    const scrollToPlan = () => {
        planRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleShowForm = () => setShowForm(true);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const data = { name, mobile, medicalFacility, city, email, message };

        fetch('/api/sendService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(async response => {
                //console.log("📡 HTTP status:", response.status); // ⬅️ Статус відповіді

                if (response.ok) {
                    setStatus('Ваше повідомлення надіслано. Дякуємо!');
                    // ⬇️ Вставка події у GTM
                    if (typeof window !== 'undefined' && window.dataLayer) {
                        window.dataLayer.push({
                            event: "form_submit",
                            eventModel: {
                                form_id: "contact_form",
                                form_name: "Контактна форма",
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
            <Snowfall color="white" speed={[1.0, 3.0]} style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                zIndex: 50,
                pointerEvents: "none",
            }} />
            <div className={classNames("flex flex-1 flex-col self-center", styles.main)}>
                {/* <div className={styles.sendUsMessage}>
                    {t('title')}
                </div>
                <div className={styles.stroke}></div> */}

                <div className={classNames("flex flex-col flex-1 justify-normal items-start w-full max-w-[1400px] text-lg")}>
                    {/* Left Section */}
                    <div className={classNames("flex flex-col justify-normal items-start w-full", styles.servContainer)}>
                        <span className="text-[24px] py-3 self-center text-[#002766]">Технічне обслуговування медичного обладнання</span>
                        <p className="flex self-center leading-relaxed">ДМ-ПРОЕКТ забезпечує повний цикл сервісного супроводу медичної техніки: встановлення, діагностику, планові та аварійні ремонти, калібрування, оновлення програмного забезпечення та відновлення працездатності. Роботи виконуються у медзакладах або у сертифікованому сервісному центрі.</p>
                        <span className="flex flex-row w-full h-auto justify-center gap-5 my-3">
                            <button
                                className={styles.servSubmit}
                                type="button"  // змінено з submit на button
                                onClick={handleShowForm}
                            >
                                {'Подати заявку на сервіс'}
                            </button>

                            <button className={styles.servSubmit} type="button" onClick={scrollToPlan}>
                                {'Дізнатись більше'}
                            </button>


                        </span>
                    </div>
                    <div className={classNames("flex flex-col justify-normal items-start w-full", styles.servContainer1)}>
                        <span className="text-[24px] py-3 self-center text-[#002766]">Яке обладнання ми обслуговуємо</span>
                        {/* <p className="flex self-center leading-relaxed">Повний спектр медичної техніки Dräger для лікувальних закладів</p> */}
                    </div>
                    <div className="flex justify-center self-center py-3 w-full max-w-[1400px]">
                        <div className="w-full flex flex-wrap justify-center gap-4">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="relative perspective cursor-pointer"
                                    onClick={() => toggleFlip(card.id)}
                                >
                                    {/* Motion wrapper для flip */}
                                    <motion.div
                                        className="relative w-full h-full preserve-3d rounded-2xl backface-hidden shadow-[0_6px_15px_rgba(0,51,120,0.45)]"
                                        style={{
                                            width: "13rem",
                                            height: "24rem",
                                        }}
                                        animate={{ rotateY: flipped[card.id] ? 180 : 0 }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}

                                    >
                                        {/* FRONT */}
                                        <div className="w-full h-full relative rounded-2xl overflow-hidden">
                                            {/* Додаємо flex, щоб центрувати картинку по горизонталі (mx-auto) та притиснути до верху */}
                                            <div className="relative w-full h-full flex flex-col items-center">
                                                <Image
                                                    src={card.front}
                                                    alt={card.title}
                                                    width={isMobile ? 160 : 200}
                                                    height={isMobile ? 190 : 230}
                                                    className="object-contain pt-4" // зберігає пропорції
                                                    priority={false}
                                                />

                                                <h3 className="absolute bottom-0 left-0 right-0 bg-[#0061AA] text-white p-2 h-32 text-base">
                                                    {card.title}
                                                    {/* {card.subtitle && (
                                                        <ul className="list-disc pl-5 mt-2 text-[14px]">
                                                            {card.subtitle.map((s, i) => (
                                                                <li key={i}>{s}</li>
                                                            ))}
                                                        </ul>
                                                    )} */}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* BACK */}
                                        <div
                                            className="absolute inset-0 backface-hidden rounded-2xl bg-[#0061AA] text-white p-2 overflow-auto"
                                            style={{ transform: "rotateY(180deg)" }}
                                        >
                                            <ul className={classNames("list-disc pl-4 space-y-1 text-[16px] leading-tight", styles.whiteText)}>
                                                {card.back.map((item, i) => (
                                                    <li className="text-white" key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        <style>{`
        .perspective { perspective: 1200px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
                    </div>


                    <span className="text-[24px] py-5 self-center text-[#002766]">Які сервіси ми виконуємо</span>

                    {/* <div className="max-w-[1400px] mx-auto space-y-4 pb-6 w-full">
                        {rows.map((row, rowIndex) => (
                            <div className="flex gap-4" key={rowIndex}>
                                {row.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 pl-8 bg-gray-50 rounded-2xl w-[33%] shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="flex-shrink-0 text-green-500 font-bold text-xl -mt-0.5">✓</span>
                                        <span className="flex-1 text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div> */}
                    <span ref={planRef} className="text-[24px] py-3 text-[#002766] self-center">{'Планове технічне обслуговування'}</span>
                    <div className={classNames("flex max-w-[1400px] w-full", styles.servContainer1)}>
                        <div className="flex-1 pr-8">
                            <p className="flex self-center text-left leading-relaxed">Планове ТО проводиться відповідно до регламентів виробників і враховує інтенсивність використання обладнання. Такий метод мінімізує ризики збоїв, продовжує ресурс техніки й забезпечує безперервність клінічних процесів.</p>

                            <h3 className="text-2xl font-semibold mt-4 text-left">Етапи планового ТО:</h3>


                            <div className="mx-auto space-y-4 pb-6 w-full">
                                {items1.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 pl-8 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="text-green-500 font-bold text-xl">✓</span>
                                        <span className="text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <Image
                                src={imgSrc}
                                alt="ТО"
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                    <div className="text-[#0061AA]">
                        <h3 className="text-2xl font-semibold mt-4 text-left text-[#0061AA]">Етапи планового ТО:</h3>
                        <p className="flex self-center text-left leading-relaxed">Сервісна служба оперативно реагує на аварійні запити та швидко відновлює працездатність критичного обладнання.</p>
                        <p className="flex self-center text-left leading-relaxed"><strong>Стандартний час відповіді</strong> — максимально швидкий у межах робочого графіка. Оперативні виїзди інженерів забезпечують виконання робіт у короткі строки.</p>
                    </div>

                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Планове ТО vs Аварійний ремонт'}</span>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#0067C5] text-white text-left">
                                    <th className="p-4 w-[25%]"></th>
                                    <th className="p-4 w-[37%] text-center font-semibold">Планове ТО</th>
                                    <th className="p-4 w-[38%] text-center font-semibold">Аварійний ремонт</th>
                                </tr>
                            </thead>

                            {/* <tbody className="text-[#0054A6]">
                                {tableData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-[#F4F5F7]" : "bg-white"}
                                    >
                                        <td className="p-4 font-semibold">{row.label}</td>
                                        <td className="p-4">{row.plan}</td>
                                        <td className="p-4">{row.emergency}</td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>

                    <span className="text-[24px] py-3 self-center text-[#002766]">Переваги нашого сервісу</span>
                    {/* <div className="max-w-[1400px] mx-auto space-y-4 pb-6 w-full">
                        {rows2.map((row2, rowIndex) => (
                            <div className="flex gap-4" key={rowIndex}>
                                {row2.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 pl-8 bg-gray-50 rounded-2xl w-[33%] shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="flex-shrink-0 text-green-500 font-bold text-xl -mt-0.5">✓</span>
                                        <span className="flex-1 text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div> */}

                    <div className="text-[#0061AA]">
                        <h3 className="text-2xl font-semibold mt-4 text-left text-[#0061AA]">Сертифікація інженерів</h3>
                        <p className="flex self-center text-left leading-relaxed">Інженери ДМ-ПРОЕКТ мають підтверджені виробниками обладнання сертифікати і проходять регулярне навчання, включно зі спеціалізованими курсами Dräger у Німеччині. Це гарантує коректність, безпечність і точність усіх сервісних операцій.</p>
                    </div>

                    <div className={classNames("flex max-w-[1400px] w-full items-stretch", styles.servContainer1)}>
                        <div className="flex-1 pr-1 flex flex-col justify-center">

                            <h3 className="text-2xl font-semibold mt-4 text-left">Географія сервісу</h3>
                            <p className="self-center text-left leading-relaxed">
                                Сервіс компанії покриває <strong>всю територію України.</strong>
                                Працюють виїзні бригади, які забезпечують оперативне реагування
                                у різних регіонах. Можливе індивідуальне планування візитів
                                у межах сервісних пакетів або SLA.
                            </p>

                        </div>

                        <div className="flex justify-end items-start">
                            <Image
                                src={imgSrcUkr}
                                alt="Ukraine"
                                width={400}       // 662 реальна ширина зображення
                                height={284}      // 442 реальна висота зображення
                                className="rounded-2xl object-contain"
                            />
                        </div>
                    </div>

                    <div className={classNames("flex flex-col justify-normal items-start w-full", styles.servContainer)}>
                        <span className="text-[24px] py-3 self-center text-[#002766]">Офіційний сервіс Dräger в Україні</span>
                        <p className="flex self-center leading-relaxed">На сервісному супроводі — понад 5000 одиниць обладнання Dräger. Інженери проходять навчання у Dräger Academy та мають право офіційно надавати послуги з сервісу.</p>

                    </div>

                    <div className="flex flex-1 flex-col w-full">
                        <h3 className="text-2xl font-semibold my-4 text-left text-[#0061AA]">Обладнання Dräger:</h3>
                        <div className="flex flex-wrap gap-1 pb-6 w-full">
                            {items3.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 p-6 pl-8 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)] w-[33%]"
                                >
                                    <span className="text-green-500 font-bold text-xl">✓</span>
                                    <span className="text-[#0061AA]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-normal items-start w-full text-[#0061AA]">
                        <h3 className="text-2xl font-semibold my-4 text-left text-[#0061AA]">Переваги сервісу Dräger від ДМ-ПРОЕКТ:</h3>
                        <ul className="list-disc space-y-1 leading-relaxed">
                            <li className="ml-16 before:mr-2">єдиний в Україні уповноважений офіційний сервіс</li>
                            <li className="ml-16 before:mr-2">індивідуальні плани ТО</li>
                            <li className="ml-16 before:mr-2">дотримання усіх регламентів</li>
                            <li className="ml-16 before:mr-2">використання оригінальних сервісних комплектів</li>
                            <li className="ml-16 before:mr-2">підтримка повного циклу експлуатації</li>
                        </ul>
                    </div>

                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Навчання медичного персоналу'}</span>

                    <div className={classNames("flex max-w-[1400px] w-full", styles.servContainer1)}>
                        <div className="flex-1 pr-8">
                            <p className="flex self-center text-left leading-relaxed">Навчання є частиною сервісного супроводу. Проводиться під час встановлення, після оновлення ПЗ або при розширенні функціоналу.</p>

                            <h3 className="text-2xl font-semibold mt-4 text-left">Навчальні сценарії:</h3>

                            <div className="mx-auto space-y-4 pb-6 w-full">
                                {items4.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 pl-8 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="text-green-500 font-bold text-xl">✓</span>
                                        <span className="text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <Image
                                src={imgSrcLearn}
                                alt="ТО"
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                    </div>




                    {showForm && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" // full screen + overlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.form
                                onSubmit={handleSubmit}
                                className={classNames(styles.container, "bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative")}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                {/* Закрити кнопку */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setStatus('');
                                    }
                                    }
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>

                                <div className={styles.sendUsMessage}>{t('contact-form-title')}</div>
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-name')}
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-mobile')}
                                    id="mobile"
                                    type="text"
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value)}
                                />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-medicalFacility')}
                                    id="medicalFacility"
                                    type="text"
                                    value={medicalFacility}
                                    onChange={e => setMedicalFacility(e.target.value)}
                                />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-city')}
                                    id="city"
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-email')}
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <textarea
                                    className={classNames("h-24 w-full mb-2 pt-2", styles.form)}
                                    placeholder={t('contact-form-message')}
                                    id="message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                                <button className={styles.yerSubmit} type="submit">{t('contact-form-submit')}</button>
                                {status && <p className="mt-1 text-sm text-green-600">{status}</p>}
                            </motion.form>
                        </motion.div>
                    )}
                </div>
            </div >
        </MainLayout >
    );
};
