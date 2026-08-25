import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { getImageUrl } from '../lib/products'
import { useCart } from '../lib/contexts/CartContext'
import { useWishlist } from '../lib/contexts/WishlistContext'

export default function ProductCard({ product, viewMode = 4, showReviewCount = false }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  
  const [added, setAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isWish = isInWishlist(product.slug)
  
  const image = product.images?.[0]
  const hoverImage = product.images?.[1]
  const slug = product.slug?.trim()
  const discountPercent = product.discountPercent || (product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0)

  const handleAddClick = (e) => {
    e.preventDefault()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <article onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`group h-full overflow-hidden rounded-xl bg-white text-left transition ${viewMode === 1 ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
      <div className={`relative overflow-hidden rounded-xl bg-stone-100 ${viewMode === 1 ? 'aspect-[4/3] w-full sm:h-[260px] sm:w-[260px] sm:shrink-0' : 'aspect-square w-full'}`}>
        <Image src={getImageUrl(image)} alt={image?.alt || product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="z-0 object-cover transition-opacity duration-500" style={{ opacity: isHovered && hoverImage ? 0 : 1 }} />
        {hoverImage && <Image src={getImageUrl(hoverImage)} alt={hoverImage.alt || product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="z-[1] object-cover transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0 }} />}
        {discountPercent > 0 && <span className="absolute left-2 top-2 z-10 rounded-full bg-[#be315b] px-2.5 py-1 text-[10px] font-bold text-white md:hidden">{discountPercent}% OFF</span>}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#be315b] shadow-sm transition hover:scale-105"
        >
          {isWish ? '♥' : '♡'}
        </button>
      </div>
      <div className={`flex flex-1 flex-col p-2 md:p-3 ${viewMode === 1 ? 'sm:p-4' : ''}`}>
        <div className="md:hidden">
          <Link href={`/products/${slug}`} className="rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-[#be315b]/40">
            <div className="mb-1 flex items-center gap-1 text-[10px] leading-none text-[#d4a017]" aria-label={`${product.reviews?.length || 0} reviews`}>
              <span aria-hidden="true">★★★★★</span>
              {showReviewCount && <span className="ml-1 text-[10px] text-neutral-700">{product.reviews?.length || 0} reviews</span>}
            </div>
            <h2 className="line-clamp-2 text-[12px] font-semibold leading-[1.2] text-[#171717] transition-colors hover:text-[#be315b] sm:text-[13px]">{product.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {product.originalPrice > product.price && <span className="text-[10px] text-neutral-400 line-through sm:text-[11px]">Rs.{product.originalPrice}</span>}
              <span className="text-[13px] font-bold text-[#be315b] sm:text-[14px]">Rs.{product.price}</span>
            </div>
          </Link>
          <span className="shine-badge mt-2 w-fit rounded-full bg-gradient-to-r from-[#c89211] via-[#f6d365] to-[#b7791f] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.04em] text-[#171717]">Limited Time Offer</span>
        </div>
        <div className="hidden md:flex md:flex-1 md:flex-col">
          <Link href={`/products/${slug}`} className="flex flex-col rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-[#be315b]/40">
            <div className="mb-1 flex items-center gap-1 text-[11px] leading-none text-[#d4a017]" aria-label={`${product.reviews?.length || 0} reviews`}>
              <span aria-hidden="true">★★★★★</span>
              {product.reviews?.length > 0 && <span className="ml-1 text-neutral-700">{product.reviews.length} reviews</span>}
            </div>
            <p className="text-[11px] font-medium tracking-[0.05em] text-neutral-500">{product.brand || 'Shelby Cosmetics'}</p>
            <h2 className="mt-1.5 min-h-[3rem] text-[18px] font-semibold leading-[1.25] text-[#1a1a1a] transition-colors hover:text-[#be315b]">{product.name}</h2>
            <div className="mt-1 mb-2 flex items-center gap-2">
              {product.originalPrice && product.originalPrice > product.price && <span className="text-sm font-medium text-neutral-400 line-through">Rs.{product.originalPrice}</span>}
              <span className="text-[18px] font-bold tracking-tight text-[#be315b]">Rs.{product.price}</span>
            </div>
          </Link>
          <span className="shine-badge mb-1 mt-auto w-fit rounded-full bg-gradient-to-r from-[#c89211] via-[#f6d365] to-[#b7791f] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.04em] text-[#171717]">Limited Time Offer</span>
          <button type="button" onClick={handleAddClick} className="mt-auto flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#be315b] py-3 text-[12px] font-bold uppercase tracking-[0.05em] text-white transition hover:bg-[#9f213f]">
            <span className="text-lg leading-none font-normal">+</span>
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
