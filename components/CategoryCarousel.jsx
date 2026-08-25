import Link from 'next/link'
import Image from 'next/image'
import { getSanityImageUrl } from '../lib/images'

const fallbackImage = '/Home%20page%20images/2ddad497-8876-42bd-918a-e60aedb39018.png'

function CategorySet({ categories, hrefPrefix }) {
  return categories.map((category) => {
    const href = `${hrefPrefix}/${category.slug}`

    return (
      <Link href={href} key={`${category.name}-${category.slug}`} className="group flex w-36 flex-shrink-0 flex-col items-center gap-4 md:w-44">
        <div className="relative h-28 w-28 overflow-hidden rounded-full bg-neutral-100 md:h-32 md:w-32">
          <Image src={getSanityImageUrl(category.image) || category.image || fallbackImage} alt={category.name} fill sizes="120px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <span className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-800 md:text-xs">{category.name}</span>
      </Link>
    )
  })
}

export default function CategoryCarousel({
  categories = [],
  title = 'Shop By Collection',
  description = 'Everything you need - makeup, skincare, nails, hair & body care - all at honest prices, shipped across Pakistan.',
  hrefPrefix = '/collections',
  viewAllHref = '/collections/all'
}) {
  const items = categories || []

  if (!items.length) return null
  
  return (
    // Breakout wrapper: Forces the section to stretch edge-to-edge
    <section className="relative w-[100vw] ml-[calc(50%-50vw)] bg-transparent py-6 md:py-8 overflow-hidden">
      
      {/* Heading Container (Centered) */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-2xl md:text-3xl uppercase font-semibold tracking-wide text-center">{title}</h2>
          <p className="mt-3 text-center text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Marquee Container (Full Width Scroll) */}
      <div className="w-full">
        <div className="category-marquee flex w-max">
          <div className="category-marquee-set flex flex-shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden="true">
            <CategorySet categories={items} hrefPrefix={hrefPrefix} />
          </div>
          <div className="category-marquee-set flex flex-shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden="true">
            <CategorySet categories={items} hrefPrefix={hrefPrefix} />
          </div>
          <div className="category-marquee-set flex flex-shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden="true">
            <CategorySet categories={items} hrefPrefix={hrefPrefix} />
          </div>
        </div>
      </div>

      {/* View All Button Container (Centered) */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 mt-6">
        <div className="flex justify-center">
          <a href={viewAllHref} className="inline-flex items-center px-8 py-3 bg-[#be315b] text-white rounded-full text-sm md:text-base font-semibold uppercase shadow-xl hover:bg-opacity-90 transition-colors">
            View All
          </a>
        </div>
      </div>
      
    </section>
  )
}