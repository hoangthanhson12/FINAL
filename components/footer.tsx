import { Button } from "@/components/ui/button"
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div>
            <h3 className="font-bold text-lg mb-4">TechStore</h3>
            <p className="text-gray-400 text-sm mb-4">
              Chuyên cung cấp camera, máy tính và thiết bị công nghệ chất lượng cao
            </p>
            <div className="text-sm text-gray-400">
              <div className="flex gap-1.5 pb-3">
                <p>📌</p>
                <p>141 Đường Chiến Thắng - Tân Triều - Thanh Trì - Hà nội</p>
              </div>
              <div className="flex gap-2 pb-3">
                <p>📞</p>
                <p>0123 456 789</p>
              </div>
              <div className="flex gap-2">
                <p>✉️</p>
                <p>techstore@gmail.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 pb-1">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Camera
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Laptop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Máy tính
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Phụ kiện
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 pb-1">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white inline-block pb-1 cursor-pointer">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex space-x-4 mb-5">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center cursor-pointer rounded-full hover:opacity-60 transition-opacity"
                >
                  <FaFacebookF className="w-5 h-5" color="#1877f3" />
                </Button>
              </a>
              <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center cursor-pointer rounded-full hover:opacity-60 transition-opacity"
                >
                  <FaInstagram className="w-5 h-5" color="#E1306C" />
                </Button>
              </a>
              <a
                href="https://tiktok.com/@yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center cursor-pointer rounded-full hover:opacity-60 transition-opacity"
                >
                  <FaTiktok className="w-5 h-5" color="#000" />
                </Button>
              </a>
            </div>
            <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
              <iframe
                title="TechStore Location"
                src="https://www.google.com/maps?q=141+Đường+Chiến+Thắng,+Tân+Triều,+Thanh+Trì,+Hà+Nội&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TechStore. Bản quyền thuộc về TechStore.</p>
        </div>
      </div>
    </footer>
  )
}
