import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Настройки SEO по умолчанию */}
      <DefaultSeo
        title="Next SEO Example"
        description="Next SEO is a plugin that makes managing your SEO easier in Next.js projects."
        openGraph={{
          type: 'website',
          locale: 'en_IE', // Установите соответствующую локаль
          url: 'https://www.url.ie/', // Базовый URL вашего сайта
          siteName: 'SiteName', // Имя сайта
        }}
        twitter={{
          handle: '@handle', // Твиттер-хэндл автора
          site: '@site', // Хэндл сайта
          cardType: 'summary_large_image', // Тип карточки Twitter
        }}
      />
      {/* Отображение компонента текущей страницы */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
