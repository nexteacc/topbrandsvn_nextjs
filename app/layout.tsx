import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 根布局只传递字体变量，不包含完整HTML结构 */}
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
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
    </>
  );
}