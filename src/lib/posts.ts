import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type PostMeta = {
  id: string
  title: string
  date: string
}

export function getSortedPostsData(): PostMeta[] {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostMeta[] = fileNames.map(fileName => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    return {
      id: fileName.replace(/\.md$/, ""),
      title: data.title,
      date: data.date
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}
