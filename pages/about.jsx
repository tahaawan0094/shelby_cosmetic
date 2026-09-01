import Head from 'next/head'
import InfoPage from '../components/InfoPage'
import { siteUrl } from '../components/SeoHead'

export default function About() {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${siteUrl}/about`} />
      </Head>
    <InfoPage
      title="About Shelby Cosmetics"
      eyebrow="Our Story"
      intro="Shelby Cosmetics is Karachi's home for imported beauty a trusted online cosmetics store bringing authentic makeup, skincare, nail art, hair tools and personal care products to customers across Pakistan. We source genuine imported brands at honest prices and deliver them straight to your door, nationwide."
      seoTitle="About Us | Shelby Cosmetics Our Story, Mission & Values"
      seoDescription="Get to know Shelby Cosmetics our story, what we stand for, how our products are made, and why thousands of customers trust us with their daily routine."
    >
      <div className="space-y-10">
        <section className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">Who We Are</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
            We started Shelby Cosmetics to solve a simple problem: quality imported beauty products in Pakistan are either hard to find, overpriced, or of questionable origin. We built a store around three things instead authentic products, fair pricing, and a shopping experience you can trust. Every item we list is sourced and checked before it reaches our shelves, so what you see on the product page is exactly what arrives at your doorstep.
          </p>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">What We Offer</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
            From everyday makeup essentials to skincare that actually works, our catalog covers everything you need for your beauty routine:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600 md:text-base">
            <li>Makeup — foundations, liners, brows, glosses, powders and palettes</li>
            <li>Skincare — serums, brightening and anti-aging formulas, sheet masks</li>
            <li>Nail art — press-on nails and salon-quality nail essentials</li>
            <li>Hair & body care — waxing kits, hand & foot masks, styling tools</li>
            <li>Trusted imported names like Huda Beauty, Dermacol, Dr. Rashel and emelie Paris, alongside select local favorites like Masarrat Misbah</li>
          </ul>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">Why Shop With Shelby Cosmetics</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600 md:text-base">
            <li>Authentic imported products — no guesswork, no knockoffs</li>
            <li>Honest, competitive pricing — real Pakistan-market pricing, not inflated import markups</li>
            <li>Nationwide delivery — order from anywhere in Pakistan</li>
            <li>Wholesale & bulk options — for resellers and salons</li>
            <li>Based in Karachi — a real local team you can reach directly</li>
          </ul>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">Our Promise</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
            Beauty shopping online should feel safe, not risky. That's why we stand behind every product we sell, keep our pricing transparent, and make it easy to reach a real person if something's ever wrong. We're not just selling cosmetics we're building a beauty community across Pakistan that trusts where their products come from.
          </p>
        </section>
      </div>
    </InfoPage>
    </>
  )
}
