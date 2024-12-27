/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://dm-project.com.ua', // Укажите URL вашего сайта
    generateRobotsTxt: true, // Генерация robots.txt
    sitemapSize: 5000, // Лимит ссылок в одном файле sitemap
    changefreq: 'daily', // Частота изменения
    priority: 0.7, // Приоритет страниц
  };
  
  module.exports = config;