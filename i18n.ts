import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (
      await (locale === 'ua'
        ? // When using Turbopack, this will enable HMR for `ua`
          import('messages/ua.json')
        : import(`messages/${locale}.json`))
    ).default
  };
});