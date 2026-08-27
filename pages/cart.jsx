import Link from 'next/link'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import SeoHead from '../components/SeoHead'
import { useCart } from '../lib/contexts/CartContext'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, mounted } = useCart()

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingFee = subtotal > 0 ? 150 : 0
  const total = subtotal + shippingFee

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f5f4f1] text-[#1b1b1b]">
        <Navbar solid />
        <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-32 text-center">
          <p className="text-lg">Loading your cart...</p>
        </main>
      </div>
    )
  }

  return (
    <>
      <SeoHead title="Your Shopping Cart | Shelby Cosmetics" description="View and manage items in your Shelby Cosmetics shopping cart before secure checkout." />
      
      <div className="min-h-screen bg-[#f5f4f1] text-[#1b1b1b]">
        <Navbar solid />
        
        <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-32">
          <h1 className="font-serif text-3xl font-semibold uppercase tracking-wide md:text-4xl text-center mb-12">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 max-w-[500px] mx-auto space-y-6">
              <p className="text-neutral-500 text-base">Your shopping cart is currently empty.</p>
              <Link
                href="/collections/all"
                className="inline-block rounded-xl bg-[#be315b] px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#9f213f] shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr] items-start">
              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.slug}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-neutral-200/60"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <img
                          src={item.images?.[0]?.url || '/placeholder.png'}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <Link href={`/products/${item.slug}`} className="font-semibold text-neutral-800 hover:text-[#be315b] transition-colors line-clamp-1 text-sm">
                          {item.name}
                        </Link>
                        <p className="text-sm text-neutral-500 mt-1">Rs. {item.price}</p>
                        {item.selectedVariant?.name && <p className="text-xs text-[#be315b] mt-1">Shade: {item.selectedVariant.name}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 mt-4 sm:mt-0">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-xl border border-neutral-300 bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="h-8 w-8 text-neutral-600 hover:bg-neutral-100 transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="h-8 w-8 text-neutral-600 hover:bg-neutral-100 transition flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="text-right min-w-[80px]">
                        <p className="font-bold text-neutral-900 text-sm">Rs. {item.price * item.quantity}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.slug)}
                        className="text-neutral-400 hover:text-red-500 transition p-1"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/60 sticky top-28">
                <h2 className="font-serif text-lg font-bold uppercase tracking-wide border-b border-neutral-200 pb-4 mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">Shipping (Calculated at checkout)</span>
                    <span className="font-semibold text-neutral-700">Rs. 300 - 350</span>
                  </div>
                
                  <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-200 pt-4 mt-4">
                    <span>Total Amount</span>
                    <span>Rs. {total}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center rounded-xl bg-[#be315b] py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#9f213f] shadow-md text-center"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/collections/all"
                    className="flex w-full items-center justify-center rounded-xl border border-neutral-300 bg-white py-4 text-xs font-bold uppercase tracking-widest text-neutral-700 transition hover:bg-neutral-50 text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <FooterSection />
      </div>
    </>
  )
}