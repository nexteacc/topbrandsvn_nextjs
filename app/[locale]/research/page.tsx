import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";

// 只从 data/news 目录下读取所有 .md 新闻文件
async function getMarkdownNewsList(locale: string) {
  const newsDir = path.join(process.cwd(), "app", "data", "news", locale);
  const files = await fs.promises.readdir(newsDir);
  // 只筛选以.md结尾的新闻文件
  const newsFiles = files.filter(f => f.endsWith(".md"));
  // 解析文件名和标题
  const newsList = await Promise.all(newsFiles.map(async file => {
    const filePath = path.join(newsDir, file);
    const content = await fs.promises.readFile(filePath, "utf-8");
    // 取第一行作为标题
    const titleMatch = content.match(/^#*\s*(.+)/m);
    return {
      id: encodeURIComponent(file.replace(/\.md$/, "")),
      title: titleMatch ? titleMatch[1] : file,
      fileName: file,
      rawFileName: file // 添加原始文件名用于后续处理
    };
  }));
  return newsList;
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
            <Link href={`/${resolvedLocale}/research/${encodeURIComponent(news.rawFileName.replace(/\.md$/, ""))}`} className="text-blue-600 hover:underline">
              <span className="font-semibold">{news.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}