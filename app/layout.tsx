import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import I18nProvider from "./components/i18n-provider";

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
  // params: { locale } // If using Next.js i18n routing later
}: Readonly<{
  children: React.ReactNode;
  // params: { locale: string };
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider /* initialLocale={locale} */ >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-white dark:bg-gray-900 text-[#222222] dark:text-gray-100 flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto px-6 py-12">
                {children}
              </main>
              <Footer />
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-703Z96SWLE"></script>
              <script
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