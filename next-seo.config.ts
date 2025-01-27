// next-seo.config.js

const defaultSEOConfig = {
    // The default title for your site.
    title: "ДМ-проект",
    // A template for the title, allowing you to add a suffix or prefix.
    titleTemplate: "%s | ДМ-проект",
    // The default title for pages that don't specify their own title.
    defaultTitle: "ДМ-проект",
    // The default description for your site.
    description: "Компанія ДМ-ПРОЕКТ заснована у 2009 році як уповноважений представник німецької компанії Dräger в Україні, світового лідера з виробництва систем життєзабезпечення людини.",
    // Open Graph settings for better social media integration.
    openGraph: {
      // The type of content (e.g., website, article).
      type: 'website',
      // The locale of your content.
      locale: 'uk_UA', // Основной язык.
      localeAlternate: ['en_US'], // Альтернативный язык.
      // The canonical URL of your site.
      url: '<https://www.dm-project.com.ua/>',
      // The name of your site.
      site_name: 'ДМ-проект',
      // The default title for Open Graph.
      title: 'ДМ-проект',
      // The default description for Open Graph.
      description: 'Компанія ДМ-ПРОЕКТ заснована у 2009 році як уповноважений представник німецької компанії Dräger в Україні, світового лідера з виробництва систем життєзабезпечення людини.',
      // Images that will be used when your content is shared.
      images: [
        {
          url: '<https://www.dm-project.com.ua/og-image.wepb>',
          width: 1200,
          height: 630,
          alt: 'ДМ-проект - зображення для соцмереж',
        },
      ],
    },
    // Twitter settings for Twitter cards.
    twitter: {
      // The card type, which determines how your content is displayed.
      cardType: 'summary_large_image',
      // The Twitter handle of your site.
      site: '@mywebsite',
      // The Twitter handle of the content creator.
      creator: '@mywebsite',
      // The default title for Twitter cards.
      title: 'My Website',
      // The default description for Twitter cards.
      description: 'This is the default description of my website.',
      // The image that will be used in Twitter cards.
      image: '<https://www.dm-project.com.ua/og-image.webp>',
    },
    // Additional meta tags to include in the head of your document.
    additionalMetaTags: [
      {
        name: 'theme-color',
        content: '#000000',
      },
      {
        name: 'msapplication-navbutton-color',
        content: '#000000',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: '#000000',
      },
    ],
  };
  export default defaultSEOConfig;