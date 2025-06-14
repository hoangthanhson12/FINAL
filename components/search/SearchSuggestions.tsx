"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, TrendingUp } from "lucide-react";
import { allProducts, toSlug } from "@/lib/products";

// Function to remove Vietnamese accents
function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

// Function to check if any word in the text starts with the search query
function hasWordStartingWith(text: string, query: string): boolean {
  if (!query.trim()) return false;

  const words = text.toLowerCase().split(/\s+/);
  const queryLower = query.toLowerCase();
  const queryNoTones = removeVietnameseTones(query);

  return words.some((word) => {
    const wordNoTones = removeVietnameseTones(word);
    return (
      word.startsWith(queryLower) ||
      wordNoTones.startsWith(queryNoTones) ||
      word.startsWith(queryNoTones) ||
      wordNoTones.startsWith(queryLower)
    );
  });
}

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  onClose: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

export default function SearchSuggestions({
  query,
  isVisible,
  onClose,
  onSelectSuggestion
}: SearchSuggestionsProps) {

  // Filter products based on query - only match words that start with the query
  const getSearchSuggestions = () => {
    if (!query.trim()) return [];

    return allProducts
      .filter((product) => {
        return (
          hasWordStartingWith(product.name, query) || hasWordStartingWith(product.category, query)
        );
      })
      .slice(0, 3);
  };

  // Generate keyword suggestions - only for words that start with the query
  const getKeywordSuggestions = () => {
    if (!query.trim()) return [];

    const suggestions = new Set<string>();

    // Add category-based suggestions
    allProducts.forEach((product) => {
      if (
        hasWordStartingWith(product.name, query) ||
        hasWordStartingWith(product.category, query)
      ) {
        // Extract meaningful keywords that start with the query
        const words = product.name.toLowerCase().split(/\s+/);
        words.forEach((word) => {
          if (word.length > 2 && hasWordStartingWith(word, query)) {
            suggestions.add(word);
          }
        });

        // Add category + brand combinations
        const brands = ["hp", "dell", "lenovo", "asus", "canon", "sony", "logitech"];
        brands.forEach((brand) => {
          if (hasWordStartingWith(product.name, brand) || hasWordStartingWith(brand, query)) {
            suggestions.add(`${product.category.toLowerCase()} ${brand}`);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 5);
  };

  const productSuggestions = getSearchSuggestions();
  const keywordSuggestions = getKeywordSuggestions();

  // Handle click on suggestion (not keyboard navigation)
  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
  };

  // Add validation for query
  const shouldShow = isVisible && query.trim().length > 0;

  if (!shouldShow) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-4">
        {/* Keyword Suggestions */}
        {query.trim() && keywordSuggestions.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Gợi ý tìm kiếm</span>
            </div>
            <div className="space-y-1">
              {keywordSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Suggestions */}
        {productSuggestions.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Sản phẩm đề xuất</span>
            </div>
            <div className="space-y-3">
              {productSuggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/${toSlug(product.category)}/${toSlug(product.name)}`}
                  onClick={onClose}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-red-600 font-semibold">{product.price}₫</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No suggestions */}
        {query.trim() && keywordSuggestions.length === 0 && productSuggestions.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">Không tìm thấy gợi ý nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
