"use client";

import Image from "next/image";
import { Star, Heart, Eye, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useMemo } from "react";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination";
import { allProducts } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";
import { useAuth } from "@/contexts/AuthContext";

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả sản phẩm");
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const productsPerPage = 8;
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  function toSlug(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, "-") // thay space bằng -
      .toLowerCase();
  }

  // Function to get product detail URL based on category
  const getProductDetailUrl = (product: any) => {
    const productSlug = toSlug(product.name);

    switch (product.category) {
      case "Camera":
        return `/camera/${productSlug}`;
      case "Laptop":
        return `/laptop/${productSlug}`;
      case "Phụ kiện":
        return `/phu-kien/${productSlug}`;
      default:
        return `/product/${productSlug}`;
    }
  };

  const categories = [
    "Tất cả sản phẩm",
    "Camera",
    "Laptop",
    "Phụ kiện",
    "Máy tính để bàn",
    "Thiết bị mạng"
  ];

  const featuredProducts = [
    "Camera HD Pro 4K - Giảm 20%",
    "Dell Gaming G15 - Mới nhất",
    "Lenovo Legion - Gaming",
    "MacBook Air M2 - Hot"
  ];

  const bannerSlides = [
    {
      id: 1,
      title: "Siêu sale công nghệ",
      subtitle: "Giảm giá lên đến 50% cho camera và laptop",
      buttonText: "Mua ngay",
      gradient: "from-blue-600 to-purple-600",
      image: "/img/slider-dientu-Photoroom.jpg"
    },
    {
      id: 2,
      title: "Black Friday 2024",
      subtitle: "Ưu đãi khủng - Giảm đến 70% tất cả sản phẩm",
      buttonText: "Khám phá ngay",
      gradient: "from-red-600 to-pink-600",
      image: "/img/slider-blackfriday.jfif"
    },
    {
      id: 3,
      title: "Laptop Gaming Hot",
      subtitle: "Trải nghiệm gaming đỉnh cao với giá ưu đãi",
      buttonText: "Xem chi tiết",
      gradient: "from-green-600 to-teal-600",
      image: "/img/slider-laptop.jfif"
    },
    {
      id: 4,
      title: "Camera chuyên nghiệp",
      subtitle: "Bắt trọn khoảnh khắc đẹp với camera cao cấp",
      buttonText: "Tìm hiểu thêm",
      gradient: "from-orange-600 to-yellow-600",
      image: "/img/camera-quan-sat-Photoroom.jpg"
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "Tất cả sản phẩm") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setTimeout(() => {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  };

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    addToCart(product, 1);
    toast({
      title: "✅ Đã thêm vào giỏ hàng",
      description: `${product.name}`,
      duration: 3000
    });
  };

  const handleBuyNow = (product: any) => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    addToCart(product, 1);
    router.push("/gio-hang");
  };

  const handleToggleFavorite = (productId: number) => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    toggleFavorite(productId);
    const product = allProducts.find((p) => p.id === productId);

    if (isFavorite(productId)) {
      toast({
        title: "💔 Đã xóa khỏi yêu thích",
        description: `${product?.name}`,
        duration: 2000
      });
    } else {
      toast({
        title: "❤️ Đã thêm vào yêu thích",
        description: `${product?.name}`,
        duration: 2000
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header products={allProducts} />

      {/* Navigation Component */}
      <Navigation categories={categories} />

      <div className=" container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Categories Menu */}
              <div className="pl-12 hidden md:block">
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
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1 cursor-pointer"
                        >
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
                  <Link href="/camera">
                  <Button size="sm" variant="secondary" className="cursor-pointer">
                    Xem ngay
                  </Button>
                  </Link>

                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Banner Slider */}
            <div className="mb-6 relative">
              <div className="relative overflow-hidden rounded-lg h-64">
                {bannerSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                      index === currentSlide
                        ? "translate-x-0"
                        : index < currentSlide
                        ? "-translate-x-full"
                        : "translate-x-full"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${slide.gradient} h-full p-8 text-white flex flex-row justify-between items-center`}
                    >
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                        <p className="text-lg mb-4">{slide.subtitle}</p>
                        <div>
                          <Button size="lg" variant="secondary" className="cursor-pointer">
                            {slide.buttonText}
                          </Button>
                        </div>
                      </div>
                      <div className="">
                        <img
                          src={slide.image || "/img/banner-default.png"}
                          alt={slide.title}
                          className="max-h-1 md:max-h-56 rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors opacity-55 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors opacity-55 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Products Section - Add ID for scroll target */}
            <div id="products-section">
              {/* Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sản phẩm</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Hiển thị {startIndex + 1}-
                    {Math.min(startIndex + productsPerPage, filteredAndSortedProducts.length)} của{" "}
                    {filteredAndSortedProducts.length} sản phẩm
                    {selectedCategory !== "Tất cả sản phẩm" && ` trong "${selectedCategory}"`}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                  >
                    <option value="default">Mặc định</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="newest">Mới nhất</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-shadow duration-300 p-0"
                  >
                    <CardContent className="p-2">
                      <Link href={getProductDetailUrl(product)}>
                        <div className="relative mb-4 cursor-pointer">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-0 right-1 opacity-100 lg:absolute lg:top-2 lg:right-2  lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-8 h-8 p-0 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleToggleFavorite(product.id);
                              }}
                            >
                              <Heart
                                className={`w-4 h-4 transition-colors ${
                                  isFavorite(product.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-600"
                                }`}
                              />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-8 h-8 p-0 cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Link>

                      <Link href={`/${toSlug(product.category)}`}>
                        <Badge
                          variant="outline"
                          className="mb-2  hover:bg-gray-100 transition cursor-pointer"
                        >
                          {product.category}
                        </Badge>
                      </Link>

                      <Link href={getProductDetailUrl(product)}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer min-h-[3rem] lg:font-semibold lg:text-gray-900 lg:mb-2 lg:line-clamp-2 lg:hover:text-orange-500 lg:transition-colors lg:cursor-pointer lg:min-h-[1rem]">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-lg font-bold text-red-600">{product.price}₫</p>
                        <div className="lg:flex lg:items-center lg:space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}₫
                          </span>
                          <Badge className="hidden lg:bg-red-500 lg:block">-{product.discount}</Badge>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-2 pt-0">
                      <div className="grid grid-cols-1 gap-y-2 w-full lg:grid lg:grid-cols-2 lg:gap-2 lg:w-full">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          variant="outline"
                          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Thêm
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBuyNow(product);
                          }}
                          className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
                          size="sm"
                        >
                          Mua ngay
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />

      {/* Login Required Dialog */}
      <LoginRequiredDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLogin={() => {
          setLoginDialogOpen(false);
          router.push("/dang-nhap"); // Chuyển đến trang đăng nhập
        }}
      />
    </div>
  );
}
