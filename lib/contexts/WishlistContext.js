import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const [mounted, setMounted] = useState(false)
  const isInitialLoad = useRef(true)

  const userEmail = user?.email ? user.email.toLowerCase().trim() : null
  const storageKey = userEmail ? `shelby_wishlist_${userEmail}` : 'shelby_wishlist_guest'

  // Load wishlist when user changes or component mounts
  useEffect(() => {
    isInitialLoad.current = true
    let items = []

    // 1. Try to load from email-specific localStorage
    const savedWishlist = localStorage.getItem(storageKey)
    if (savedWishlist) {
      try {
        items = JSON.parse(savedWishlist)
      } catch (e) {
        console.error('Failed to parse local wishlist data', e)
      }
    } else if (user?.wishlist && Array.isArray(user.wishlist) && user.wishlist.length > 0) {
      // 2. Fallback to DB wishlist if available in user object
      items = user.wishlist
    }

    setWishlistItems(items)
    setMounted(true)

    setTimeout(() => {
      isInitialLoad.current = false
    }, 50)
  }, [userEmail])

  // Sync wishlist to email-specific localStorage & MongoDB backend
  useEffect(() => {
    if (mounted && !isInitialLoad.current) {
      localStorage.setItem(storageKey, JSON.stringify(wishlistItems))

      // Sync to MongoDB database if user is logged in
      if (userEmail) {
        fetch('/api/user/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, wishlist: wishlistItems }),
        }).catch((err) => console.error('Error syncing wishlist to backend:', err))
      }
    }
  }, [wishlistItems, storageKey, mounted, userEmail])

  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.slug === product.slug)
      if (exists) {
        return prevItems.filter((item) => item.slug !== product.slug)
      }
      return [...prevItems, product]
    })
  }

  const isInWishlist = (slug) => {
    return wishlistItems.some((item) => item.slug === slug)
  }

  const removeFromWishlist = (slug) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.slug !== slug))
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        mounted
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    return {
      wishlistItems: [],
      toggleWishlist: () => {},
      isInWishlist: () => false,
      removeFromWishlist: () => {},
      mounted: false,
    }
  }
  return context
}
