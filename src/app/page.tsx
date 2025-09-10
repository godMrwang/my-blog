import Link from "next/link"
import { useEffect, useState } from "react"
import { getSortedPostsData, PostMeta } from "../lib/posts"
import { supabase } from "../lib/supabaseClient"

export default function Home() {
  const allPostsData: PostMeta[] = getSortedPostsData()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 获取当前登录用户
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // 监听登录状态变化
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">我的博客</h1>
        {user ? (
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              登出
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            登录/注册
          </Link>
        )}
      </div>

      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="mb-2">
            <Link href={`/posts/${id}`} className="text-blue-600">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </main>
  )
}

