import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getProductDetailUrl(product: { name: string; category: string }) {
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
}
