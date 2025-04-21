import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import I18nProvider from "./components/i18n-provider";
import Head from 'next/head';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TopBrandsVN",
  description: "Browse top brands in Vietnam by category",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
      <link rel="alternate" href="https://example.com/en" hrefLang="en" />
        <link rel="alternate" href="https://example.com/zh" hrefLang="zh" />
        <link rel="alternate" href="https://example.com/zh-TW" hrefLang="zh-TW" />
        <link rel="alternate" href="https://example.com/ko" hrefLang="ko" />
        <link rel="alternate" href="https://example.com/vi" hrefLang="vi" />
        <link rel="alternate" href="https://example.com/ru" hrefLang="ru" />
        <link rel="alternate" href="https://example.com/ja" hrefLang="ja" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-[#222222] dark:text-gray-100 flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto px-6 py-12">
                {children}
              </main>
              <Footer />
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
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}