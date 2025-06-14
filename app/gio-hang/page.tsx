"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/contexts/CartContext";
import { allProducts, toSlug } from "@/lib/products";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    toggleSelection,
    selectAll,
    getSelectedTotalPrice,
    getSelectedItems
  } = useCart();
  const [favorites] = useState<number[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const getProductDetailUrl = (product: any) => {
    const productSlug = toSlug(product.name);
    switch (product.category) {
      case "Camera":
        return `/camera/${productSlug}`;
      case "Laptop":
        return `/laptop/${productSlug}`;
      case "Phụ kiện":
        return `/phu-kien/${productSlug}`;
      default:
        return `/product/${productSlug}`;
    }
  };

  const selectedItems = getSelectedItems();
  const selectedTotalPrice = getSelectedTotalPrice();
  const finalTotal = selectedTotalPrice;

  const handleSelectAll = (checked: boolean) => {
    selectAll(checked);
  };

  const allSelected = items.length > 0 && items.every((item) => item.selected);
  const someSelected = items.some((item) => item.selected);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header products={allProducts} />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tiếp tục mua sắm
              </Button>
            </Link>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
          <p className="text-gray-600">
            Bạn có {items.length} sản phẩm trong giỏ hàng
            {selectedItems.length > 0 && ` (${selectedItems.length} sản phẩm được chọn)`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-1 lg:col-span-2">
            <Card>
              <CardContent className="p-4 lg:p-6">
                {/* Select All Header */}
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 mb-4 lg:mb-6">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    className="cursor-pointer"
                  />
                  <span className="font-medium text-gray-900 text-sm lg:text-base">
                    Chọn tất cả ({items.length} sản phẩm)
                  </span>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col lg:flex-row lg: justify-between lg:items-center gap-3 pb-4 lg:pb-6 border-b border-gray-200 last:border-b-0 transition-all ${item.selected ? "bg-orange-50 p-3 lg:p-4 rounded-lg" : ""
                        }`}
                    >
                      {/* First row for mobile: Checkbox + Product Image + Basic Info */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={item.selected}
                          onCheckedChange={() => toggleSelection(item.id)}
                          className="cursor-pointer mt-1"
                        />

                        <Link href={getProductDetailUrl(item.product)} className="flex-shrink-0">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link href={getProductDetailUrl(item.product)}>
                            <h3 className="font-semibold text-gray-900 hover:text-orange-500 transition-colors cursor-pointer line-clamp-2 text-sm lg:text-base">
                              {item.product.name}
                            </h3>
                          </Link>
                          <Badge variant="outline" className="mt-1 text-xs lg:text-sm">
                            {item.product.category}
                          </Badge>
                          <div className="mt-1 lg:mt-2">
                            <span className="font-bold text-red-600 text-sm lg:text-lg">
                              ₫{formatPrice(item.product.priceNumber)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-xs lg:text-sm text-gray-500 line-through ml-2">
                                ₫{item.product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Second row for mobile: Quantity + Price + Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="px-2 sm:px-4 py-1 sm:py-2 min-w-[40px] sm:min-w-[60px] text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right sm:text-left">
                          <p className="font-bold text-gray-900 text-sm sm:text-lg">
                            ₫{formatPrice(item.product.priceNumber * item.quantity)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Tạm tính ({selectedItems.length} sản phẩm):
                    </span>
                    <span className="font-medium">₫{formatPrice(selectedTotalPrice)}</span>
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

                <div className="space-y-3 ">
                  <Link href="/xac-nhan-don-hang">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 py-3 cursor-pointer mb-2"
                      disabled={selectedItems.length === 0}
                    >
                      Tiến hành thanh toán ({selectedItems.length})
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full cursor-pointer">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </div>

                {/* Promotions */}
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">🎉 Ưu đãi đặc biệt</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Miễn phí vận chuyển cho đơn hàng trên 500.000₫</li>
                    <li>• Tặng voucher 100.000₫ cho lần mua tiếp theo</li>
                  </ul>
                </div>

                {selectedItems.length === 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 Vui lòng chọn sản phẩm để tiến hành thanh toán
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
