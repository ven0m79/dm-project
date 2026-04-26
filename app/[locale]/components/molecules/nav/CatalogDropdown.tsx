'use client'
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '../../../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from './Nav.module.css';

const catalogSubLinks = [
    { titleKey: 'or-equipment',       link: '/catalog/sub-catalog?category=or-equipment' },
    { titleKey: 'icu-equipment',      link: '/catalog/sub-catalog?category=icu-equipment' },
    { titleKey: 'neonatal-equipment', link: '/catalog/sub-catalog?category=neonatal-equipment' },
    { titleKey: 'candd-equipment',    link: '/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment' },
    { titleKey: 'gas-systems',        link: '/catalog/sub-catalog?category=gas-management-systems' },
    { titleKey: 'other-equipment',    link: '/catalog/sub-catalog?category=furniture' },
    { titleKey: 'mri-equipment',      link: '/catalog/sub-catalog?category=mri-equipment' },
    { titleKey: 'accessories',        link: '/catalog/sub-catalog?category=accessories' },
] as const;

export const CatalogDropdown = ({ label }: { label: string }) => {
    const tFooter = useTranslations('Footer');
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cancelClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const cancelOpen = () => {
        if (openTimer.current) {
            clearTimeout(openTimer.current);
            openTimer.current = null;
        }
    };

    const scheduleClose = () => {
        cancelOpen();
        closeTimer.current = setTimeout(() => setOpen(false), 80);
    };

    const handleWrapperEnter = () => {
        cancelClose();
        openTimer.current = setTimeout(() => {
            if (wrapperRef.current) {
                const rect = wrapperRef.current.getBoundingClientRect();
                setPos({ top: rect.bottom, left: rect.left });
            }
            setOpen(true);
        }, 500);
    };

    return (
        <div
            ref={wrapperRef}
            className={styles.dropdownWrapper}
            onMouseEnter={handleWrapperEnter}
            onMouseLeave={scheduleClose}
        >
            <Link href="/catalog" onClick={() => setOpen(false)}>{label}</Link>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className={styles.dropdownPanel}
                            style={{ top: pos.top, left: pos.left }}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                        >
                            {catalogSubLinks.map((sub) => (
                                <Link
                                    key={sub.link}
                                    href={sub.link}
                                    className={styles.dropdownItem}
                                    onClick={() => setOpen(false)}
                                >
                                    {tFooter(sub.titleKey)}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
