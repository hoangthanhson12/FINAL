"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, Filter, SlidersHorizontal, Heart, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { searchProducts, type SearchFilters } from "@/lib/search"
import { allProducts, toSlug } from "@/lib/products"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { toast } from "@/components/ui/use-toast"
import LoginRequiredDialog from "@/components/LoginRequiredDialog"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    priceRange: { min: 0, max: 200000000 },
    rating: 0,
    sortBy: "default",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Search results
  const searchResults = useMemo(() => {
    return searchProducts(query, filters)
  }, [query, filters])

  // Get unique categories from search results
  const availableCategories = useMemo(() => {
    const categories = new Set(searchResults.map((product) => product.category))
    return Array.from(categories)
  }, [searchResults])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePriceRangeChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min: values[0], max: values[1] },
    }))
  }

  const handleFavoriteClick = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }

    toggleFavorite(product.id)

    if (isFavorite(product.id)) {
      toast({
        title: "💔 Đã xóa khỏi yêu thích",
        description: `${product.name}`,
        duration: 2000
      })
    } else {
      toast({
        title: "❤️ Đã thêm vào yêu thích",
        description: `${product.name}`,
        duration: 2000
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }

    addToCart(product, 1, false)
    toast({
      title: "✅ Đã thêm vào giỏ hàng",
      description: `${product.name}`,
      duration: 3000
    })
  }

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }

    addToCart(product, 1, true)
    router.push("/gio-hang")
  }

  const handleLogin = () => {
    setShowLoginDialog(false)
    router.push("/dang-nhap")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const getProductDetailUrl = (product: any) => {
    const productSlug = toSlug(product.name)
    switch (product.category) {
      case "Camera":
        return `/camera/${productSlug}`
      case "Laptop":
        return `/laptop/${productSlug}`
      case "Phụ kiện":
        return `/phu-kien/${productSlug}`
      default:
        return `/product/${productSlug}`
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header products={allProducts}/>

      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? `Kết quả tìm kiếm cho "${query}"` : "Tìm kiếm sản phẩm"}
          </h1>
          <p className="text-gray-600">
            {searchResults.length > 0 ? `Tìm thấy ${searchResults.length} sản phẩm` : "Không tìm thấy sản phẩm nào"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="lg:hidden mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full justify-between">
                <span className="flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Bộ lọc
                </span>
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Khoảng giá</h3>
                  <div className="space-y-4">
                    <Slider
                      value={[filters.priceRange?.min || 0, filters.priceRange?.max || 200000000]}
                      onValueChange={handlePriceRangeChange}
                      max={200000000}
                      min={0}
                      step={1000000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₫{formatPrice(filters.priceRange?.min || 0)}</span>
                      <span>₫{formatPrice(filters.priceRange?.max || 200000000)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Đánh giá</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange("rating", rating)}
                        className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
                          filters.rating === rating ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex">{renderStars(rating)}</div>
                        <span className="text-sm">từ {rating} sao</span>
                      </button>
                    ))}
                    <button
                      onClick={() => handleFilterChange("rating", 0)}
                      className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
                        filters.rating === 0 ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-sm">Tất cả</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">Hiển thị {searchResults.length} kết quả</span>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Mặc định</SelectItem>
                  <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                  <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <Link href={getProductDetailUrl(product)}>
                      <div className="relative mb-4 cursor-pointer p-2 px-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={1000}
                          height={1000}
                          className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 cursor-pointer"
                            onClick={(e) => handleFavoriteClick(e, product)}
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${
                                isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                              }`}
                            />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link href={getProductDetailUrl(product)}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-lg font-bold text-red-600">{product.price}₫</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}₫
                          </span>
                          <Badge className="bg-red-500">-{product.discount}</Badge>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer"
                          size="sm"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Thêm
                        </Button>
                        <Button
                          className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer"
                          size="sm"
                          onClick={(e) => handleBuyNow(e, product)}
                        >
                          Mua ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <Image
                  src="/img/empty_state.png"
                  alt="Không tìm thấy sản phẩm"
                  width={300}
                  height={200}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp.
                </h3>
                <p className="text-gray-600 mb-6">Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn.</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Gợi ý:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Kiểm tra chính tả từ khóa</li>
                    <li>• Sử dụng từ khóa tổng quát hơn</li>
                    <li>• Thử tìm kiếm theo danh mục sản phẩm</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      <LoginRequiredDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}
