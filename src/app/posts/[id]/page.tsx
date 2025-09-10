import { getPostData, getSortedPostsData, PostMeta } from "@/lib/posts";
import PostContent from "./PostContent";

export function generateStaticParams() {
  const allPosts: PostMeta[] = getSortedPostsData();
  return allPosts.map((post) => ({ id: post.id }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id);
  return <PostContent postData={postData} />;
}
