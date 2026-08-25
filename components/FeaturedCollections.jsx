import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const collectionLayout = [
  'tall',
  'short',
  'tall',
  'short',
  'tall',
  'short'
]

export default function FeaturedCollections({ collections = [] }) {
  const items = collections.slice(0, collectionLayout.length)
  const [hoveredCollection, setHoveredCollection] = useState(null)

  if (!items.length) return null

  // Helper function to create the exact staggered bento grid from Image 2
  const getGridClasses = (index) => {
    const classes = {
      0: 'md:col-start-1 md:row-start-1 md:row-span-2 md:min-h-[350px]',
      1: 'md:col-start-2 md:row-start-1 md:row-span-1 md:min-h-[170px]',
      2: 'md:col-start-3 md:row-start-1 md:row-span-2 md:min-h-[350px]',
      3: 'md:col-start-1 md:row-start-3 md:row-span-1 md:min-h-[170px]',
      4: 'md:col-start-2 md:row-start-2 md:row-span-2 md:min-h-[350px]',
      5: 'md:col-start-3 md:row-start-3 md:row-span-1 md:min-h-[170px]',
    }
    return classes[index] || 'md:min-h-[170px]'
  }

  return (
    <section className="bg-white px-4 py-10 sm:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Header - Kept exactly the same */}
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c62c52]">Shop by collection</p>
            <h2 className="text-3xl font-bold uppercase leading-none text-black sm:text-4xl lg:text-5xl">Find your next favorite</h2>
          </div>
          <Link href="/collections/all" className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-[#c62c52] underline underline-offset-4 sm:block">
            View all
          </Link>
        </div>

        {/* Updated Grid for Image 2 Layout */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-3 md:gap-3 lg:gap-4">
          {items.map((collection, index) => (
            <Link
              href={`/collections/${collection.slug}`}
              key={collection.slug}
              onMouseEnter={() => setHoveredCollection(collection.slug)}
              onMouseLeave={() => setHoveredCollection(null)}
              className={`group relative min-h-[220px] overflow-hidden rounded-xl bg-neutral-900 ${getGridClasses(index)}`}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="z-0 object-cover transition-opacity duration-500"
                style={{ opacity: hoveredCollection === collection.slug && collection.hoverImage ? 0 : 1 }}
              />
              {collection.hoverImage && <Image
                src={collection.hoverImage}
                alt={`${collection.name} collection alternate view`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="z-[1] object-cover transition-opacity duration-500"
                style={{ opacity: hoveredCollection === collection.slug ? 1 : 0 }}
              />}
              <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/35" />
              
              {/* Text aligned to top-left like Image 2 */}
              <div className="absolute inset-0 flex flex-col items-start justify-start p-5 sm:p-6 text-white">
                {/* Removed uppercase to match the standard casing in Image 2 */}
                <h3 className="text-xl font-bold leading-tight sm:text-2xl">{collection.name}</h3>
                
                <span className="mt-3 inline-flex rounded-sm bg-[#e51e4d] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-transform duration-300 group-hover:scale-105">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All - Kept exactly the same */}
        <Link href="/collections/all" className="mt-5 block text-center text-xs font-bold uppercase tracking-[0.12em] text-[#c62c52] underline underline-offset-4 sm:hidden">
          View all collections
        </Link>
      </div>
    </section>
  )
}