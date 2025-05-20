import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "../../i18n";
import { Locale, LocaleParams, AsyncLocaleParams } from "../../types";
import ThemeProvider from "../components/ThemeProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from 'next/script';

export function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }));
}

export async function generateMetadata({ params }: AsyncLocaleParams) {
  const { locale } = await params; // 使用 await 确保异步获取

  const titles: Record<string, string> = {
    en: "Top Vietnamese Brands - A-Z Directory",
    zh: "越南顶级品牌大全",
    "zh-TW": "越南頂級品牌大全",
    ko: "베트남 대표 브랜드",
    vi: "Danh mục thương hiệu hàng đầu Việt Nam",
    ru: "Лучшие бренды Вьетнама",
    ja: "ベトナムの有名ブランド一覧",
  };
  const descriptions: Record<string, string> = {
    en: "Discover top Vietnamese brands by category. Multi-language, SEO optimized.",
    zh: "按分类浏览越南本土顶级连锁品牌，支持多语言与SEO优化。",
    "zh-TW": "按分類瀏覽越南本土頂級連鎖品牌，支援多語言與SEO優化。",
    ko: "카테고리별 베트남 대표 브랜드를 만나보세요. 다국어, SEO 최적화.",
    vi: "Khám phá các thương hiệu hàng đầu Việt Nam theo danh mục. Hỗ trợ đa ngôn ngữ, tối ưu SEO.",
    ru: "Откройте для себя лучшие вьетнамские бренды по категориям. Мультиязычный сайт, SEO оптимизация.",
    ja: "カテゴリ別にベトナムの有名ブランドを紹介。多言語・SEO対応。",
  };
  
  const keywords: Record<string, string> = {
    en: "Vietnam brands, Vietnamese companies, top brands Vietnam, finance Vietnam, telecom Vietnam, shopping Vietnam",
    zh: "越南品牌, 越南公司, 越南顶级品牌, 越南金融, 越南通信, 越南购物",
    "zh-TW": "越南品牌, 越南公司, 越南頂級品牌, 越南金融, 越南通信, 越南購物",
    ko: "베트남 브랜드, 베트남 기업, 베트남 대표 브랜드, 베트남 금융, 베트남 통신, 베트남 쇼핑",
    vi: "Thương hiệu Việt Nam, Công ty Việt Nam, Thương hiệu hàng đầu Việt Nam, Tài chính Việt Nam, Viễn thông Việt Nam, Mua sắm Việt Nam",
    ru: "Вьетнамские бренды, Вьетнамские компании, Лучшие бренды Вьетнама, Финансы Вьетнам, Телекоммуникации Вьетнам, Шоппинг Вьетнам",
    ja: "ベトナムブランド, ベトナム企業, ベトナム有名ブランド, ベトナム金融, ベトナム通信, ベトナムショッピング",
  };

  // 网站基本URL
  const baseUrl = "https://www.topbrandvn.org";
  
  // 构建当前页面的完整URL
  const currentUrl = `${baseUrl}/${locale}`;
  
  // 构建所有语言版本的URL映射
  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}/${l}`])
  );

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: keywords[locale] || keywords.en,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: currentUrl,
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      siteName: titles[locale] || titles.en,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: titles[locale] || titles.en,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<LocaleParams>;
}) {
  // 在使用 params 的属性前先 await
  const { locale } = await params;
  console.log('[LocaleLayout] params.locale:', locale);
  let messages;
  try {
    // 修改为使用动态 import()
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch (error) { // 添加错误处理日志
    console.error(`[LocaleLayout] Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  // 构建hreflang链接
  const hreflangLinks = locales.map((lang: Locale) => (
    <link 
      key={lang}
      rel="alternate" 
      hrefLang={lang} 
      href={`https://www.topbrandvn.org/${lang}`} 
    />
  ));
  
  // 添加x-default hreflang
  const xDefaultLink = (
    <link 
      key="x-default"
      rel="alternate" 
      hrefLang="x-default" 
      href={`https://www.topbrandvn.org/en`} 
    />
  );

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {hreflangLinks}
        {xDefaultLink}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-[#222222] dark:text-gray-100 flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto px-6 py-12">
                {children}
              </main>
              <Footer />
            </div>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-703Z96SWLE"></Script>
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-703Z96SWLE');
                `,
              }}
            />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}