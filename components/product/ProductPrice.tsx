import { Badge } from "@/components/ui/badge"

interface ProductPriceProps {
  price: string
  originalPrice: string
  discount: string
}

export default function ProductPrice({ price, originalPrice, discount }: ProductPriceProps) {
  return (
    <div className="space-y-2">
      <div className="lg:flex lg:items-center lg:space-x-4">
        <span className="text-3xl font-bold text-red-600">₫{price}</span>
        <br className="block lg:hidden"/>
        <span className="text-lg text-gray-500 line-through">₫{originalPrice}</span>
        <Badge variant="destructive" className="hidden lg:bg-red-500">
          -{discount}
        </Badge>
      </div>
    </div>
  )
}
