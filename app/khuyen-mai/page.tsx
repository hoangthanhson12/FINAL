"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { allProducts } from "@/lib/products";
import Navigation from "@/components/navigation"; 
export default function PromotionPage() {
    const categories = ["Tất cả sản phẩm", "Camera", "Laptop", "Phụ kiện"];
  const promotions = [
    {
      title: "Giảm giá 50% cho tất cả sản phẩm Camera",
      description: "Nhanh tay sở hữu những sản phẩm chất lượng với giá cực ưu đãi.",
      image: "/slider/1.png",
      link: "/camera"
    },
    {
      title: "Mua Laptop tặng kèm Phụ kiện",
      description: "Chương trình áp dụng cho các dòng laptop mới nhất.",
      image: "/slider/5.png",
      link: "/laptop"
    },
    {
      title: "Giảm giá 30% cho đơn hàng trên 5 triệu",
      description: "Áp dụng cho tất cả sản phẩm trong cửa hàng.",
      image: "/slider/9.png",
      link: "/phu-kien"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header products={allProducts}/>
                  <Navigation categories={categories} />
      <div className="container mx-auto px-4 py-8">
                        <div className="mb-6">
                    <nav className="text-sm text-gray-600">
                        <a href="/" className="hover:text-blue-600 cursor-pointer">
                            Trang chủ
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Khuyến mãi</span>
                    </nav>
                </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">Khuyến Mãi</h1>
        <p className="text-center text-gray-600 mb-8">
          Đừng bỏ lỡ những chương trình khuyến mãi hấp dẫn nhất của chúng tôi. Nhanh tay chọn sản
          phẩm yêu thích!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={promo.image} alt={promo.title} className=" w-full h-auto object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{promo.title}</h2>
                <p className="text-gray-600 mb-4 min-h-[3rem]">{promo.description}</p>
                <a
                  href={promo.link}
                  className="inline-block bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
