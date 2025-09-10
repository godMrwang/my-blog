import Link from "next/link"
import { getSortedPostsData, PostMeta } from "@/lib/posts"

export default function PostsList() {
  const allPostsData: PostMeta[] = getSortedPostsData()
  return (
    <ul>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id} className="mb-2">
          <Link href={`/posts/${id}`} className="text-blue-600">{title}</Link>
          <br />
          <small className="text-gray-500">{date}</small>
        </li>
      ))}
    </ul>
  )
}
