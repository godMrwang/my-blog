import PostsList from "./components/PostsList"
import AuthStatus from "./components/AuthStatus"

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">我的博客</h1>
        <AuthStatus /> {/* 客户端组件 */}
      </div>
      <PostsList /> {/* 服务器组件 */}
    </main>
  )
}
