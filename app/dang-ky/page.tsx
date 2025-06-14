"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "", // Add name field
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false
    });
    const [errors, setErrors] = useState({
        name: "", // Add name field
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: ""
        };

        if (!formData.name) {
            newErrors.name = "Họ và tên là bắt buộc";
        }

        if (!formData.email) {
            newErrors.email = "Email là bắt buộc";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu là bắt buộc";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
        }

        // Thêm validate cho checkbox điều khoản
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = "Bạn phải đồng ý với điều khoản sử dụng";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập API call

            // Reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                acceptTerms: false
            });

            // Hiển thị thông báo thành công
            setShowSuccess(true);
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (!isDirty) setIsDirty(true);
        if (errors[field as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <>
            <Header products={[]}/>
            <div className="container mx-auto flex items-start justify-center pt-4">
                {/* Left Side - Illustration */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 items-start justify-center m-4 rounded-xl h-auto">
                    <div className="max-w-md text-white my-6">
                        <h1 className="text-4xl font-bold mb-6 leading-tight">TechStore</h1>
                        <p className="text-lg mb-4 opacity-90">
                            Chuyên cung cấp camera, máy tính và thiết bị công nghệ chất lượng cao
                        </p>
                        <div className="relative mb-23.5">
                            <Image
                                src="/img/bia.png"
                                alt="Dashboard illustration"
                                width={400}
                                height={100}
                                className="h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
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
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h2>
                                <p className="text-gray-600">Vui lòng điền thông tin đăng ký</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-2.5">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Họ và tên</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Nhập họ và tên của bạn"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className={errors.name ? "border-red-500" : ""}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Nhập mật khẩu"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            className={errors.password ? "border-red-500" : ""}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Nhập lại mật khẩu"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                            className={errors.confirmPassword ? "border-red-500" : ""}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="w-4 h-4 border-gray-300 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                                            onChange={(e) => {
                                                setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }));
                                                if (!isDirty) setIsDirty(true);
                                                // Xóa lỗi acceptTerms khi checkbox được tick
                                                if (e.target.checked && errors.acceptTerms) {
                                                    setErrors((prev) => ({ ...prev, acceptTerms: "" }));
                                                }
                                            }}
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600">
                                            Tôi đồng ý với{" "}
                                            <Link
                                                href="/dieu-khoan"
                                                className="text-orange-500 hover:text-orange-600 underline font-medium"
                                            >
                                                điều khoản sử dụng
                                            </Link>
                                        </label>
                                    </div>
                                    {errors.acceptTerms && (
                                        <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                                </Button>

                                <div className="relative my-3">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Hoặc đăng ký bằng</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="flex items-center justify-center py-3 cursor-pointer"
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
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2 text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        Facebook
                                    </Button>
                                </div>

                                <div className="text-center mt-4">
                                    <p className="text-gray-600">
                                        Đã có tài khoản?{" "}
                                        <Link
                                            href="/dang-nhap"
                                            className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </p>
                                </div>
                            </form>

                            {showSuccess && (
                                <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
                                        <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
                                            <svg
                                                className="w-10 h-10 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                                            Chúc mừng!
                                        </h3>
                                        <p className="text-gray-600 text-lg text-center mb-6">
                                            Đăng ký tài khoản thành công
                                        </p>
                                        <button
                                            onClick={() => {
                                                setShowSuccess(false);
                                                // Reset checkbox element
                                                const checkbox = document.getElementById("terms") as HTMLInputElement;
                                                if (checkbox) {
                                                    checkbox.checked = false;
                                                }
                                            }}
                                            className="w-full py-3 bg-orange-500 text-white rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors cursor-pointer"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
}
