
## 项目概述
这是一个使用 Next.js 15.2.0 构建的多语言品牌目录网站，专注于展示越南的顶级品牌。项目具有以下主要功能：

1. 多语言支持 ：支持7种语言（英语、简体中文、繁体中文、韩语、越南语、俄语和日语）
2. 深色/浅色模式切换 ：提供用户界面主题切换功能
3. 品牌分类展示 ：按不同类别（金融、电信、购物等）展示越南品牌
4. 响应式设计 ：适配不同设备屏幕尺寸
## 技术栈
- 框架 ：Next.js 15.2.0（使用 App Router）
- 国际化 ：next-intl 4.1.0
- 主题切换 ：next-themes 0.4.6
- 样式 ：Tailwind CSS 3.4.1
- 图标 ：Lucide React 0.501.0
- 字体 ：Geist Sans 和 Geist Mono
- 分析工具 ：Google Analytics
## 代码结构分析
### 目录结构
项目采用 Next.js App Router 结构，主要包含：

- /app ：主要应用代码
- /app/[locale] ：国际化路由
- /app/components ：共享组件
- /app/data ：数据文件
- /locales ：语言文件
- /public ：静态资源

