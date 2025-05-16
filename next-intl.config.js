// next-intl配置文件

/** @type {import('next-intl').NextIntlConfig} */
const nextIntlConfig = {
  // 定义支持的语言列表
  locales: ['en', 'zh', 'zh-TW', 'ko', 'vi', 'ru', 'ja'],
  
  // 设置默认语言
  defaultLocale: 'en',
  
  // 本地化检测配置
  localeDetection: false,
  
  // 本地化前缀策略 - 'as-needed'表示默认语言不添加前缀
  localePrefix: 'as-needed'
};

module.exports = nextIntlConfig;