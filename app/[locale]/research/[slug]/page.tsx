import React from "react";
import ResearchBackButton from "../../../components/ResearchBackButton";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";

// 获取单个Markdown文件内容（根据 front matter 的 slug 字段查找）
async function getMarkdownContent(locale: string, slug: string) {
  try {
    const newsDir = path.join(process.cwd(), "app", "data", "news", locale);
    const files = await fs.promises.readdir(newsDir);
    const mdFiles = files.filter(f => f.endsWith(".md") && !f.startsWith("."));
    for (const file of mdFiles) {
      const filePath = path.join(newsDir, file);
      const rawContent = await fs.promises.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      if (data.slug === slug) {
        const htmlContent = marked(content);
        // 提取标题（第一行）
        const titleMatch = content.match(/^#*\s*(.+)/m);
        const title = titleMatch ? titleMatch[1] : slug;
        return {
          title,
          content: htmlContent,
          rawContent
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// 生成静态参数
export async function generateStaticParams() {
  try {
    const newsBaseDir = path.join(process.cwd(), "app", "data", "news");
    const allNames = await fs.promises.readdir(newsBaseDir);
    const locales = allNames.filter(name => {
      if (name.startsWith(".")) return false;
      const fullPath = path.join(newsBaseDir, name);
      try {
        return fs.statSync(fullPath).isDirectory();
      } catch {
        return false;
      }
    });
    let allParams: { locale: string; slug: string }[] = [];
    for (const locale of locales) {
      const newsDir = path.join(newsBaseDir, locale);
      const files = await fs.promises.readdir(newsDir);
      const newsFiles = files.filter(f => f.endsWith(".md") && !f.startsWith("."));
      for (const file of newsFiles) {
        const filePath = path.join(newsDir, file);
        const rawContent = await fs.promises.readFile(filePath, "utf-8");
        const { data } = matter(rawContent);
        if (data.slug) {
          allParams.push({ locale, slug: data.slug });
        }
      }
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