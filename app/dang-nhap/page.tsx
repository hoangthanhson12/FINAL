
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { allProducts } from "@/lib/products"

export default function LoginPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
     } 
    //  else if (formData.password.length < 6) {
    //   newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    // }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({ email: "", password: "", general: "" })

    try {
      // For demo purposes, accept admin@admin.com with password "admin"
      // or the original admin/admin combination
      const isValidLogin =
        (formData.email === "admin@admin.com" && formData.password === "admin") ||
        (formData.email === "admin" && formData.password === "admin")

      if (isValidLogin) {
        const success = await login("admin", "admin")
        if (success) {
          setIsDirty(false) // Reset dirty state before navigation
          router.push("/")
        } else {
          setErrors({
            email: "",
            password: "",
            general: "Đã xảy ra lỗi. Vui lòng thử lại.",
          })
        }
      } else {
        setErrors({
          email: "",
          password: "",
          general: "Email hoặc mật khẩu không đúng",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({
        email: "",
        password: "",
        general: "Đã xảy ra lỗi. Vui lòng thử lại.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Đánh dấu form đã thay đổi khi người dùng nhập
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (!isDirty) setIsDirty(true)
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "", general: "" }))
    }
  }

  // Cảnh báo khi reload hoặc chuyển trang
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = "" // Chrome requires returnValue to be set
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isDirty])

  return (
    <>
      <Header products={allProducts}/>
      <div className="container mx-auto flex items-start justify-center pt-4">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 items-start justify-center m-4 rounded-xl">
          <div className="max-w-md text-white my-6">
            <h1 className="text-4xl font-bold mb-6 leading-tight">TechStore</h1>
            <p className="text-lg mb-4 opacity-90">
              Chuyên cung cấp camera, máy tính và thiết bị công nghệ chất lượng cao
            </p>
            <div className="relative">
              <Image src="/img/bia.png" alt="Dashboard illustration" width={350} height={100} className="h-auto" />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-4 bg-gray-50">
          <Card className="w-full max-w-md bg-white shadow-lg">
            <CardContent className="px-8 py-4">
              <div className="text-center mb-3">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src="/img/logo.png" alt="" />
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">TechStore</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Chào mừng bạn đến với TechStore</h2>
                <p className="text-gray-600">Vui lòng nhập tài khoản của bạn</p>
              </div>

              {/* Demo Account Info */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-1">🔑 Tài khoản demo:</h3>
                <p className="text-xs text-blue-700">
                  <strong>Email:</strong> admin@admin.com
                </p>
                <p className="text-xs text-blue-700">
                  <strong>Mật khẩu:</strong> admin
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-500 hover:text-orange-600 cursor-pointer"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập bằng</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="flex items-center justify-center py-3 cursor-pointer"
                    onClick={() => {
                      // TODO: Implement Google login
                      alert("Tính năng đăng nhập Google sẽ được cập nhật sớm!")
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="flex items-center justify-center py-3 cursor-pointer"
                    onClick={() => {
                      // TODO: Implement Facebook login
                      alert("Tính năng đăng nhập Facebook sẽ được cập nhật sớm!")
                    }}
                  >
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    {"Bạn không có tài khoản? "}
                    <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer">
                      Đăng ký
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
