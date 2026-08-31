import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import { reviews } from '../lib/reviews'

const formatNumber = (num) => String(num).padStart(2, '0')

export default function ReviewsPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  const visibleReviews = [
    reviews[activeIndex],
    reviews[(activeIndex + 1) % reviews.length],
    reviews[(activeIndex + 2) % reviews.length],
  ]

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)

  return (
    <>
      <Head>
        <title>Customer Reviews | Shelby Cosmetics</title>
        <meta name="description" content="Read real customer reviews from Shelby Cosmetics customers and discover our best-loved products." />
      </Head>

      <div className="min-h-screen bg-[#f7f5f2] text-neutral-900">
        <Navbar solid />

        {/* Yahan pt-32 aur lg:pt-40 add kiya hai taake navbar ke neeche space aa jaye */}
        <main className="mx-auto max-w-[1400px] px-4 pt-32 pb-12 sm:px-8 lg:px-10 lg:pt-40 lg:pb-16">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c62c52]">Customer happiness</p>
            <h1 className="font-serif text-5xl leading-none text-neutral-900 sm:text-6xl lg:text-[6rem]">
              Featured Customer Testimonials
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <article
                key={`${review.id}-${index}`}
                className="relative flex min-h-[420px] flex-col justify-between rounded-[22px] border border-neutral-200 bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <div>
                  <div className="mb-6 text-[#c62c52]" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.5 4.5L12 7L9.5 4.5L12 2Z"/>
                      <path d="M5 9L7.5 11.5L5 14L2.5 11.5L5 9Z"/>
                      <path d="M19 9L21.5 11.5L19 14L16.5 11.5L19 9Z"/>
                      <path d="M12 16L14.5 18.5L12 21L9.5 18.5L12 16Z"/>
                    </svg>
                  </div>

                  <h2 className="mb-5 text-3xl font-medium tracking-[-0.04em] text-neutral-900 sm:text-[2rem]">
                    {review.name}
                  </h2>

                  <div className="mb-5 flex gap-1 text-lg text-[#0f8ca9]">
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>

                  <p className="text-lg leading-8 text-neutral-700 sm:text-[1.05rem]">
                    {review.text}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{review.name}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Verified buyer</p>
                    </div>
                  </div>

                  <div className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-neutral-700">
                    {formatNumber(index + 1)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[22px] border border-neutral-200 bg-[#faf7f4] p-8 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="text-[14px] font-semibold uppercase tracking-[0.25em] text-neutral-500">Average rating</div>
              <div className="flex items-end gap-3">
                <span className="font-serif text-7xl leading-none text-neutral-900 sm:text-[7.5rem]">{averageRating}</span>
                <span className="mb-4 text-4xl text-[#0f8ca9]">★</span>
              </div>
              <div className="text-sm text-neutral-600">Based on {reviews.length} customer reviews</div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/" className="rounded-full bg-[#c62c52] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#9f213f]">
              Back to Home
            </Link>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}