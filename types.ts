// 定义应用中使用的类型

// 支持的语言区域类型
export type Locale = 'en' | 'zh' | 'zh-TW' | 'ko' | 'vi' | 'ru' | 'ja';

// 语言区域参数类型
export interface LocaleParams {
  locale: Locale;
}

// 带Promise的语言区域参数类型，用于布局组件
export interface AsyncLocaleParams {
  params: Promise<LocaleParams>;
}