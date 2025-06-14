"use client"

import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavigationProps {
  categories: string[]
}

export default function Navigation({ categories }: NavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="hidden lg:block bg-blue-600 text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 h-12">
          <div className="relative hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Menu className="w-4 h-4 mr-2" />
              Danh mục
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border z-50">
                <div className="py-2">
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex space-x-6  ml-auto mr-auto gap-10 ">
            <a href="/" className="hover:text-blue-200 transition-colors cursor-pointer p-6">
              Trang chủ
            </a>
            <a href="/camera" className="hover:text-blue-200 transition-colors cursor-pointer p-6">
              Camera
            </a>
            <a href="/laptop" className="hover:text-blue-200 transition-colors cursor-pointer p-6">
              Laptop
            </a>
            <a href="/phu-kien" className="hover:text-blue-200 transition-colors cursor-pointer p-6">
              Phụ kiện
            </a>
            <a href="/khuyen-mai" className="hover:text-blue-200 transition-colors cursor-pointer p-6">
              Khuyến mãi
            </a>
            <a href="/lien-he" className="hover:text-blue-200 transition-colors cursor-pointer p-6">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
