"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Chỉ redirect nếu KHÔNG phải trang /admin/login và chưa đăng nhập
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, pathname, router])

  // Nếu chưa xác thực và không phải trang login, không hiển thị gì cả (đang chuyển hướng)
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  // Nếu đang ở trang login, chỉ hiển thị nội dung trang login
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            <div className="container mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
