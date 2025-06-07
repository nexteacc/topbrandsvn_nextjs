'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BackgroundPaths } from '@/components/ui/background-paths';

interface LayoutWrapperProps {
  children: ReactNode;
  locale: string; // Or the appropriate type for locale
}

export default function LayoutWrapper({ children, locale }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Determine if the current page is the homepage for any locale.
  // The homepage path would be like "/en", "/vi", etc.
  // We need to check if the pathname matches exactly a locale segment.
  const isHomePage = pathname === `/${locale}` || (locale === 'en' && pathname === '/'); // Assuming 'en' can also be at root '/'

  if (isHomePage) {
    return (
      <BackgroundPaths>
        <Header />
        <main className="flex-grow container mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </BackgroundPaths>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        {children}
      </main>
      <Footer />
    </>
  );
}