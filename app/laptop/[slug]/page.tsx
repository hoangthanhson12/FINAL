"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getProductBySlug, getRelatedProducts, allProducts } from "@/lib/products"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

// Import reusable components
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb"
import ProductImageGallery from "@/components/product/ProductImageGallery"
import ProductRating from "@/components/product/ProductRating"
import ProductPrice from "@/components/product/ProductPrice"
import ProductPromotions from "@/components/product/ProductPromotions"
import ProductQuantity from "@/components/product/ProductQuantity"
import ProductActions from "@/components/product/ProductActions"
import ProductTabs from "@/components/product/ProductTabs"
import LoginRequiredDialog from "@/components/LoginRequiredDialog"

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function LaptopDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  if (!product) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false)

  const relatedProducts = getRelatedProducts(product)

  // Mock additional images for demo
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]

  // Mock stock for demo
  const stock = product.stock || 10

  // Mock promotions for laptop
  const laptopPromotions = [
    "Tặng kèm chuột không dây trị giá 300.000đ",
    "Giảm 10% khi mua thêm phụ kiện laptop",
    "Bảo hành 24 tháng chính hãng",
    "Miễn phí cài đặt phần mềm trọn đời",
  ]

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < stock) {
      setQuantity(quantity + 1)
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true)
      return
    }
    console.log("Added to cart:", { product, quantity })
    toast.success(`✅ Đã thêm vào giỏ hàng: ${product.name}`, { duration: 3000 })
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true)
      return
    }
    console.log("Buy now:", { product, quantity })
    router.push("/gio-hang")
  }

  const toggleFavorite = () => {
    if (favorites.includes(product.id)) {
      setFavorites(favorites.filter((id) => id !== product.id))
    } else {
      setFavorites([...favorites, product.id])
    }
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Laptop", href: "/laptop" },
    { label: product.name, href: `/laptop/${slug}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header products={allProducts}/>

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <ProductBreadcrumb breadcrumbs={breadcrumbs} />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
            {/* Product Images */}
            <ProductImageGallery
              images={productImages}
              productName={product.name}
            />

            <div className="hidden lg:col-span-1"></div>

            {/* Product Information */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              </div>

              {/* Rating */}
              <ProductRating rating={product.rating} reviews={product.reviews} />

              {/* Price */}
              <ProductPrice price={product.price} originalPrice={product.originalPrice} discount={product.discount} />

              {/* Promotions & Gifts */}
              <ProductPromotions promotions={laptopPromotions} />

              

              {/* Quantity */}
              <ProductQuantity quantity={quantity} stock={stock} onQuantityChange={handleQuantityChange} />

              {/* Action Buttons */}
              <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
            </div>
          </div>
        </div>
        {/* Product Details Tabs */}
        <ProductTabs product={product} relatedProducts={relatedProducts} />
      </div>
      <Footer />
      <LoginRequiredDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLogin={() => {
          setLoginDialogOpen(false)
          router.push("/dang-nhap")
        }}
      />
    </div>
  )
}
