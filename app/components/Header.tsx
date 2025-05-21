'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    let newPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
      newPath = pathname.substring(locale.length + 1) || '/';
    }
    router.push(`/${newLocale}${newPath}`);
  };


  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b border-[#222222] dark:border-gray-700 py-6 sticky top-0 bg-white dark:bg-gray-900 z-10">

      <div className="container mx-auto px-6 flex justify-between items-center">
        <div>

          <h1 className="text-[22px] font-light tracking-[-0.01em]">{t('yourtitle')}</h1>
          <p className="text-[#555] dark:text-gray-400 text-[12px] mt-1">A-Z</p>
        </div>
        <div className="flex items-center space-x-4">


          <select
            value={locale}
            onChange={handleLanguageChange}
            className="border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="en">English</option>
            <option value="zh">简体中文</option>
            <option value="zh-TW">繁體中文</option>
            <option value="ko">한국어</option>
            <option value="vi">Tiếng Việt</option>
            <option value="ru">Русский</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
    </header>
  );
}