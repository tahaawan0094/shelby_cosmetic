import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import SeoHead from '../components/SeoHead'
import { useCart } from '../lib/contexts/CartContext'

export default function ThankYouPage() {
  const router = useRouter()
  const { orderId } = router.query
  const { clearCart, setCheckoutItem } = useCart()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Automatically clear cart when arriving at the thank you page
    clearCart()
    setCheckoutItem(null)
  }, [])

  useEffect(() => {
    if (!orderId) return

    setLoading(true)
    fetch(`/api/orders?id=${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Order not found')
        return res.json()
      })
      .then((data) => {
        setOrder(data.order)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [orderId])

  return (
    <>
      <SeoHead
        title="Thank You for your Order! | Shelby Cosmetics"
        description="Your order at Shelby Cosmetics has been successfully placed."
      />

      <div className="min-h-screen bg-[#f5f4f1] text-[#1b1b1b]">
        <Navbar solid />

        <main className="mx-auto max-w-[680px] px-6 pb-24 pt-36">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-10">
            <div className="mx-auto h-16 w-16 bg-[#be315b]/10 rounded-full flex items-center justify-center text-[#be315b]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#be315b]">
                Order Confirmed
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-wide uppercase">
                Thank You For Your Order
              </h1>
              <p className="text-neutral-500 text-sm max-w-md mx-auto">
                We have received your order and are getting it ready for shipment. We appreciate you shopping with Shelby Cosmetics.
              </p>
            </div>
          </div>

          {/* Receipt / Order Info Section */}
          <div className="space-y-8">
            {loading ? (
              <div className="py-16 text-center text-neutral-400 text-sm tracking-wide">
                Loading order details...
              </div>
            ) : order ? (
              <div className="space-y-8 text-left bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
                {/* Meta details grid */}
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-200 text-sm">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Order Reference
                    </span>
                    <span className="font-mono text-neutral-900 text-xs font-bold">
                      #ORD-{order._id.toString().slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Payment Type
                    </span>
                    <span className="text-neutral-800 text-xs font-medium">
                      {order.paymentMethod === 'COD'
                        ? 'Cash on Delivery (COD)'
                        : 'Online / Advance Payment'}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">
                    Ordered Items
                  </h3>
                  <div className="space-y-4">
                    {(order.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-sm py-2 border-b border-neutral-100 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-800 font-medium">{item.name}</span>
                          <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-600 font-semibold">
                            ×{item.quantity}
                          </span>
                        </div>
                        <span className="font-semibold text-neutral-900">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info & Totals */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                  <div className="space-y-1.5 text-sm">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Delivery Address
                    </h3>
                    <p className="font-semibold text-neutral-800">
                      {order.customerDetails?.name}
                    </p>
                    <p className="text-neutral-600 text-xs">
                      {order.customerDetails?.phone}
                    </p>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {order.customerDetails?.address}, {order.customerDetails?.city}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm pt-2 md:pt-0">
                    <div className="flex justify-between text-neutral-500 text-xs">
                      <span>Subtotal</span>
                      <span className="font-medium text-neutral-800">Rs. {order.subtotal}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-emerald-700 text-xs font-medium">
                        <span>5% Online Discount</span>
                        <span>- Rs. {order.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-500 text-xs">
                      <span>Shipping Fee</span>
                      <span className="font-medium text-neutral-800">Rs. {order.shippingFee}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                      <span>Total Amount</span>
                      <span>Rs. {order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 px-6 bg-white text-neutral-800 rounded-2xl border border-neutral-200 text-sm text-left shadow-sm">
                Your order reference <strong className="font-mono">{orderId}</strong> has been successfully placed.
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4 text-center">
              <Link
                href="/collections/all"
                className="inline-block rounded-xl bg-[#be315b] px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#9f213f] shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}