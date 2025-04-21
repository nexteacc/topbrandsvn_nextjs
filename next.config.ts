import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'zh', 'zh-TW', 'ko', 'vi', 'ru', 'ja'],
    defaultLocale: 'en',
  },
  /* config options here */
};

export default nextConfig;
