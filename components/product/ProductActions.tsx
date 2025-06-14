"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductActionsProps {
  onAddToCart: () => void
  onBuyNow: () => void
}

export default function ProductActions({ onAddToCart, onBuyNow }: ProductActionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex space-x-4">
        <Button
          onClick={onAddToCart}
          variant="outline"
          className="flex-1 py-3 border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Thêm
        </Button>
        <Button onClick={onBuyNow} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 cursor-pointer">
          Mua Ngay
        </Button>
      </div>
    </div>
  )
}
