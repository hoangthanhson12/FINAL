interface ProductPromotionsProps {
  promotions: string[]
}

export default function ProductPromotions({ promotions }: ProductPromotionsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-3 bg-gray-50 p-2 rounded-lg">
        <h4 className="font-medium text-gray-900">Ưu đãi</h4>
        <ul className="space-y-2">
          {promotions.map((promotion, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-4 h-4 mb-2">✔️</span>
              <span className="text-sm text-gray-600">{promotion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
