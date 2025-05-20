import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import nextIntlConfig from './next-intl.config';
import { Locale } from './types';

// 从统一配置文件导入
export const locales = nextIntlConfig.locales as Locale[];
export const defaultLocale = nextIntlConfig.defaultLocale as Locale;

export default getRequestConfig(async ({requestLocale}) => {
  // 获取请求的语言设置
  let locale = await requestLocale;
  console.log('Current requestLocale:', locale);

  // 确保locale是有效的，如果无效则使用默认语言
  if (!locale || !locales.includes(locale as Locale)) {
    console.log(`Invalid locale "${locale}", falling back to default locale: ${defaultLocale}`);
    locale = defaultLocale;
  }

  try {
    const messages = (await import(`./locales/${locale}.json`)).default;
    console.log(`Successfully loaded messages for locale "${locale}".`);
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error('Failed to load messages for locale: ' + locale, error);
    notFound();
  }
});