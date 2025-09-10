"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return user ? (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-600">{user.email}</span>
      <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
        登出
      </button>
    </div>
  ) : (
    <a href="/login" className="bg-blue-500 text-white px-3 py-1 rounded">
      登录/注册
    </a>
  )
}
