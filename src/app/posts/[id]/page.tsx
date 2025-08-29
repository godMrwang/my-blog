import { getPostData, getSortedPostsData } from "../../../lib/posts";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";


// 静态生成所有文章页面
export function generateStaticParams() {
  const allPosts = getSortedPostsData();
  return allPosts.map((post) => ({ id: post.id }));
}

// @ts-expect-error  Next.js PageProps 类型与 params 不匹配
export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const matterResult = getPostData(id);

  // 同步渲染 Markdown
  const contentHtml = remark().use(html).processSync(matterResult.content).toString();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{matterResult.data.title}</h1>
      <div className="text-gray-500 mb-4">{matterResult.data.date}</div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className="mt-4">
        <Link href="/" className="text-blue-600">← 返回首页</Link>
      </div>
    </main>
  );
}
