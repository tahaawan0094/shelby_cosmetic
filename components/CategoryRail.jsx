import Link from 'next/link'
import Image from 'next/image'
import { getSanityImageUrl } from '../lib/images'

function CategorySet({ categories }) {
  return categories.map((category) => (
    <Link href={`/category/${category.slug}`} key={category.slug} className="group flex w-36 flex-shrink-0 flex-col items-center gap-4 md:w-44">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-neutral-100 md:h-40 md:w-40">
        {category.image && <Image src={getSanityImageUrl(category.image) || '/logo/Skin_Care___3_-removebg-preview.png'} alt={category.image.alt || category.name} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-110" />}
      </div>
      <span className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-800 md:text-xs">{category.name}</span>
    </Link>
  ))
}

export default function CategoryRail({ categories = [] }) {
  if (!categories.length) return null
  return (
    <section className="overflow-hidden bg-white py-10 md:py-14" aria-labelledby="category-title">
      <h2 id="category-title" className="mb-8 text-center text-3xl uppercase leading-none md:mb-10 md:text-4xl">Shop by category</h2>
      <div className="category-marquee flex w-max">
        <div className="category-marquee-set flex flex-shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden="true"><CategorySet categories={categories} /></div>
        <div className="category-marquee-set flex flex-shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden="true"><CategorySet categories={categories} /></div>
        <div className="category-marquee-set flex flex-shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden="true"><CategorySet categories={categories} /></div>
      </div>
    </section>
  )
}