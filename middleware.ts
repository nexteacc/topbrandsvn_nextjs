import createMiddleware from 'next-intl/middleware';
import nextIntlConfig from './next-intl.config';

// 使用统一的配置文件
export default createMiddleware({
  // 默认语言不添加前缀
  localePrefix: nextIntlConfig.localePrefix,
  // 支持的语言列表
  locales: nextIntlConfig.locales,
  // 默认语言
  defaultLocale: nextIntlConfig.defaultLocale,
  // 重要：避免循环重定向
  localeDetection: nextIntlConfig.localeDetection
});

export const config = {
  // 匹配所有路径，但排除api路由和静态资源
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};