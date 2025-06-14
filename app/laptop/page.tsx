"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/use-toast"
import LoginRequiredDialog from "@/components/LoginRequiredDialog"
import ProductCard from "@/components/ProductCard"
import { toSlug } from "@/lib/utils"
import type { Product } from "@/lib/products"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Pagination from "@/components/pagination"
import BannerSlider from "@/components/Slider"
import { getLaptopProducts, allProducts } from "@/lib/products"

export default function LaptopPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("default")
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const productsPerPage = 10
  const { isAuthenticated } = useAuth()
  const { toggleFavorite, isFavorite } = useFavorites()
  const router = useRouter()

  const laptopProducts = getLaptopProducts()

  const categories = ["Tất cả sản phẩm", "Camera", "Laptop", "Phụ kiện"]

  const handleLogin = () => {
    setShowLoginDialog(false)
    router.push("/dang-nhap")
  }

  const sortedProducts = useMemo(() => {
    let sorted = [...laptopProducts]
    switch (sortBy) {
      case "price-low":
        sorted = sorted.sort((a, b) => a.priceNumber - b.priceNumber)
        break
      case "price-high":
        sorted = sorted.sort((a, b) => b.priceNumber - a.priceNumber)
        break
      case "newest":
        sorted = sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "rating":
        sorted = sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return sorted
  }, [sortBy])

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  // Wishlist functions
  const handleFavoriteClick = (productId: number, productName: string) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }

    toggleFavorite(productId)

    if (isFavorite(productId)) {
      toast({
        title: "💔 Đã xóa khỏi yêu thích",
        description: productName,
        duration: 2000
      })
    } else {
      toast({
        title: "❤️ Đã thêm vào yêu thích",
        description: productName,
        duration: 2000
      })
    }
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header products={laptopProducts}/>
      <Navigation categories={["Tất cả sản phẩm", "Camera", "Laptop", "Phụ kiện"]} />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 cursor-pointer">
              Trang chủ
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Laptop</span>
          </nav>
        </div>
        <BannerSlider images={["/slider/5.png", "/slider/6.png", "/slider/7.png", "/slider/8.png"]} />
        <div className="lg:col-span-4">
          <div id="products-section">
            <div className="flex items-center justify-between mb-6 gap-1">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Laptop</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} của{" "}
                  {sortedProducts.length} sản phẩm
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="newest">Mới nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2  lg:grid-cols-5 gap-6">
              {sortedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} toSlug={toSlug} />
              ))}
            </div>
            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

      </div>

      <Footer />

      {/* Login Required Dialog */}
      <LoginRequiredDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}
