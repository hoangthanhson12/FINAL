
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/products"
import { useAuth } from "@/contexts/AuthContext"

export interface CartItem {
  id: number
  product: Product
  quantity: number
  selected: boolean
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number, autoSelect?: boolean) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  toggleSelection: (productId: number) => void
  selectAll: (selected: boolean) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSelectedItems: () => CartItem[]
  getSelectedTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { user, isAuthenticated } = useAuth()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Function to get cart key based on user
  const getCartKey = (userId?: string | null) => {
    return userId ? `cart_user_${userId}` : "cart_guest"
  }

  // Function to load cart from localStorage
  const loadCart = (userId?: string | null) => {
    const cartKey = getCartKey(userId)
    const savedCart = localStorage.getItem(cartKey)
    if (savedCart) {
      try {
        return JSON.parse(savedCart)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
        return []
      }
    }
    return []
  }

  // Function to save cart to localStorage
  const saveCart = (cartItems: CartItem[], userId?: string | null) => {
    const cartKey = getCartKey(userId)
    localStorage.setItem(cartKey, JSON.stringify(cartItems))
  }

  // Function to clear cart from localStorage
  const clearCartStorage = (userId?: string | null) => {
    const cartKey = getCartKey(userId)
    localStorage.removeItem(cartKey)
  }

  // Load cart when component mounts or user changes
  useEffect(() => {
    const userId = user?.id || null

    // If user changed, save current cart to old user and load new user's cart
    if (currentUserId !== userId) {
      // Save current cart to previous user (if any)
      if (currentUserId !== null) {
        saveCart(items, currentUserId)
      }

      // Load cart for new user
      const newCart = loadCart(userId)
      setItems(newCart)
      setCurrentUserId(userId)
    }
  }, [user?.id, isAuthenticated])

  // Save cart whenever items change (but only if we have a stable user state)
  useEffect(() => {
    if (currentUserId !== null || !isAuthenticated) {
      saveCart(items, currentUserId)
    }
  }, [items, currentUserId, isAuthenticated])

  // Clear cart when user logs out
  useEffect(() => {
    if (!isAuthenticated && currentUserId !== null) {
      // User just logged out, clear the cart
      setItems([])
      setCurrentUserId(null)
    }
  }, [isAuthenticated, currentUserId])

  const addToCart = (product: Product, quantity = 1, autoSelect = false) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                selected: autoSelect ? true : item.selected,
              }
            : autoSelect
              ? { ...item, selected: false }
              : item,
        )
      } else {
        const newItem = {
          id: product.id,
          product,
          quantity,
          selected: autoSelect || prevItems.length === 0,
        }

        if (autoSelect) {
          return [...prevItems.map((item) => ({ ...item, selected: false })), newItem]
        } else {
          return [...prevItems, newItem]
        }
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const toggleSelection = (productId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, selected: !item.selected } : item)),
    )
  }

  const selectAll = (selected: boolean) => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected })))
  }

  const clearCart = () => {
    setItems([])
    // Also clear from localStorage
    clearCartStorage(currentUserId)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.product.priceNumber * item.quantity
    }, 0)
  }

  const getSelectedItems = () => {
    return items.filter((item) => item.selected)
  }

  const getSelectedTotalPrice = () => {
    return items
      .filter((item) => item.selected)
      .reduce((total, item) => {
        return total + item.product.priceNumber * item.quantity
      }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelection,
        selectAll,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getSelectedItems,
        getSelectedTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
