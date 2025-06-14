import { Star } from "lucide-react"

interface ProductRatingProps {
  rating: number
  reviews: number
}

export default function ProductRating({ rating, reviews }: ProductRatingProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">{renderStars(rating)}</div>
      <span className="text-sm font-medium text-gray-900">{rating}</span>
      <span className="text-sm text-gray-500">({reviews} đánh giá)</span>
    </div>
  )
}
