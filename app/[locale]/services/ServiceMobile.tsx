'use client'
import React from "react";
import { useState } from 'react';
import classNames from "classnames";
import styles from './Service.module.css';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { cards, items, items1, items2, items3, items4, items5, items6, tableData, pics } from "./data";


declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}

export default function ServiceMobile() {
    const t = useTranslations('ServicePage');
    const isMobile = useIsMobile();
    const [flipped, setFlipped] = useState<Record<number, boolean>>({});
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(false);

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
    for (let i = 0; i < items.length; i += 1) {
        rows.push(items.slice(i, i + 1));
    }

    const rows1 = [];
    const row1Count = 5;
    const row1Size = Math.ceil(items1.length / row1Count);
    for (let i = 0; i < items1.length; i += row1Size) {
        rows1.push(items1.slice(i, i + row1Size));
    }

    const rows2 = [];
    for (let i = 0; i < items2.length; i += 1) {
        rows2.push(items2.slice(i, i + 1));
    }
    const rows3 = [];
    for (let i = 0; i < items3.length; i += 1) {
        rows3.push(items3.slice(i, i + 1));
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
        <>
            <div className={"flex flex-col self-center"}>
                <div className={classNames("flex flex-col justify-center items-center text-lg pt-2 bg-green-500")}>
                    <div className={classNames("flex flex-col justify-normal items-start", styles.servContainer)}>
                        <span className="text-[24px] py-3 self-center text-[#002766]">Технічне обслуговування медичного обладнання</span>
                        <p className="flex self-center leading-relaxed">ДМ-ПРОЕКТ забезпечує повний цикл сервісного супроводу медичної техніки: встановлення, діагностику, планові та аварійні ремонти, калібрування, оновлення програмного забезпечення та відновлення працездатності. Роботи виконуються у медзакладах або у сертифікованому сервісному центрі.</p>
                        <span className="flex flex-row w-full h-auto justify-center gap-2 p-2">
                            <button
                                className={styles.servSubmit1}
                                type="button" // змінено з submit на button
                                onClick={handleShowForm}
                            >
                                {'Подати заявку на сервіс'}
                            </button>

                            <button className={styles.servSubmit1} type="button" onClick={scrollToPlan}>
                                {'Дізнатись більше'}
                            </button>
                        </span>
                    </div>
                    <div className={classNames("flex flex-col justify-center items-start w-full")}>
                        <span className="text-[24px] p-2 self-center text-[#002766]">Яке обладнання ми обслуговуємо</span>
                    </div>
                    <div className="flex justify-center self-center py-3 ">
                        <div className="flex flex-wrap justify-center gap-4">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="relative perspective cursor-pointer"
                                    onClick={() => toggleFlip(card.id)}
                                >
                                    <motion.div
                                        className="relative w-full h-full preserve-3d rounded-2xl backface-hidden shadow-[0_6px_15px_rgba(0,51,120,0.45)]"
                                        style={{
                                            width: "10rem",
                                            height: "22rem",
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
                                                    priority={false} />

                                                <h3 className="absolute bottom-0 left-0 right-0 bg-[#0061AA] text-white p-2 h-32 text-sm leading-tight text-center">
                                                    {card.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* BACK */}
                                        <div
                                            className="absolute inset-0 backface-hidden rounded-2xl bg-[#0061AA] text-white p-2 overflow-auto"
                                            style={{ transform: "rotateY(180deg)" }}
                                        >
                                            <ul className={classNames("list-disc pl-4 space-y-1 text-[10px] leading-tight", styles.whiteText)}>
                                                {card.back.map((item, i) => (
                                                    <li className="text-white" key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        <style>{`.perspective { perspective: 1200px; } .preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }`}</style>
                    </div>


                    <span className="text-[24px] py-5 self-center text-[#002766]">Які сервіси ми виконуємо</span>

                    {/* <div className="max-w-[1400px] mx-auto space-y-4 pb-6 w-full">
                        {rows.map((row, rowIndex) => (
                            <div className="flex gap-4 w-full" key={rowIndex}>
                                {row.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-3 bg-gray-50 rounded-2xl w-full shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="flex-shrink-0 text-green-500 font-bold text-xl -mt-1 pl-4">✓</span>
                                        <span className="flex-1 text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div> */}
                    <span ref={planRef} className="text-[24px] py-3 text-[#002766] self-center">{'Планове технічне обслуговування'}</span>
                    {/* <div className={classNames(
                        "flex flex-col self-center max-w-[1400px] w-full gap-10",
                        styles.servContainer1
                    )}>
                        <div className="">
                            <p className="text-justify indent-5 leading-relaxed">
                                Планове ТО проводиться відповідно до регламентів виробників і враховує інтенсивність використання обладнання. Такий метод мінімізує ризики збоїв, продовжує ресурс техніки й забезпечує безперервність клінічних процесів.
                            </p>

                            <h3 className="text-2xl font-semibold mt-4 text-left">
                                Етапи планового ТО:
                            </h3>

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
                        <div className="w-full flex justify-center overflow-hidden rounded-2xl">
                            <Image
                                src={pics[0].front}
                                alt="Планове ТО"
                                width={300}
                                height={400}
                                className="rounded-2xl"
                            />
                        </div>
                    </div> */}

                    {/* <div className="text-[#0061AA] indent-4">
                        <h3 className="text-2xl font-semibold mt-4 text-left text-[#0061AA]">Аварійний ремонт і строки реагування</h3>
                        <p className="flex self-center text-justify leading-relaxed">Сервісна служба оперативно реагує на аварійні запити та швидко відновлює працездатність критичного обладнання.</p>
                        <p className="flex self-center text-justify leading-relaxed">Стандартний час відповіді — максимально швидкий у межах робочого графіка. Оперативні виїзди інженерів забезпечують виконання робіт у короткі строки.</p>
                        <p className="flex self-center text-justify leading-relaxed">Оперативні виїзди інженерів забезпечують виконання робіт у короткі строки.</p>
                    </div> */}
                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Планове ТО vs Аварійний ремонт'}</span>
                    <div className="flex w-full overflow-x-auto px-2">
                        <table className="text-[14px]">
                            <thead>
                                <tr className="bg-[#0067C5] text-white text-left">
                                    <th className="py-2 px-1"></th>
                                    <th className="py-2 px-1 text-left">Планове ТО</th>
                                    <th className="py-2 px-1 text-left">Аварійний ремонт</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#0054A6]">
                                {tableData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-[#F4F5F7]" : "bg-white"}
                                    >
                                        <td className="p-1">{row.label}</td>
                                        <td className="p-1">{row.plan}</td>
                                        <td className="p-1">{row.emergency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <span className="text-[24px] py-3 self-center text-[#002766]">Переваги нашого сервісу</span>
                    {/* <div className="max-w-[1400px] mx-auto space-y-4 pb-6 w-full">
                        {rows2.map((row2, rowIndex) => (
                            <div className="flex gap-4" key={rowIndex}>
                                {row2.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl w-full shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="flex-shrink-0 text-green-500 font-bold text-xl -mt-0.5">✓</span>
                                        <span className="flex-1 text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div> */}

                    {/* <div className={classNames("flex flex-col self-center justify-around w-full", styles.servContainer1)}>
                        <div className="flex flex-col">
                            <div className="flex-1 flex flex-col justify-start">
                                <h3 className="text-2xl font-semibold mt-4 text-left text-[#0061AA]">Сертифікація інженерів</h3>
                                <p className="text-justify indent-5 leading-relaxed">Інженери ДМ-ПРОЕКТ мають підтверджені виробниками обладнання сертифікати і проходять регулярне навчання, включно зі спеціалізованими курсами Dräger у Німеччині. Це гарантує коректність, безпечність і точність усіх сервісних операцій.</p>
                            </div>
                            <div className="flex justify-center items-start">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="cursor-pointer"
                                    onClick={() => setOpen(true)}
                                >
                                    <Image
                                        src={pics[3].front}
                                        alt="Ukraine"
                                        width={300}
                                        height={383}
                                        className="rounded-2xl object-contain" />
                                </motion.div>
                                <AnimatePresence>
                                    {open && (
                                        <motion.div
                                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setOpen(false)} // клік по фону
                                        >
                                            <motion.div
                                                initial={{ scale: 0.85, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.85, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="relative z-30"
                                                style={{
                                                    width: "90vw",
                                                    height: "90vh",
                                                }}
                                            >
                                                <Image
                                                    src={pics[3].front}
                                                    alt="Ukraine certificate full"
                                                    fill
                                                    className="rounded-2xl object-contain"
                                                    priority />

                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-black shadow flex items-center justify-center text-lg font-semibold"
                                                >
                                                    ×
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col justify-start">
                                <h3 className="text-2xl font-semibold mt-4 text-left">Географія сервісу</h3>
                                <p className="text-justify indent-5 leading-relaxed">
                                    Сервіс компанії покриває <strong>всю територію України</strong> (окрім тимчасово окупованих територій та зони бойових дій).
                                    Працюють виїзні бригади, які забезпечують оперативне реагування
                                    у різних регіонах. Можливе індивідуальне планування візитів
                                    у межах сервісних пакетів або SLA.
                                </p>
                            </div>
                            <div className="flex justify-center items-start w-full h-auto">
                                <Image
                                    src={pics[1].front}
                                    alt="Ukraine"
                                    width={500} // 662 реальна ширина зображення
                                    height={383} // 442 реальна висота зображення
                                    className="rounded-2xl object-contain" />
                            </div>
                        </div>
                    </div> */}
                    {/* <div className={classNames("flex flex-col justify-normal items-start w-full", styles.servContainer)}>
                        <span className="text-[24px] py-3 self-center text-[#002766]">Офіційний сервіс Dräger в Україні</span>
                        <p className="flex self-center leading-relaxed">На сервісному супроводі — понад 5000 одиниць обладнання Dräger. Інженери проходять навчання у Dräger Academy та мають право офіційно надавати послуги з сервісу.</p>

                    </div> */}
                    {/* <div className="flex flex-1 flex-col w-full">
                        <h3 className="text-2xl font-semibold my-4 text-left text-[#0061AA]">Обладнання Dräger:</h3>
                        <div className="flex flex-wrap gap-1 pb-6 w-full">
                            {items3.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 p-6 pl-8 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)] w-full"
                                >
                                    <span className="text-green-500 font-bold text-xl">✓</span>
                                    <span className="text-[#0061AA]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* <div className="flex flex-col justify-normal items-start w-full text-[#0061AA]">
                        <h3 className="text-2xl font-semibold mt-4 text-left">Переваги сервісу Dräger від ДМ-ПРОЕКТ:</h3>
                        <ul className="list-disc space-y-1 leading-relaxed ">
                            <li className="ml-16 before:mr-2">єдиний в Україні уповноважений офіційний сервіс</li>
                            <li className="ml-16 before:mr-2">індивідуальні плани ТО</li>
                            <li className="ml-16 before:mr-2">дотримання усіх регламентів</li>
                            <li className="ml-16 before:mr-2">використання оригінальних сервісних комплектів</li>
                            <li className="ml-16 before:mr-2">підтримка повного циклу експлуатації</li>
                        </ul>
                    </div> */}

                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Навчання медичного персоналу'}</span>
                    <p className="flex self-center text-left leading-relaxed text-[#0061AA]">Навчання є частиною сервісного супроводу. Проводиться під час встановлення, після оновлення ПЗ або при розширенні функціоналу.</p>
                    {/* <div className={classNames("flex flex-col max-w-[1400px] w-full justify-center self-center", styles.servContainer1)}>
                        <div className="flex-1 pr-8">
                            <h3 className="text-2xl font-semibold mt-4 text-left">Навчальні сценарії:</h3>
                            <div className="mx-auto space-y-4 pb-6 w-full">
                                {items4.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)]"
                                    >
                                        <span className="text-green-500 font-bold text-xl">✓</span>
                                        <span className="text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center flex-1 relative ">
                            <Image
                                src={pics[2].front}
                                alt="ТО"
                                width={350}
                                height={400}
                                className="rounded-2xl" />
                        </div>
                    </div> */}

                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Гарантії сервісу'}</span>
                    <p className="flex self-center text-left leading-relaxed text-[#0061AA]">ДМ-ПРОЕКТ надає сервіс із чітко прописаними гарантіями на роботи, запчастини та документацію, дотримуючись вимог виробників і міжнародних стандартів.</p>
                    {/* <div className={classNames("flex max-w-[1400px] w-full justify-center self-center pt-2", styles.servContainer1)}>
                        <div className="flex-1 pr-8">
                            <div className="flex flex-wrap gap-1 pb-6 w-full">
                                {items5.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)] w-full"
                                    >
                                        <span className="text-green-500 font-bold text-xl">✓</span>
                                        <span className="text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Вартість та принцип формування'}</span>
                    <p className="flex self-center text-left leading-relaxed text-[#0061AA]">Вартість формується індивідуально, залежно від:</p>
                    {/* <div className={classNames("flex max-w-[1400px] w-full justify-center self-center pt-2", styles.servContainer1)}>
                        <div className="flex-1 pr-8">
                            <div className="flex flex-wrap gap-1 pb-6 w-full">
                                {items6.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl shadow-[inset_4px_0_0_0_rgba(0,102,204,1)] w-full"
                                    >
                                        <span className="text-green-500 font-bold text-xl">✓</span>
                                        <span className="text-[#0061AA]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={classNames("flex justify-center items-center", styles.servButton)}>
                        <button
                            className={styles.servSubmit1}
                            type="button" // змінено з submit на button
                            onClick={handleShowForm}
                        >
                            {'Подати заявку на сервіс'}
                        </button>
                    </div> */}
                    <span className="text-[24px] py-3 text-[#002766] self-center">{'Повний життєвий цикл обладнання'}</span>
                    <p className="flex self-center text-left leading-relaxed text-[#0061AA]">ДМ-ПРОЕКТ забезпечує повний сервісний цикл підтримки — від встановлення та інсталяції обладнання до стабільної та надійної експлуатації протягом багатьох років</p>

                    {/* <div className={classNames("w-full max-w-5xl mx-auto rounded-xl bg-blue-50/60 px-6 py-8", styles.servContainer)}>
                        <h2 className="mb-7 text-center text-2xl  font-normal text-[#002766]">
                            Контакти сервісної служби
                        </h2>

                        <div className="flex flex-col gap-6 text-center">
                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-medium text-[#0061AA]">Телефон</p>
                                <p className="text-lg font-semibold text-blue-900">
                                    +38 066 368 98 10
                                </p>
                            </div>

                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-medium text-[#0061AA]">Години роботи</p>
                                <p className="text-lg font-semibold text-blue-900">
                                    Пн–Пт, 09:00–18:00
                                </p>
                            </div>

                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-medium text-[#0061AA]">
                                    Запити та рахунки
                                </p>
                                <p className="text-lg font-semibold text-blue-900">
                                    За підтвердженням
                                </p>
                            </div>
                        </div>
                    </div> */}


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
                                    }}
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
                                    onChange={e => setName(e.target.value)} />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-mobile')}
                                    id="mobile"
                                    type="text"
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value)} />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-medicalFacility')}
                                    id="medicalFacility"
                                    type="text"
                                    value={medicalFacility}
                                    onChange={e => setMedicalFacility(e.target.value)} />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-city')}
                                    id="city"
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)} />
                                <input
                                    className={classNames("h-10 w-full mb-2", styles.form)}
                                    placeholder={t('contact-form-email')}
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                <textarea
                                    className={classNames("h-24 w-full mb-2 pt-2", styles.form)}
                                    placeholder={t('contact-form-message')}
                                    id="message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)} />
                                <button className={styles.yerSubmit} type="submit">{t('contact-form-submit')}</button>
                                {status && <p className="mt-1 text-sm text-green-600">{status}</p>}
                            </motion.form>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};
