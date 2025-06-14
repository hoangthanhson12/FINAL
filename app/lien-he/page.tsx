"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation"; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { allProducts } from "@/lib/products";

export default function ContactPage() {
    const categories = ["Tất cả sản phẩm", "Camera", "Laptop", "Phụ kiện"];
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const newErrors = {
            fullName: formData.fullName ? "" : "Họ và tên không được để trống.",
            email: formData.email ? "" : "Email không được để trống.",
            phone: formData.phone ? "" : "Số điện thoại không được để trống.",
            message: formData.message ? "" : "Nội dung không được để trống."
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        // Xử lý logic gửi form (ví dụ: gọi API)
        console.log("Form submitted:", formData);
        alert("Tin nhắn của bạn đã được gửi thành công!");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header products={allProducts} />
            <Navigation categories={categories} />
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <nav className="text-sm text-gray-600">
                        <a href="/" className="hover:text-blue-600 cursor-pointer">
                            Trang chủ
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Liên hệ</span>
                    </nav>
                </div>
                <h1 className="text-2xl font-bold text-center mb-6">Liên hệ</h1>

                {/* Đặt thẻ p trong một container có cùng độ rộng với form */}
                <div className="max-w-lg mx-auto mb-8">
                    <p className="text-center text-gray-600">
                        Chúng tôi mong muốn lắng nghe ý kiến của quý khách. Vui lòng gửi mọi yêu cầu, thắc mắc
                        theo thông tin bên dưới, chúng tôi sẽ liên lạc với bạn sớm nhất có thể.
                    </p>
                </div>

                <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
                    <div className="mb-4">
                        <Label htmlFor="fullName">Họ và tên *</Label>
                        <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className={errors.fullName ? "border-red-500" : ""}
                            placeholder="Nhập họ và tên"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={errors.email ? "border-red-500" : ""}
                            placeholder="Nhập địa chỉ Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="phone">Điện thoại *</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className={errors.phone ? "border-red-500" : ""}
                            placeholder="Nhập số điện thoại"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="message">Nội dung *</Label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className={errors.message ? "border-red-500" : ""}
                            placeholder="Nội dung liên hệ"
                            rows={4}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 cursor-pointer"
                    >
                        Gửi tin nhắn
                    </Button>
                </div>
            </div>




            <Footer />
        </div>
    );
}
