import { allProducts, type Product } from "./products"

// Function to remove Vietnamese accents
function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
}

// Function to check if any word in the text starts with the search query
function hasWordStartingWith(text: string, query: string): boolean {
  if (!query.trim()) return false

  const words = text.toLowerCase().split(/\s+/)
  const queryLower = query.toLowerCase()
  const queryNoTones = removeVietnameseTones(query)

  return words.some((word) => {
    const wordNoTones = removeVietnameseTones(word)
    return (
      word.startsWith(queryLower) ||
      wordNoTones.startsWith(queryNoTones) ||
      word.startsWith(queryNoTones) ||
      wordNoTones.startsWith(queryLower)
    )
  })
}

export interface SearchFilters {
  category?: string
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  sortBy?: "default" | "price-low" | "price-high" | "rating" | "newest"
}

export function searchProducts(query: string, filters: SearchFilters = {}): Product[] {
  let results = allProducts

  // Filter by search query - only match words that start with the query
  if (query.trim()) {
    results = results.filter((product) => {
      return hasWordStartingWith(product.name, query) || hasWordStartingWith(product.category, query)
    })
  }

  // Filter by category
  if (filters.category && filters.category !== "all") {
    results = results.filter((product) => product.category === filters.category)
  }

  // Filter by price range
  if (filters.priceRange) {
    results = results.filter(
      (product) => product.priceNumber >= filters.priceRange!.min && product.priceNumber <= filters.priceRange!.max,
    )
  }

  // Filter by rating
  if (filters.rating) {
    results = results.filter((product) => product.rating >= filters.rating!)
  }

  // Sort results
  switch (filters.sortBy) {
    case "price-low":
      results.sort((a, b) => a.priceNumber - b.priceNumber)
      break
    case "price-high":
      results.sort((a, b) => b.priceNumber - a.priceNumber)
      break
    case "rating":
      results.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
      results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    default:
      // Keep original order
      break
  }

  return results
}

export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return []

  const suggestions = new Set<string>()

  allProducts.forEach((product) => {
    if (hasWordStartingWith(product.name, query) || hasWordStartingWith(product.category, query)) {
      // Add category suggestions
      suggestions.add(product.category.toLowerCase())

      // Add brand suggestions
      const brands = ["hp", "dell", "lenovo", "asus", "canon", "sony", "logitech", "apple", "samsung"]
      brands.forEach((brand) => {
        if (hasWordStartingWith(product.name, brand)) {
          suggestions.add(`${product.category.toLowerCase()} ${brand}`)
        }
      })
    }
  })

  return Array.from(suggestions).slice(0, 8)
}

export function getPopularSearches(): string[] {
  return [
    "camera 4k",
    "laptop gaming",
    "macbook pro",
    "tai nghe bluetooth",
    "chuột gaming",
    "bàn phím cơ",
    "camera an ninh",
    "laptop dell",
  ]
}
