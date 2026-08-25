import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '../lib/products'
import { useState } from 'react'

export default function PurchaseSection({ products = [] }) {
  const cards = products.slice(0, 4)
  const [hoveredProductSlug, setHoveredProductSlug] = useState(null)

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center">
      
      {/* Full-width Edge-to-Edge Background Image */}
      <Image src="/Home%20page%20images/last-section-image-shleb-cosmetic.webp" alt="Shelby Cosmetics beauty collection" fill sizes="100vw" className="object-cover object-center" priority />
      
      {/* Subtle Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 sm:px-12 lg:px-16">
        
        {/* Left Side: Headline & Text */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full max-w-xl text-white py-12">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#be315b] uppercase mb-4">
            <span>❖</span>
            <span>SHOP THE LOOK</span>
            <span>❖</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-serif leading-[1.1] text-white uppercase mb-6 drop-shadow-md">
            BUILD YOUR BEAUTY ROUTINE
          </h2>
          
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md drop-shadow">
            From flawless foundations to glow-boosting skincare, discover the beauty essentials you need to look polished, feel confident, and shop with ease across Pakistan.
          </p>
        </div>

        {/* Right Side: Vertically Scrollable Cards Container (Hidden Scrollbar) */}
        <div className="lg:col-span-5 h-full overflow-y-auto py-12 lg:py-20 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-6">
            {cards.map((c) => (
              <div 
                key={c.slug} 
                    onMouseEnter={() => setHoveredProductSlug(c.slug)}
                    onMouseLeave={() => setHoveredProductSlug(null)}
                    className="bg-white rounded-xl flex flex-col overflow-hidden text-left shrink-0 transition-transform duration-300"
              >
                {/* Product Image (Flush to edge) */}
                <div className="relative w-full h-52 sm:h-60 bg-gray-100 overflow-hidden group">
                  {/* SALE Badge */}
                  <div className="absolute top-3 left-3 bg-[#be315b] text-white text-[10px] font-bold px-2 py-1 z-10 rounded-[2px] uppercase">
                    Sale
                  </div>
                  
                  <Image 
                    src={getImageUrl(hoveredProductSlug === c.slug && c.images?.[1] ? c.images[1] : c.images?.[0])} 
                    alt={(hoveredProductSlug === c.slug && c.images?.[1] ? c.images[1] : c.images?.[0])?.alt || c.name} 
                    fill 
                    sizes="(min-width: 1024px) 30vw, 100vw" 
                    className="z-0 object-cover transition-opacity duration-500" 
                    style={{ opacity: hoveredProductSlug === c.slug && c.images?.[1] ? 0 : 1 }}
                  />
                  {c.images?.[1] && <Image src={getImageUrl(c.images[1])} alt={c.images[1]?.alt || c.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="z-[1] object-cover transition-opacity duration-500" style={{ opacity: hoveredProductSlug === c.slug ? 1 : 0 }} />}
                </div>

                {/* Content Box */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <div className="mb-1 flex items-center gap-1 text-[10px] leading-none text-[#d4a017] sm:text-[11px]" aria-label={`${c.reviews?.length || 0} reviews`}>
                    <span aria-hidden="true">★★★★★</span>
                    {c.reviews?.length > 0 && <span className="ml-1 text-neutral-700">{c.reviews.length} reviews</span>}
                  </div>
                  {/* Brand Name */}
                  <span className="text-xs font-semibold text-gray-500 mb-1.5">
                    Shelby Cosmetics
                  </span>
                  
                  {/* Product Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem]">
                    {c.name}
                  </h3>

                  {/* Price Setup */}
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    {c.oldPrice && (
                      <span className="text-gray-400 line-through text-sm sm:text-base font-semibold">
                        Rs.{c.oldPrice}
                      </span>
                    )}
                    <span className="text-[#be315b] font-bold text-lg sm:text-xl">
                      Rs.{c.price}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/products/${c.slug}`} 
                    className="w-full py-2.5 rounded-md bg-[#be315b] hover:bg-[#be315b] text-white text-[13px] font-bold uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span className="text-lg leading-none font-normal">+</span> ADD TO CART
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}