"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/contexts/CartContext";
import { allProducts } from "@/lib/products";
import Link from "next/link";
import { getProvinces, getDistricts, getWards } from "@/lib/addressService";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

interface Ward {
  code: string;
  name: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
    paymentMethod: "cod"
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: ""
  });

  const [finalOrderTotal, setFinalOrderTotal] = useState(0);

  // Load provinces
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to load provinces:", error);
      }
    };
    loadProvinces();
  }, []);

  // Load districts when province changes
  useEffect(() => {
    const loadDistricts = async () => {
      if (formData.city) {
        try {
          const data = await getDistricts(formData.city);
          setDistricts(data);
          setFormData((prev) => ({ ...prev, district: "", ward: "" })); // Đặt lại quận/huyện và phường/xã
          setWards([]); // Xóa danh sách phường/xã
        } catch (error) {
          console.error("Failed to load districts:", error);
        }
      } else {
        setDistricts([]);
        setFormData((prev) => ({ ...prev, district: "", ward: "" }));
        setWards([]); // Xóa danh sách phường/xã
      }
    };
    loadDistricts();
  }, [formData.city]);

  // Load wards when district changes
  useEffect(() => {
    const loadWards = async () => {
      if (formData.district) {
        try {
          const data = await getWards(formData.district);
          setWards(data);
          setFormData((prev) => ({ ...prev, ward: "" })); // Đặt lại phường/xã
        } catch (error) {
          console.error("Failed to load wards:", error);
        }
      } else {
        setWards([]);
        setFormData((prev) => ({ ...prev, ward: "" }));
      }
    };
    loadWards();
  }, [formData.district]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice;

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: ""
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc";
    }

    if (!formData.city) {
      newErrors.city = "Tỉnh/Thành phố là bắt buộc";
    }

    if (!formData.district) {
      newErrors.district = "Quận/Huyện là bắt buộc";
    }

    if (!formData.ward) {
      newErrors.ward = "Phường/Xã là bắt buộc";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "city") {
      setDistricts([]); // Xóa danh sách quận/huyện
      setWards([]); // Xóa danh sách phường/xã
      setFormData((prev) => ({ ...prev, district: "", ward: "" })); // Đặt lại quận/huyện và phường/xã
    }
    if (field === "district") {
      setWards([]); // Xóa danh sách phường/xã
      setFormData((prev) => ({ ...prev, ward: "" })); // Đặt lại phường/xã
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order number
      const orderNum = `DH${Date.now().toString().slice(-6)}`;
      setOrderNumber(orderNum);

      // Save total before clearing cart
      setFinalOrderTotal(finalTotal);
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to cart if empty
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header products={allProducts} />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8">
              Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán
            </p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Order success page
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header products={allProducts} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
            <p className="text-lg text-gray-600 mb-2">Cảm ơn bạn đã đặt hàng tại TechStore</p>
            <p className="text-gray-600 mb-8">
              Mã đơn hàng của bạn là:{" "}
              <span className="font-bold text-orange-600">#{orderNumber}</span>
            </p>

            <div className="bg-white rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Thông tin đơn hàng:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Họ tên:</span> {formData.fullName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span> {formData.phone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span> {formData.address},{" "}
                  {wards.find((w) => w.code === formData.ward)?.name},{" "}
                  {districts.find((d) => d.code === formData.district)?.name},{" "}
                  {provinces.find((p) => p.code === formData.city)?.name}
                </p>
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  <span className="text-red-600 font-bold">₫{formatPrice(finalOrderTotal)}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-orange-500 hover:bg-orange-600">Tiếp tục mua sắm</Button>
                </Link>
                <Link href="/don-hang">
                  <Button variant="outline">Theo dõi đơn hàng</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header products={allProducts} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/gio-hang">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại giỏ hàng
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Xác nhận đơn hàng</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={errors.fullName ? "border-red-500" : ""}
                        placeholder="Nhập họ và tên"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="Nhập email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Địa chỉ giao hàng</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => handleInputChange("city", value)}
                      >
                        <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn tỉnh/thành phố">
                            {formData.city && provinces.find((p) => p.code === formData.city)?.name}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province.code} value={province.code}>
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="district">Quận/Huyện *</Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) => handleInputChange("district", value)}
                        disabled={!formData.city}
                      >
                        <SelectTrigger className={errors.district ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn quận/huyện">
                            {formData.district &&
                              districts.find((d) => d.code === formData.district)?.name}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.code} value={district.code}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.district && (
                        <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="ward">Phường/Xã *</Label>
                      <Select
                        value={formData.ward}
                        onValueChange={(value) => handleInputChange("ward", value)}
                        disabled={!formData.district}
                      >
                        <SelectTrigger className={errors.ward ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn phường/xã">
                            {formData.ward && wards.find((w) => w.code === formData.ward)?.name}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {wards.map((ward) => (
                            <SelectItem key={ward.code} value={ward.code}>
                              {ward.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ cụ thể *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={errors.address ? "border-red-500" : ""}
                      placeholder="Số nhà, tên đường..."
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Ghi chú thêm cho đơn hàng..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Phương thức thanh toán
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="text-orange-500"
                      />
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="text-orange-500"
                      />
                      <span>Chuyển khoản ngân hàng</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-3"
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </Button>
         
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ₫{formatPrice(item.product.priceNumber * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">₫{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                      <span className="text-lg font-bold text-red-600">
                        ₫{formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
