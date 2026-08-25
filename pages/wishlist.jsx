import Link from 'next/link'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import SeoHead from '../components/SeoHead'
import { useWishlist } from '../lib/contexts/WishlistContext'
import { useCart } from '../lib/contexts/CartContext'

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist, mounted } = useWishlist()
  const { addToCart } = useCart()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f5f4f1] text-[#1b1b1b]">
        <Navbar solid />
        <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-32 text-center">
          <p className="text-lg">Loading your wishlist...</p>
        </main>
      </div>
    )
  }

  return (
    <>
      <SeoHead title="Your Wishlist | Shelby Cosmetics" description="View and manage products saved in your wishlist at Shelby Cosmetics." />
      
      <div className="min-h-screen bg-[#f5f4f1] text-[#1b1b1b]">
        <Navbar solid />
        
        <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-32">
          <h1 className="font-serif text-3xl font-semibold uppercase tracking-wide md:text-4xl text-center mb-12">
            My Wishlist
          </h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 max-w-[500px] mx-auto space-y-6">
              <p className="text-neutral-500 text-base">Your wishlist is currently empty.</p>
              <Link
                href="/collections/all"
                className="inline-block rounded-xl bg-[#be315b] px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#9f213f] shadow-md"
              >
                Discover Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-neutral-200/60 flex flex-col h-full text-left"
                >
                  <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
                    <img
                      src={item.images?.[0]?.url || '/placeholder.png'}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#be315b] shadow-sm hover:scale-105 transition"
                      aria-label="Remove from wishlist"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <Link href={`/products/${item.slug}`} className="font-semibold text-neutral-800 text-sm hover:text-[#be315b] transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </Link>
                      <p className="text-neutral-900 font-bold text-sm mt-2">Rs. {item.price}</p>
                    </div>
                    
                    <div className="mt-4 pt-2">
                      <button
                        type="button"
                        onClick={() => addToCart(item, 1)}
                        className="w-full rounded-xl bg-[#be315b] py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-[#9f213f] shadow-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        <FooterSection />
      </div>
    </>
  )
}