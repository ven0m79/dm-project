import {Pathnames} from 'next-intl/navigation';

export const locales = ['ua', 'en'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    ua: '/path',
    en: '/pathnames'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;