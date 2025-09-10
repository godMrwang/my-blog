// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  id: string;
  title: string;
  date: string;
};

// 获取所有文章元数据并排序
export function getSortedPostsData(): PostMeta[] {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      id: fileName.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 获取单篇文章数据
export function getPostData(id: string) {
  const filePath = path.join(process.cwd(), "posts", `${id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    id,
    title: data.title,
    date: data.date,
    content,
  };
}
