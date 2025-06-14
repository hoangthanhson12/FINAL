import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  featuredProducts: string[]
}

export default function Sidebar({ featuredProducts }: SidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        {/* Categories Menu */}
        <div className="pl-12">
          <CardContent className="">
            <img src="/img/banner-doc.png" alt="" />
          </CardContent>
        </div>

        {/* Featured Products */}
        <Card className="w-full">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm nổi bật</h3>
            <ul className="space-y-2">
              {featuredProducts.map((product, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Advertisement */}
        <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
          <CardContent className="p-4 text-center">
            <h3 className="font-bold mb-2">KHUYẾN MÃI</h3>
            <p className="text-sm mb-3">Giảm giá lên đến 30% cho tất cả camera</p>
            <Button size="sm" variant="secondary" className="cursor-pointer">
              Xem ngay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
