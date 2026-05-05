'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '../../../../../i18n/navigation';
import classNames from 'classnames';
import styles from './Nav.module.css';

type CatFlat = { id: number; name: string; slug: string; parent?: number };

const cache = new Map<string, CatFlat[]>();

const FIRST_LEVEL_UA = [
    { slug: 'or-equipment',                        titleKey: 'or-equipment'       },
    { slug: 'icu-equipment',                       titleKey: 'icu-equipment'      },
    { slug: 'neonatal-equipment',                  titleKey: 'neonatal-equipment' },
    { slug: 'cleaning-and-desinfecting-equipment', titleKey: 'candd-equipment'    },
    { slug: 'gas-management-systems',              titleKey: 'gas-systems'        },
    { slug: 'furniture',                           titleKey: 'other-equipment'    },
    { slug: 'mri-equipment',                       titleKey: 'mri-equipment'      },
    { slug: 'accessories',                         titleKey: 'accessories'        },
] as const;

const FIRST_LEVEL_EN = [
    { slug: 'or-equipment-en',                         titleKey: 'or-equipment'       },
    { slug: 'icu-equipment-en',                        titleKey: 'icu-equipment'      },
    { slug: 'neonatal-equipment-en',                   titleKey: 'neonatal-equipment' },
    { slug: 'cleaning-and-desinfecting-equipment-en',  titleKey: 'candd-equipment'    },
    { slug: 'gas-management-systems-en',               titleKey: 'gas-systems'        },
    { slug: 'furniture-en',                            titleKey: 'other-equipment'    },
    { slug: 'mri-equipment-en',                        titleKey: 'mri-equipment'      },
    { slug: 'accessories-en',                          titleKey: 'accessories'        },
] as const;

export const CatalogDropdown = ({ label }: { label: string }) => {
    const tFooter = useTranslations('Footer');
    const locale = useLocale();

    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
    const [allCats, setAllCats] = useState<CatFlat[]>([]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (cache.has(locale)) {
            setAllCats(cache.get(locale)!);
            return;
        }
        fetch(`/api/woocommerce/categories?locale=${locale}`)
            .then(r => r.ok ? r.json() as Promise<CatFlat[]> : Promise.resolve([]))
            .then(data => { cache.set(locale, data); setAllCats(data); })
            .catch(() => {});
    }, [locale]);

    const catBySlug = useMemo(() => {
        const m = new Map<string, CatFlat>();
        allCats.forEach(c => m.set(c.slug, c));
        return m;
    }, [allCats]);

    const childrenByParentId = useMemo(() => {
        const m = new Map<number, CatFlat[]>();
        allCats.forEach(c => {
            const pid = c.parent ?? 0;
            if (pid !== 0) {
                if (!m.has(pid)) m.set(pid, []);
                m.get(pid)!.push(c);
            }
        });
        return m;
    }, [allCats]);

    const firstLevel = locale === 'en' ? FIRST_LEVEL_EN : FIRST_LEVEL_UA;

    const getSubItems = (slug: string): CatFlat[] => {
        const cat = catBySlug.get(slug);
        if (!cat) return [];
        return (childrenByParentId.get(cat.id) ?? [])
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    const cancelClose = () => {
        if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    };
    const cancelOpen = () => {
        if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    };
    const scheduleClose = () => {
        cancelOpen();
        closeTimer.current = setTimeout(() => { setOpen(false); setHoveredSlug(null); }, 80);
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
    const close = () => { setOpen(false); setHoveredSlug(null); };

    const activeSubItems = hoveredSlug ? getSubItems(hoveredSlug) : [];

    return (
        <div
            ref={wrapperRef}
            className={styles.dropdownWrapper}
            onMouseEnter={handleWrapperEnter}
            onMouseLeave={scheduleClose}
        >
            <Link href="/catalog" onClick={close}>{label}</Link>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className={styles.dropdownContainer}
                            style={{ top: pos.top, left: pos.left }}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                        >
                            {/* First level */}
                            <div className={styles.dropdownPanel}>
                                {firstLevel.map(item => {
                                    const subItems = getSubItems(item.slug);
                                    const catName = catBySlug.get(item.slug)?.name ?? tFooter(item.titleKey);
                                    return (
                                        <div
                                            key={item.slug}
                                            className={classNames(
                                                styles.dropdownItemRow,
                                                { [styles.dropdownItemRowActive]: hoveredSlug === item.slug }
                                            )}
                                            onMouseEnter={() => setHoveredSlug(item.slug)}
                                        >
                                            <Link
                                                href={`/catalog/sub-catalog?category=${item.slug}`}
                                                className={styles.dropdownItemLink}
                                                onClick={close}
                                            >
                                                {catName}
                                            </Link>
                                            {subItems.length > 0 && (
                                                <span className={styles.dropdownArrow}>›</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Second level */}
                            {activeSubItems.length > 0 && (
                                <div className={styles.dropdownSubPanel}>
                                    {activeSubItems.map(sub => (
                                        <Link
                                            key={sub.slug}
                                            href={`/catalog/sub-catalog?category=${sub.slug}`}
                                            className={styles.dropdownSubItem}
                                            onClick={close}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
