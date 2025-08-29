import { getPostData, getSortedPostsData } from "../../../lib/posts";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

// 生成所有静态文章路径
export function generateStaticParams() {
  const allPosts = getSortedPostsData();
  return allPosts.map(post => ({ id: post.id }));
}

// 异步 Page 组件
export default async function PostPage(props: unknown) {
  const { params } = props as { params: { id: string } };
  const { id } = params;
  const matterResult = getPostData(id);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

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
