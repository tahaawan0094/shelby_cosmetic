import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [checkoutItem, setCheckoutItem] = useState(null) // For Buy It Now single product transient flow
  const [mounted, setMounted] = useState(false)
  const isInitialLoad = useRef(true)

  const userEmail = user?.email ? user.email.toLowerCase().trim() : null
  const storageKey = userEmail ? `shelby_cart_${userEmail}` : 'shelby_cart_guest'

  // Load cart when user changes or component mounts
  useEffect(() => {
    isInitialLoad.current = true
    let items = []
    
    // 1. Try to load from email-specific localStorage
    const savedCart = localStorage.getItem(storageKey)
    if (savedCart) {
      try {
        items = JSON.parse(savedCart)
      } catch (e) {
        console.error('Failed to parse local cart data', e)
      }
    } else if (user?.cart && Array.isArray(user.cart) && user.cart.length > 0) {
      // 2. Fallback to DB cart if available in user object
      items = user.cart
    }

    setCartItems(items)
    setMounted(true)

    // Allow changes to be saved after initial load finishes
    setTimeout(() => {
      isInitialLoad.current = false
    }, 50)
  }, [userEmail])

  // Sync cart to email-specific localStorage & MongoDB backend
  useEffect(() => {
    if (mounted && !isInitialLoad.current) {
      localStorage.setItem(storageKey, JSON.stringify(cartItems))

      // Sync to MongoDB database if user is logged in
      if (userEmail) {
        fetch('/api/user/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, cart: cartItems }),
        }).catch((err) => console.error('Error syncing cart to backend:', err))
      }
    }
  }, [cartItems, storageKey, mounted, userEmail])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.slug === product.slug)
      if (existingItem) {
        return prevItems.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (slug) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.slug !== slug))
  }

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      removeFromCart(slug)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(storageKey)
    if (userEmail) {
      fetch('/api/user/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, cart: [] }),
      }).catch((err) => console.error('Error clearing cart in backend:', err))
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkoutItem,
        setCheckoutItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        mounted
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
