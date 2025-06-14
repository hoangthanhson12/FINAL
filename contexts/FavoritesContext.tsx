"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"

interface FavoritesContextType {
  favorites: number[]
  addToFavorites: (productId: number) => void
  removeFromFavorites: (productId: number) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])
  const { user, isAuthenticated } = useAuth()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Function to get favorites key based on user
  const getFavoritesKey = (userId?: string | null) => {
    return userId ? `favorites_user_${userId}` : "favorites_guest"
  }

  // Function to load favorites from localStorage
  const loadFavorites = (userId?: string | null) => {
    const favoritesKey = getFavoritesKey(userId)
    const savedFavorites = localStorage.getItem(favoritesKey)
    if (savedFavorites) {
      try {
        return JSON.parse(savedFavorites)
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error)
        return []
      }
    }
    return []
  }

  // Function to save favorites to localStorage
  const saveFavorites = (favoritesList: number[], userId?: string | null) => {
    const favoritesKey = getFavoritesKey(userId)
    localStorage.setItem(favoritesKey, JSON.stringify(favoritesList))
  }

  // Load favorites when component mounts or user changes
  useEffect(() => {
    const userId = user?.id || null

    // If user changed, save current favorites to old user and load new user's favorites
    if (currentUserId !== userId) {
      // Save current favorites to previous user (if any)
      if (currentUserId !== null) {
        saveFavorites(favorites, currentUserId)
      }

      // Load favorites for new user
      const newFavorites = loadFavorites(userId)
      setFavorites(newFavorites)
      setCurrentUserId(userId)
    }
  }, [user?.id, isAuthenticated])

  // Save favorites whenever they change
  useEffect(() => {
    if (currentUserId !== null || !isAuthenticated) {
      saveFavorites(favorites, currentUserId)
    }
  }, [favorites, currentUserId, isAuthenticated])

  // Clear favorites when user logs out
  useEffect(() => {
    if (!isAuthenticated && currentUserId !== null) {
      // User just logged out, but keep guest favorites
      const guestFavorites = loadFavorites(null)
      setFavorites(guestFavorites)
      setCurrentUserId(null)
    }
  }, [isAuthenticated, currentUserId])

  const addToFavorites = (productId: number) => {
    setFavorites((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId]
      }
      return prev
    })
  }

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const isFavorite = (productId: number) => {
    return favorites.includes(productId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
