// src/app/posts/[id]/page.tsx
import { getPostData, getSortedPostsData, PostMeta } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

// 生成静态路径
export function generateStaticParams() {
  const allPosts: PostMeta[] = getSortedPostsData();
  return allPosts.map((post) => ({ id: post.id }));
}

// 异步 Page 组件
export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const postData = getPostData(id);

  const processedContent = await remark().use(html).process(postData.content);
  const contentHtml = processedContent.toString();

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
