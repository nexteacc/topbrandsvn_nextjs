'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";

interface ResearchBackButtonProps {
  locale: string;
}

export default function ResearchBackButton({ locale }: ResearchBackButtonProps) {
  const t = useTranslations(); // 移除 'Index'

  return (
    <Link href={`/${locale}/research`} className="text-blue-600 hover:underline">
      ← {t('back')}
    </Link>
  );
}