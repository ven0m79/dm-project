import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';
 
export default function App({Component, pageProps}:any) {
  const router = useRouter();
 
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}