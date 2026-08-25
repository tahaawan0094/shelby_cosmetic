import '../styles/globals.css'
import { AuthProvider } from '../lib/contexts/AuthContext'
import { WishlistProvider } from '../lib/contexts/WishlistContext'
import { CartProvider } from '../lib/contexts/CartContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
