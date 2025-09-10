"use client";

import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

interface PostData {
  title: string;
  date: string;
  content: string;
}

export default function PostContent({ postData }: { postData: PostData }) {
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    async function processMarkdown() {
      const processed = await remark().use(html).process(postData.content);
      setContentHtml(processed.toString());
    }
    processMarkdown();
  }, [postData.content]);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
      <div className="text-gray-500 mb-4">{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className="mt-4">
        <Link href="/" className="text-blue-600">
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
