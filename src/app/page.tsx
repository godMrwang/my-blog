import Link from "next/link";
import { getSortedPostsData, PostMeta } from "../lib/posts";

export default function Home() {
  const allPostsData: PostMeta[] = getSortedPostsData();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <meta name="google-site-verification" content="HpRZvaRYZEd3eS9YEOM3t5TR8zG0tHRSUO12KSZftn8" />
      <h1 className="text-3xl font-bold mb-4">我的博客</h1>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="mb-2">
            <Link href={`/posts/${id}`} className="text-blue-600">{title}</Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
