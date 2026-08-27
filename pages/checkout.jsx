import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import SeoHead from '../components/SeoHead'
import { useCart } from '../lib/contexts/CartContext'
import { useAuth } from '../lib/contexts/AuthContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, checkoutItem, setCheckoutItem, clearCart, mounted } = useCart()
  const { user } = useAuth()

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Karachi', // default city
  })

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }))
    }
  }, [user])
  
  const [paymentMethod, setPaymentMethod] = useState('ONLINE')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const checkoutList = checkoutItem ? [checkoutItem] : cartItems
  const subtotal = checkoutList.reduce((acc, item) => acc + item.price * item.quantity, 0)
  
  const isKarachi = formData.city.trim().toLowerCase() === 'karachi'
  const shippingFee = subtotal > 0 ? (isKarachi ? 300 : 350) : 0

  const isOnlinePayment = paymentMethod === 'ONLINE'
  const discount = isOnlinePayment ? Math.round(subtotal * 0.05) : 0
  const total = Math.max(0, subtotal - discount + shippingFee)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      setErrorMsg('Please fill in all shipping fields.')
      setIsSubmitting(false)
      return
    }

    try {
      const orderData = {
        customerDetails: formData,
        items: checkoutList.map(item => ({
          name: item.name,
          slug: item.slug,
          price: item.price,
          quantity: item.quantity,
          variant: item.selectedVariant || null
        })),
        subtotal,
        discount,
        shippingFee,
        total,
        paymentMethod: isOnlinePayment ? 'Online / Advance Payment' : 'COD'
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      const contentType = res.headers.get('content-type')
      let data
      if (contentType && contentType.includes('application/json')) {
        data = await res.json()
      } else {
        throw new Error('Server error: Please try again later.')
      }

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong while placing your order.')
      }

      const rawOrderId = data.orderId || (data.order && data.order._id) || ''
      const orderIdStr = rawOrderId ? rawOrderId.toString() : ''
      const shortId = orderIdStr ? `#ORD-${orderIdStr.slice(-8).toUpperCase()}` : ''
      const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923000000000'
      const cleanNumber = rawNumber.replace(/[^0-9]/g, '')
      const itemsList = checkoutList
        .map(item => `• ${item.name}${item.selectedVariant?.name ? ` (${item.selectedVariant.name})` : ''} x${item.quantity} = Rs. ${item.price * item.quantity}`)
        .join('\n')

      if (isOnlinePayment) {
        // Online/Advance: Full payment via WhatsApp (with 5% discount)
        const templateMsg = [
          `🌸 *Shelby Cosmetics — Online Payment Request*`,
          ``,
          `*Order ID:* ${shortId}`,
          ``,
          `Hello! I would like to pay my order in full (Online / Advance).`,
          ``,
          `*Items:*`,
          itemsList,
          ``,
          `*Subtotal:* Rs. ${subtotal}`,
          discount > 0 ? `*5% Advance Discount:* - Rs. ${discount}` : null,
          `*Delivery Charges:* Rs. ${shippingFee}`,
          `*Grand Total (Full Payment):* Rs. ${total}`,
          ``,
          `Kindly share the payment method & account details. 🙏`
        ].filter(line => line !== null).join('\n')

        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(templateMsg)}`, '_blank')
        clearCart()
        setCheckoutItem(null)
        router.push(`/thank-you?orderId=${orderIdStr}`)

      } else {
        // COD: Product paid on delivery, BUT delivery charges MUST be paid in advance
        const codMsg = [
          `📦 *Shelby Cosmetics — COD Delivery Charges (Advance)*`,
          ``,
          `*Order ID:* ${shortId}`,
          ``,
          `Hello! I placed a Cash on Delivery order and need to pay the delivery charges in advance.`,
          ``,
          `*Items:*`,
          itemsList,
          ``,
          `*Product Total (COD - paid on delivery):* Rs. ${subtotal}`,
          `*Delivery Charges (Advance Required):* Rs. ${shippingFee}`,
          ``,
          `Kindly share your account details to pay the Rs. ${shippingFee} delivery fee. 🙏`
        ].join('\n')

        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(codMsg)}`, '_blank')
        clearCart()
        setCheckoutItem(null)
        router.push(`/thank-you?orderId=${orderIdStr}`)
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar solid />
        <main className="flex items-center justify-center min-h-[60vh] pt-32">
          <div className="w-8 h-8 border-4 border-[#be315b] border-t-transparent rounded-full animate-spin"></div>
        </main>
      </div>
    )
  }

  if (checkoutList.length === 0) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Navbar solid />
        <main className="flex-grow flex items-center justify-center px-6 pt-32">
          <div className="text-center max-w-md mx-auto space-y-6 py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="font-serif text-2xl font-medium text-gray-900">Your cart is empty</h1>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/collections/all"
              className="inline-block rounded-md bg-[#be315b] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#9f213f]"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <FooterSection />
      </div>
    )
  }

  return (
    <>
      <SeoHead title="Secure Checkout | Shelby Cosmetics" description="Complete your luxury cosmetic order securely." />

      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar solid />

        {/* TOP PADDING FIXED HERE (pt-28 lg:pt-32) to prevent navbar overlap */}
        <main className="max-w-[1280px] mx-auto grid lg:grid-cols-12 min-h-screen pt-28 lg:pt-32">
          
          {/* LEFT COLUMN - FORMS */}
          <div className="lg:col-span-7 px-6 pb-24 lg:pr-12 xl:pr-16 lg:border-r border-gray-200">
            <h1 className="font-serif text-3xl font-semibold mb-8 text-gray-900 tracking-wide">Checkout</h1>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-700 font-medium">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Delivery Notice */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Advance Delivery Charges</h3>
                  <p className="text-blue-800/80 leading-relaxed text-xs sm:text-sm">
                    A standard delivery fee (<strong>Rs. 300 for Karachi</strong> / <strong>Rs. 350 nationwide</strong>) is required in advance for all orders. For COD, product total is paid at doorstep.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <section>
                <h2 className="font-serif text-xl text-gray-900 mb-4">Contact Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Email Address"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#be315b] focus:ring-[#be315b] text-sm py-3 px-4 border placeholder-gray-400 outline-none transition-shadow"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="WhatsApp / Phone Number"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#be315b] focus:ring-[#be315b] text-sm py-3 px-4 border placeholder-gray-400 outline-none transition-shadow"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Information */}
              <section>
                <h2 className="font-serif text-xl text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Full Name"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#be315b] focus:ring-[#be315b] text-sm py-3 px-4 border placeholder-gray-400 outline-none transition-shadow"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      placeholder="House/Apartment number, Street details, Area"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#be315b] focus:ring-[#be315b] text-sm py-3 px-4 border placeholder-gray-400 outline-none transition-shadow resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2 relative">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="City"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#be315b] focus:ring-[#be315b] text-sm py-3 px-4 border placeholder-gray-400 outline-none transition-shadow"
                    />
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      {isKarachi ? '✓ Karachi delivery rate active' : '✓ Nationwide delivery rate active'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Methods */}
              <section>
                <h2 className="font-serif text-xl text-gray-900 mb-4">Payment Method</h2>
                <div className="grid gap-3">
                  
                  {/* Online Payment Card */}
                  <div 
                    onClick={() => setPaymentMethod('ONLINE')}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${
                      paymentMethod === 'ONLINE' ? 'border-[#be315b] bg-[#be315b]/5 ring-1 ring-[#be315b]' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            Online / Advance Payment
                            <span className="bg-[#be315b] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                              5% OFF
                            </span>
                          </div>
                          <p className={`mt-1 text-xs ${paymentMethod === 'ONLINE' ? 'text-[#be315b]' : 'text-gray-500'}`}>
                            Account details will be shared via WhatsApp.
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0 ${paymentMethod === 'ONLINE' ? 'text-[#be315b]' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* COD Card */}
                  <div 
                    onClick={() => setPaymentMethod('COD')}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${
                      paymentMethod === 'COD' ? 'border-[#be315b] bg-[#be315b]/5 ring-1 ring-[#be315b]' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">Cash on Delivery (COD)</p>
                          <p className={`mt-1 text-xs ${paymentMethod === 'COD' ? 'text-[#be315b]' : 'text-gray-500'}`}>
                            Pay cash when your order arrives.
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0 ${paymentMethod === 'COD' ? 'text-[#be315b]' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Mobile Submit Button */}
              <div className="lg:hidden pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-[#be315b] py-4 text-sm font-medium text-white shadow-sm hover:bg-[#9f213f] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {isOnlinePayment ? 'Pay securely via WhatsApp' : 'Complete Order'}
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="lg:col-span-5 bg-[#faf9f8] px-6 py-10 lg:pl-12 lg:pr-6 xl:pr-10 border-t lg:border-t-0 border-gray-200">
            <div className="lg:sticky lg:top-32 space-y-6">
              
              <h2 className="font-serif text-xl text-gray-900 mb-6 hidden lg:block">Order Summary</h2>

              {/* Product List */}
              <div className="space-y-4">
                {checkoutList.map((item) => (
                  <div key={item.slug} className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                        <img
                          src={item.images?.[0]?.url || '/placeholder.png'}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-[11px] font-medium text-white shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                        {item.selectedVariant?.name && <p className="mt-1 flex items-center gap-1.5 text-xs text-[#be315b]"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.selectedVariant.value }} />Shade: {item.selectedVariant.name}</p>}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Rs. {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">Rs. {subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Advance Discount (5%)
                    </span>
                    <span className="font-medium">- Rs. {discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">Rs. {shippingFee}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-xl font-semibold text-gray-900">
                  <span className="text-xs text-gray-500 font-normal mr-1">PKR</span>
                  Rs. {total}
                </span>
              </div>

              {/* Desktop Submit Button */}
              <button
                onClick={(e) => handleSubmit(e)}
                disabled={isSubmitting}
                className="hidden lg:flex w-full mt-8 rounded-md bg-[#be315b] py-4 text-sm font-medium text-white shadow-sm hover:bg-[#9f213f] disabled:bg-gray-300 disabled:cursor-not-allowed items-center justify-center gap-2 transition-colors"
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {isOnlinePayment ? 'Pay securely via WhatsApp' : 'Complete Order'}
                  </>
                )}
              </button>

            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}