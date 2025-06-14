"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const productImages = images.length > 0 ? images : ["/placeholder.svg"]

  return (
    <div className="lg:space-y-4 lg:col-span-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group lg:relative lg:aspect-square lg:bg-gray-100 lg:rounded-lg lg:overflow-hidden lg:group">
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button
            onClick={() => setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <Image
          src={productImages[selectedImage] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover transition-transform duration-500"
          priority
        />

      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-between lg:flex lg:space-x-4 lg:p-2 lg:justify-center">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`group relative flex-shrink-0 w-20 h-20 p-0.5 rounded-lg transition-all duration-200
              ${
                selectedImage === index
                  ? "outline outline-orange-500 outline-offset-2 bg-white"
                  : "hover:opacity-80 border border-gray-200"
              }`}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery
