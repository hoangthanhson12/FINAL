"use client";

import type React from "react";

import { useState } from "react";
import { Heart, Star, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";
import { useAuth } from "@/contexts/AuthContext";
import { getProductDetailUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  toSlug: (str: string) => string;
}

export default function ProductCard({ product, toSlug }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    toggleFavorite(product.id);

    if (isFavorite(product.id)) {
      toast({
        title: "💔 Đã xóa khỏi yêu thích",
        description: product.name,
        duration: 2000
      });
    } else {
      toast({
        title: "❤️ Đã thêm vào yêu thích",
        description: product.name,
        duration: 2000
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    addToCart(product, 1, false);
    toast({
      title: "✅ Đã thêm vào giỏ hàng",
      description: product.name,
      duration: 3000
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    addToCart(product, 1, true);
    router.push("/gio-hang");
  };

  const handleLogin = () => {
    setShowLoginDialog(false);
    router.push("/dang-nhap");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={getProductDetailUrl(product)}>
        <div className="relative mb-4 cursor-pointer p-2 px-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 cursor-pointer"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
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

      <div className="p-2">
        <Link href={getProductDetailUrl(product)}>
          <h3 className=" font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 min-h-[3rem] transition-colors cursor-pointer lg:font-semibold lg:text-gray-900 lg:mb-2 lg:line-clamp-2 lg:hover:text-orange-500 lg:transition-colors lg:cursor-pointer lg:min-h-[1rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        <div className="mb-4">
          <p className="text-lg font-bold text-red-600">{product.price}₫</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice}₫
            </span>
            <Badge className="hidden lg:bg-red-500">-{product.discount}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-2 w-full lg:flex lg:space-x-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Thêm
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer"
            size="sm"
          >
            Mua ngay
          </Button>
        </div>
      </div>

      <LoginRequiredDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
