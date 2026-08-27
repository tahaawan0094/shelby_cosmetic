import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import FooterSection from '../../components/FooterSection'
import Breadcrumb from '../../components/Breadcrumb'
import ProductGallery from '../../components/ProductGallery'
import ProductReviews from '../../components/ProductReviews'
import ProductCard from '../../components/ProductCard'
import VariantSelector from '../../components/VariantSelector'
import SeoHead, { siteUrl } from '../../components/SeoHead'
import RichText from '../../components/RichText'
import { getImageUrl, getProductBySlug, getProductSlugs, getProducts } from '../../lib/products'
import { useCart } from '../../lib/contexts/CartContext'
import { useWishlist } from '../../lib/contexts/WishlistContext'

export async function getStaticPaths() {
  const products = await getProductSlugs()
  return { paths: products.map(({ slug }) => ({ params: { slug } })), fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return { notFound: true }

  let relatedProducts = []
  try {
    const allProducts = await getProducts()
    const sameCategoryProducts = allProducts.filter(item =>
      item.slug !== product.slug && item.category === product.category
    )
    const otherProducts = allProducts.filter(item =>
      item.slug !== product.slug && item.category !== product.category
    )
    relatedProducts = [...sameCategoryProducts, ...otherProducts].slice(0, 4)
  } catch (error) {
    console.error("Error fetching related products", error)
  }

  return { props: { product, relatedProducts }, revalidate: 60 }
}

export default function ProductPage({ product, relatedProducts }) {
  const router = useRouter()
  const { addToCart, setCheckoutItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)
  const [addedNotify, setAddedNotify] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null)

  const variantImages = product.variants?.flatMap((variant) => variant.images || []) || []
  const selectedProduct = selectedVariant?.images?.length
    ? {
        ...product,
        images: [
          ...selectedVariant.images,
          ...variantImages.filter((image) => !selectedVariant.images.includes(image))
        ],
        selectedVariant: selectedVariant.name
      }
    : product

  const inWishlist = isInWishlist(product.slug)

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity)
    setAddedNotify(true)
    setTimeout(() => setAddedNotify(false), 2000)
  }

  const handleBuyItNow = () => {
    setCheckoutItem({ ...selectedProduct, quantity })
    router.push('/checkout')
  }

  const title = product.metaTitle || `${product.name} | Shelby Cosmetics`
  const description = product.metaDescription || product.seo?.metaDescription || product.shortDescription || `Shop ${product.name} from Shelby Cosmetics.`
  const categoryHref = product.subcategorySlug ? `/collections/${product.subcategorySlug}` : '/products'
  const subcategoryHref = null
  
  const productSchema = { 
    '@context': 'https://schema.org', 
    '@type': 'Product', 
    name: product.name, 
    image: (product.images || []).map(getImageUrl), 
    description, 
    sku: product.sku, 
    offers: { 
      '@type': 'Offer', 
      url: `${siteUrl}/products/${product.slug}`, 
      priceCurrency: 'PKR', 
      price: product.price, 
      availability: product.stockStatus === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' 
    } 
  }
  
  const breadcrumbSchema = { 
    '@context': 'https://schema.org', 
    '@type': 'BreadcrumbList', 
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, 
      ...(product.category ? [{ '@type': 'ListItem', position: 2, name: product.category, item: `${siteUrl}${categoryHref}` }] : []), 
      ...(product.subcategory ? [{ '@type': 'ListItem', position: 3, name: product.subcategory, item: `${siteUrl}${subcategoryHref}` }] : []), 
      { '@type': 'ListItem', position: product.subcategory ? 4 : 3, name: product.name, item: `${siteUrl}/products/${product.slug}` }
    ] 
  }

  const displayPrice = product.price || 0
  const displayOriginalPrice = product.originalPrice || product.price || 0
  const advancePaymentSaving = displayPrice >= 1000 ? 100 : 50
  return (
    <>
      <SeoHead title={title} description={description} image={product.images?.[0]} schema={[productSchema, breadcrumbSchema]} />
      
      <div className="min-h-screen bg-white text-[#1b1b1b]">
        <Navbar solid />
        
        <main className="mx-auto max-w-[1280px] px-3 pb-20 pt-28 sm:px-5 md:px-8 md:pt-32">
          
          <Breadcrumb items={[{ label: product.category || 'Shop', href: categoryHref }, ...(product.subcategory ? [{ label: product.subcategory, href: subcategoryHref }] : []), { label: product.name }]} />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start text-left">
            
            {/* Left Column: Gallery */}
            <div className="w-full lg:sticky lg:top-28">
              <ProductGallery key={selectedVariant?.name || 'default'} product={selectedProduct} />
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col w-full">
              
              <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {product.shortDescription}
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-[#d4a017]" aria-label={`${product.reviews?.length || 0} reviews`}>
                <span aria-hidden="true">★★★★★</span>
                {product.reviews?.length > 0 && <span className="text-neutral-600">{product.reviews.length} reviews</span>}
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-tight text-[#be315b]">
                  Rs. {displayPrice}
                </span>
                {displayOriginalPrice > displayPrice && (
                  <span className="text-lg font-medium text-neutral-400 line-through">
                    Rs. {displayOriginalPrice}
                  </span>
                )}
              </div>

              <VariantSelector variants={product.variants} onVariantChange={setSelectedVariant} />

              <span className="shine-badge mt-3 w-fit rounded-full bg-gradient-to-r from-[#c89211] via-[#f6d365] to-[#b7791f] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.04em] text-[#171717]">
                Limited Time Offer
              </span>

              <div className="mt-6 space-y-3 border-y border-neutral-200/60 py-4 text-sm text-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-400">Vendor:</span>
                  <span className="font-semibold text-neutral-900">{product.vendor || 'Shelby Cosmetics'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-400">Availability:</span>
                  <span className="font-semibold text-emerald-700">{product.availability || 'In Stock'}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-700">Quantity:</span>
                <div className="flex items-center rounded-xl border border-neutral-300 bg-white overflow-hidden shadow-sm">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 text-lg text-neutral-600 transition hover:bg-neutral-100 flex items-center justify-center">−</button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-neutral-200 text-sm font-semibold">{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="h-10 w-10 text-lg text-neutral-600 transition hover:bg-neutral-100 flex items-center justify-center">+</button>
                </div>
              </div>

              <div className="mt-4 flex w-full max-w-sm items-center justify-between px-1 text-sm font-medium text-neutral-700">
                <span className="leading-none">Subtotal:</span>
                <span className="text-base font-bold leading-none text-neutral-900">Rs. {displayPrice * quantity}</span>
              </div>

              <div className="mt-5 grid w-full max-w-xl grid-cols-2 gap-2 sm:gap-3">
                <div className="relative flex min-h-[125px] flex-col items-center justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#8f2349] to-[#be315b] p-1.5 text-center text-white sm:min-h-[160px] sm:rounded-2xl sm:p-3">
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-[#f3d37a] px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-[#6d1e3d] sm:px-3 sm:text-[8px]">Save Rs. {advancePaymentSaving}</span>
                  <p className="mt-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider sm:gap-2 sm:text-[11px]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f3d37a] text-xs text-[#6d1e3d]">✓</span> Online Payment</p>
                  <p className="text-lg font-bold tracking-tight sm:text-xl">Rs. {displayPrice - advancePaymentSaving}</p>
                  <p className="text-[9px] text-white/75 sm:text-[11px]">Instant prepaid discount</p>
                  <p className="border-t border-white/20 pt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#f3d37a]">Recommended</p>
                </div>
                <div className="flex min-h-[125px] flex-col items-center justify-between rounded-xl bg-[#faf7f4] p-1.5 text-center text-[#252126] shadow-sm sm:min-h-[160px] sm:rounded-2xl sm:p-3">
                  <p className="mt-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider sm:gap-2 sm:text-[11px]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#be315b] text-[10px] font-bold text-white">Rs</span> Cash on Delivery</p>
                  <p className="text-lg font-bold tracking-tight text-[#be315b] sm:text-xl">Rs. {displayPrice}</p>
                  <p className="text-[9px] text-neutral-600 sm:text-[11px]">Pay when order arrives</p>
                  <p className="border-t border-[#be315b]/15 pt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Standard Price</p>
                </div>
              </div>

              {/* Action Buttons & Wishlist */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full rounded-xl bg-[#be315b] py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#9f213f] shadow-md text-center"
                  >
                    {addedNotify ? 'Added to cart ✓' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyItNow}
                    className="w-full rounded-xl border border-neutral-300 bg-white py-4 text-xs font-bold uppercase tracking-widest text-neutral-900 transition hover:bg-neutral-50 shadow-sm text-center"
                  >
                    Buy it now
                  </button>
                </div>

                <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                    className="flex h-[52px] w-full sm:w-[52px] items-center justify-center rounded-xl sm:rounded-2xl border border-neutral-300 bg-white text-xl text-[#be315b] transition hover:bg-neutral-50 shadow-sm"
                  >
                    {inWishlist ? '♥' : '♡'}
                  </button>
                  <button type="button" aria-label="Share product" className="flex h-[52px] w-full sm:w-[52px] items-center justify-center rounded-xl sm:rounded-2xl border border-neutral-300 bg-white text-lg text-neutral-600 transition hover:bg-neutral-50 shadow-sm">↗</button>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Section */}
          <section className="mt-20 w-full">
            <div className="flex justify-start gap-8 border-b border-neutral-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 font-serif text-lg font-bold tracking-wide transition-all duration-300 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-[#be315b] text-[#be315b]'
                    : 'text-neutral-400 hover:text-neutral-800'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 font-serif text-lg font-bold tracking-wide transition-all duration-300 ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-[#be315b] text-[#be315b]'
                    : 'text-neutral-400 hover:text-neutral-800'
                }`}
              >
                Shipping & Return
              </button>
            </div>

            <div className="mt-8 max-w-4xl text-sm md:text-base leading-relaxed text-neutral-600 w-full text-left">
              {activeTab === 'description' && (
                <div className="animate-fade-in space-y-4">
                  <RichText value={product.fullDescription} />
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="animate-fade-in space-y-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
                  {product.shippingPolicy ? (
                    <RichText value={product.shippingPolicy} />
                  ) : (
                    <>
                      <p>
                        <strong className="text-neutral-900">Standard Shipping:</strong> Please allow 3-5 business days for standard delivery across Pakistan. Orders are processed within 24 hours of confirmation.
                      </p>
                      <p>
                        <strong className="text-neutral-900">Return Policy:</strong> We offer a hassle-free 7-day return policy. Items must be unused and in their original packaging. Please contact our support team to initiate a return or exchange.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 w-full border-t border-neutral-200/80 pt-16">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                  You may also like
                </h2>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
                {relatedProducts.map((item) => (
                    <div key={item.slug} className="min-w-0">
                      <ProductCard product={item} />
                    </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-20 w-full">
            <ProductReviews reviews={product.reviews} productSlug={product.slug} />
          </div>

        </main>
        
        <FooterSection />
      </div>
    </>
  )
}