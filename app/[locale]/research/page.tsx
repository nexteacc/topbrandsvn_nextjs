import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 只从 data/news 目录下读取所有 .md 新闻文件，并解析 front matter 获取 slug
async function getMarkdownNewsList(locale: string) {
  const newsDir = path.join(process.cwd(), "app", "data", "news", locale);
  const files = await fs.promises.readdir(newsDir);
  // 只筛选以.md结尾且不是隐藏文件的新闻文件
  const newsFiles = files.filter(f => f.endsWith(".md") && !f.startsWith("."));
  // 解析 front matter 获取 slug 和标题
  const newsList = await Promise.all(newsFiles.map(async file => {
    const filePath = path.join(newsDir, file);
    const rawContent = await fs.promises.readFile(filePath, "utf-8");
    const { data } = matter(rawContent);
    return {
      id: data.slug || file.replace(/\.md$/, ""),
      slug: data.slug || file.replace(/\.md$/, ""),
      title: data.title || file.replace(/\.md$/, ""), // 使用 front matter 中的标题，如果不存在则使用文件名并移除 .md 后缀
      fileName: file,
      rawFileName: file // 添加原始文件名用于后续处理
    };
  }));
  return newsList.filter(news => !!news.slug);
}

export default async function NewsListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolvedLocale = locale || "zh";
  const newsList = await getMarkdownNewsList(resolvedLocale);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Research</h1>
      <ul>
        {newsList.map(news => (
          <li key={news.id} className="mb-4">
            <Link href={`/${resolvedLocale}/research/${encodeURIComponent(news.slug)}`} className="text-primary hover:underline transition-all duration-200 ease-in-out">
              <span className="font-semibold">{news.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}