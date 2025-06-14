"use client";

import type React from "react";

import {
  Search,
  ShoppingCart,
  User,
  Heart,
  X,
  LogOut,
  UserCircle,
  ChevronDown,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchSuggestions from "@/components/search/SearchSuggestions";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";
import { toSlug } from "@/lib/products";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount: string;
}

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites, removeFromFavorites } = useFavorites();

  // Initialize search query from URL params if on search page
  useEffect(() => {
    const queryFromUrl = searchParams.get("q");
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  const getFavoriteProducts = () => {
    return products.filter((product) => favorites.includes(product.id));
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromFavorites(productId);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit(e as any);
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleLogout = () => {
    router.push("/");
    logout();
    setIsUserMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    console.log("Chuyển đến trang yêu thích");
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    console.log("Chuyển đến trang giỏ hàng");
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalCartItems = getTotalItems();

  const getProductDetailUrl = (product: Product) => {
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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" className="" onClick={() => setIsMenuOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center lg:w-10 lg:h-10">
                <Link href="/">
                  <img src="/img/logo.png" alt="" className="rounded-full" />
                </Link>
              </div>
              <div>
                <Link href="/">
                  <h1 className=" text-xl font-bold text-gray-900 ">TechStore</h1>
                  <p className="hidden lg:block text-xs text-gray-500">Công nghệ cho mọi nhà</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden lg:block flex-1 max-w-xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleInputKeyDown}
                placeholder="Tìm kiếm camera, laptop, thiết bị..."
                className="pl-10 pr-10"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <SearchSuggestions
                query={searchQuery}
                isVisible={showSuggestions}
                onClose={() => setShowSuggestions(false)}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </form>
          </div>

          <div className="flex items-center lg:space-x-4">
            {/* User Authentication */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 lg:px-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.fullName}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden lg:block text-sm font-medium text-gray-900">
                    {user.fullName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-2">
                      <Link href="/ho-so">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCircle className="w-4 h-4 mr-2" />
                          Hồ sơ
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/dang-nhap">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Đăng nhập
                </Button>
              </Link>
            )}

            {/* Wishlist Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex relative cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    setLoginDialogOpen(true); // Hiển thị yêu cầu đăng nhập
                    return;
                  }
                  setIsWishlistOpen(!isWishlistOpen); // Mở danh sách yêu thích nếu đã đăng nhập
                }}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    favorites.length > 0 ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>

              {/* Wishlist Dropdown */}
              {isWishlistOpen && isAuthenticated && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Sản phẩm yêu thích</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsWishlistOpen(false)}
                        className="p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {favorites.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">Chưa có sản phẩm yêu thích</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {getFavoriteProducts().map((product) => (
                          <Link
                            key={product.id}
                            href={getProductDetailUrl(product)}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            onClick={() => setIsWishlistOpen(false)}
                          >
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-red-600 font-semibold">{product.price}₫</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveFromWishlist(product.id);
                              }}
                              className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex relative cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    setLoginDialogOpen(true); // Hiển thị yêu cầu đăng nhập
                    return;
                  }
                  router.push("/gio-hang"); // Chuyển đến trang giỏ hàng nếu đã đăng nhập
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Required Dialog */}
      <LoginRequiredDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLogin={() => {
          setLoginDialogOpen(false);
          router.push("/dang-nhap");
        }}
      />

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setIsMenuOpen(false)}>
          <div
            className={`
              fixed top-0 left-0 w-1/2 h-full bg-white shadow-lg p-4
              transform transition-transform duration-500 ease-in-out
              ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mb-4" onClick={() => setIsMenuOpen(false)}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-2">
              {/* Ô tìm kiếm */}
              <form onSubmit={handleSearchSubmit}>
                <Input
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full"
                />
              </form>
              {/* Nút yêu thích */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex items-center justify-start p-2 relative"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    favorites.length > 0 ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                Yêu thích
                {favorites.length > 0 && (
                  <span className="absolute left-4.5 bottom-5 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
              {/* Nút giỏ hàng */}
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center justify-start p-2 relative"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/gio-hang");
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Giỏ hàng
                {totalCartItems > 0 && (
                  <span className="absolute left-4.5 bottom-5 w-4 h-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
