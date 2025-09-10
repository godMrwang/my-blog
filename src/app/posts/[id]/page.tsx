// src/app/posts/[id]/page.tsx
import { getPostData, getSortedPostsData, PostMeta } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { useState, useEffect } from "react";

export function generateStaticParams() {
  const allPosts: PostMeta[] = getSortedPostsData();
  return allPosts.map((post) => ({ id: post.id }));
}

interface PageProps {
  params: { id: string };
}

export default function PostPage({ params }: PageProps) {
  const { id } = params;

  // 在组件内部处理异步逻辑
  const [contentHtml, setContentHtml] = useState<string>("");
  const [postData, setPostData] = useState<{ title: string; date: string; content: string } | null>(null);

  require("react").useEffect(() => {
    async function fetchPost() {
      const data = getPostData(id);
      const processedContent = await remark().use(html).process(data.content);
      setPostData(data);
      setContentHtml(processedContent.toString());
    }
    fetchPost();
  }, [id]);

  if (!postData) return <div>加载中...</div>;

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
