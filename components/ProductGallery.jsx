import { useState } from 'react'
import { getImageUrl } from '../lib/products'

export default function ProductGallery({ product }) {
  const images = product?.images && product.images.length > 0 ? product.images : ['/placeholder.png']
  const [selectedImage, setSelectedImage] = useState(0)

  const discount = product?.originalPrice && product?.price && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full items-start">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto w-full md:w-20 lg:w-24 flex-shrink-0 scrollbar-none max-h-[380px] md:max-h-[500px] pb-2 md:pb-0">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
                className={`relative h-16 w-16 md:h-20 md:w-full aspect-square flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index 
                  ? 'border-[#be315b] opacity-100 shadow-sm' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={getImageUrl(img) || img}
                alt={`${product?.name} thumbnail ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Container */}
      <div className="relative -ml-3 aspect-[6/7] min-h-[320px] max-h-[560px] w-[calc(100%+1.5rem)] items-center justify-center overflow-hidden rounded-lg border border-neutral-200/60 bg-white sm:-ml-5 sm:w-[calc(100%+2.5rem)] md:ml-0 md:w-auto">
        <img
          src={getImageUrl(images[selectedImage]) || images[selectedImage]}
          alt={product?.name || 'Product Image'}
          className="block h-full w-full object-cover object-center transition-all duration-300"
        />

        {discount > 0 && (
          <div className="absolute left-4 top-4 z-10 rounded-lg bg-[#be315b] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm sm:left-6 sm:top-6">
            {discount}% OFF
          </div>
        )}
      </div>
    </div>
  )
}