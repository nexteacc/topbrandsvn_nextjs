import React from "react";
import ResearchBackButton from "../../../components/ResearchBackButton";
import fs from "fs";
import path from "path";
import { marked } from "marked";



// 获取单个Markdown文件内容
async function getMarkdownContent(locale: string, slug: string) {
  try {
    const newsDir = path.join(process.cwd(), "app", "data", "news", locale);
    const filePath = path.join(newsDir, `${decodeURIComponent(slug)}.md`);
    const content = await fs.promises.readFile(filePath, "utf-8");
    
    // 使用marked解析Markdown
    const htmlContent = marked(content);
    
    // 提取标题（第一行）
    const titleMatch = content.match(/^#*\s*(.+)/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    return {
      title,
      content: htmlContent,
      rawContent: content
    };
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// 生成静态参数
export async function generateStaticParams() {
  try {
    const newsBaseDir = path.join(process.cwd(), "app", "data", "news");
    const locales = await fs.promises.readdir(newsBaseDir);
    let allParams: { locale: string; slug: string }[] = [];

    for (const locale of locales) {
      const newsDir = path.join(newsBaseDir, locale);
      const files = await fs.promises.readdir(newsDir);
      const newsFiles = files.filter(f => f.endsWith(".md"));

      const paramsForLocale = newsFiles.map(file => ({
        locale: locale,
        slug: encodeURIComponent(file.replace(/\.md$/, ""))
      }));
      allParams = allParams.concat(paramsForLocale);
    }
    
    return allParams;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function NewsDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const article = await getMarkdownContent(locale, slug);

  
  if (!article) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">文章未找到</h1>
        <ResearchBackButton locale={locale} />
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <ResearchBackButton locale={locale} />
      </div>
      
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}