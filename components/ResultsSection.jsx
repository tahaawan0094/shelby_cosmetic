import Link from 'next/link'

export default function ResultsSection() {
  return (
    <section className="py-12 sm:py-20 bg-white w-full">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-[1600px]">
        
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
          <span>❖</span>
          <span>BEAUTY ESSENTIALS</span>
          <span>❖</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif text-gray-900 leading-tight mb-8 md:mb-16 px-2 sm:px-0">
          GLOW NATURALLY.<br />SHINE EFFORTLESSLY.
        </h2>

        {/* Large Image Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
          {/* Main Large Image */}
          <Link href="/collections/all" className="block">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/Home%20page%20images/our-beauty-products-image-mobile.webp"
              />
              <img
                src="/Home%20page%20images/our-beauty-products-image.webp"
                alt="Beauty products"
                className="block w-full h-auto md:h-[650px] lg:h-[750px] object-cover"
              />
            </picture>
          </Link>

        </div>
      </div>
    </section>
  )
}