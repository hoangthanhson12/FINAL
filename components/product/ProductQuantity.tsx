"use client"

import { Minus, Plus } from "lucide-react"

interface ProductQuantityProps {
  quantity: number
  stock: number
  onQuantityChange: (type: "increase" | "decrease") => void
}

export default function ProductQuantity({ quantity, stock, onQuantityChange }: ProductQuantityProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Số lượng</h3>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => onQuantityChange("decrease")}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4 cursor-pointer" />
          </button>
          <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
          <button
            onClick={() => onQuantityChange("increase")}
            disabled={quantity >= stock}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
        <span className="text-sm text-gray-600">{stock} sản phẩm có sẵn</span>
      </div>
    </div>
  )
}
