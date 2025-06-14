"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toSlug } from "@/lib/products"

type TabType = "description" | "features" | "review" | "similar"

interface ProductTabsProps {
  product: any
  relatedProducts: any[]
}

export default function ProductTabs({ product, relatedProducts }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description")

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  // Chuyển đổi thông số kỹ thuật từ cấu trúc dữ liệu sản phẩm sang định dạng hiển thị
  const getFormattedSpecifications = () => {
    const specs: Record<string, any> = {}

    // Kiểm tra xem sản phẩm có thông số kỹ thuật không
    if (!product.specifications) {
      return {
        "Thông tin": "Chưa có thông số kỹ thuật chi tiết cho sản phẩm này",
      }
    }

    // Xử lý thông số kỹ thuật cho camera
    if (product.specifications.camera) {
      const camera = product.specifications.camera

      specs["Độ phân giải"] = camera.resolution
      specs["Góc nhìn"] = camera.viewAngle

      // Xử lý góc xoay
      if (camera.rotationAngles) {
        specs["Góc xoay"] = [
          `Xoay dọc ${camera.rotationAngles.vertical}`,
          `Nhìn ngang ${camera.rotationAngles.horizontal}`,
          `Nhìn chéo ${camera.rotationAngles.diagonal}`,
        ]
      }

      specs["Tầm nhìn xa hồng ngoại"] = camera.nightVision

      // Xử lý tính năng
      if (camera.features && camera.features.length > 0) {
        specs["Tiện ích"] = camera.features
      }

      specs["Đàm thoại 2 chiều"] = camera.twoWayAudio
    }

    // Thêm các thông số chung nếu không có thông số chi tiết
    // if (Object.keys(specs).length === 0) {
    //   specs["Thương hiệu"] = "TechStore"
    //   specs["Model"] = product.name
    //   specs["Bảo hành"] = "24 tháng chính hãng"
    //   specs["Xuất xứ"] = "Chính hãng"
    //   specs["Tình trạng"] = "Mới 100%"
    // }

    return specs
  }

  const specifications = getFormattedSpecifications()

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6">
      {/* Tab Headers */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-3 text-sm cursor-pointer font-medium transition-colors
            ${
              activeTab === "description"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Mô tả sản phẩm
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-6 py-3 text-sm font-medium cursor-pointer transition-colors
            ${
              activeTab === "features"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Thông số kỹ thuật
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`px-6 py-3 text-sm font-medium cursor-pointer transition-colors
            ${
              activeTab === "review"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Đánh giá
        </button>
        <button
          onClick={() => setActiveTab("similar")}
          className={`px-6 py-3 text-sm font-medium cursor-pointer transition-colors
            ${
              activeTab === "similar"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Sản phẩm khác
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "description" && (
          <div className="prose max-w-none text-gray-700">
            {product.description?.map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            )) || (
              <p className="mb-4">
                {product.name} là một sản phẩm chất lượng cao được thiết kế để đáp ứng nhu cầu của người dùng.
              </p>
            )}
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật chi tiết</h3>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {Object.entries(specifications).map(([key, value], index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium text-gray-900 md:col-span-1">{key}:</div>
                    <div className="text-gray-700 md:col-span-2">
                      {Array.isArray(value) ? (
                        <div className="space-y-1">
                          {value.map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">📋 Lưu ý quan trọng</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Thông số kỹ thuật có thể thay đổi tùy theo phiên bản sản phẩm</li>
                <li>• Vui lòng liên hệ để được tư vấn chi tiết về sản phẩm</li>
                <li>• Sản phẩm được bảo hành chính hãng theo quy định của nhà sản xuất</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-4">Khách hàng đánh giá</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {[
                  {
                    name: "Hoàng Thanh Sơn",
                    rating: 5.0,
                    comment: "Sản phẩm tốt, chất lượng như mô tả",
                    avatar: "/avt/son.jpg",
                    date: "15/11/2024",
                  },
                  {
                    name: "Đỗ Lê Nguyên",
                    rating: 5.0,
                    comment: "Tuyệt vời!!! Giao hàng nhanh, đóng gói cẩn thận",
                    avatar: "/avt/nguyen.jpg",
                    date: "12/11/2024",
                  },
                  {
                    name: "Nguyễn Ngọc Việt Thắng",
                    rating: 1.0,
                    comment: "Chưa mua nhưng vote 1 sao để test",
                    avatar: "/avt/thang.jpg",
                    date: "10/11/2024",
                  },
                ].map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      {review.avatar ? (
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={`Avatar of ${review.name}`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{review.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{review.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-500">({review.rating})</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Summary */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">📊 Tổng quan đánh giá</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">4.3</div>
                  <div className="text-sm text-gray-600">Điểm trung bình</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{product.reviews}</div>
                  <div className="text-sm text-gray-600">Lượt đánh giá</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">95%</div>
                  <div className="text-sm text-gray-600">Hài lòng</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">98%</div>
                  <div className="text-sm text-gray-600">Sẽ mua lại</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "similar" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm tương tự</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((product) => (
                <Link key={product.id} href={`/${product.category.toLowerCase()}/${toSlug(product.name)}`}>
                  <div className="border rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-orange-500 font-medium">₫{product.price}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 line-through">₫{product.originalPrice}</span>
                        <span className="hidden lg:text-xs lg:bg-red-500 lg:text-white lg:px-1 lg:rounded">-{product.discount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
