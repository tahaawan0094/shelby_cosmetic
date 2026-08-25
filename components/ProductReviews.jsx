import { useEffect, useState } from 'react'

export default function ProductReviews({ reviews = [], productSlug = '' }) {
  const initialReviews = Array.isArray(reviews) ? reviews : []
  const [submittedReviews, setSubmittedReviews] = useState([])
  const [reviewer, setReviewer] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (!productSlug) return
    try {
      const savedReviews = JSON.parse(localStorage.getItem(`shelby_reviews_${productSlug}`) || '[]')
      if (Array.isArray(savedReviews)) setSubmittedReviews(savedReviews)
    } catch (error) {
      setSubmittedReviews([])
    }
  }, [productSlug])

  const allReviews = [...initialReviews, ...submittedReviews]

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = reviewer.trim()
    const text = reviewText.trim()
    if (!name || !text) return

    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      reviewer: name,
      text,
      rating,
      date: new Date().toLocaleDateString('en-PK')
    }
    const nextReviews = [...submittedReviews, newReview]
    setSubmittedReviews(nextReviews)
    if (productSlug) localStorage.setItem(`shelby_reviews_${productSlug}`, JSON.stringify(nextReviews))
    setReviewer('')
    setReviewText('')
    setRating(5)
    setIsFormOpen(false)
  }

  const handleDelete = (reviewId) => {
    const nextReviews = submittedReviews.filter((review) => review.id !== reviewId)
    setSubmittedReviews(nextReviews)
    if (productSlug) localStorage.setItem(`shelby_reviews_${productSlug}`, JSON.stringify(nextReviews))
  }

  const averageRating = allReviews.length
    ? (allReviews.reduce((sum, review) => sum + Math.max(0, Math.min(5, review.rating || 0)), 0) / allReviews.length).toFixed(1)
    : '0.0'

  return (
    <section className="border-t border-neutral-200 pt-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#be315b]">Customer love</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-neutral-900 sm:text-4xl">Loved by customers</h2>
          <p className="mt-2 text-sm text-neutral-500">Real feedback from Shelby customers.</p>
        </div>
        <button type="button" onClick={() => setIsFormOpen(!isFormOpen)} className="rounded-full bg-[#be315b] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#9f213f]">
          {isFormOpen ? 'Close form' : 'Write a review'}
        </button>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-8 border-y border-neutral-200 py-6">
        <div>
          <p className="font-serif text-4xl font-semibold text-neutral-900">{averageRating}</p>
          <p className="mt-1 text-lg tracking-widest text-[#d4a017]">★★★★★</p>
          <p className="mt-1 text-xs text-neutral-500">Based on {allReviews.length} reviews</p>
        </div>
        <div className="min-w-[220px] flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = allReviews.filter((review) => Number(review.rating) === star).length
            const width = allReviews.length ? `${(count / allReviews.length) * 100}%` : '0%'
            return (
              <div key={star} className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="w-8 text-[#d4a017]">{star} star</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200"><div className="h-full rounded-full bg-[#d4a017]" style={{ width }} /></div>
                <span className="w-5 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {allReviews.length ? (
        <div className="mt-8 space-y-7">
          {allReviews.map((review, index) => {
            const reviewRating = Math.max(0, Math.min(5, review.rating || 0))
            return (
              <article key={`${review.reviewer}-${review.date}-${index}`} className="border-b border-neutral-200 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">{review.reviewer}</h3>
                  <div className="flex items-center gap-3">
                    <time className="text-xs text-neutral-500">{review.date}</time>
                    {review.id && <button type="button" onClick={() => handleDelete(review.id)} className="text-xs font-semibold text-[#be315b] hover:underline">Delete</button>}
                  </div>
                </div>
                <p className="mt-2 text-sm tracking-widest text-[#d4a017]" aria-label={`${reviewRating} out of 5 stars`}>
                  {'★'.repeat(reviewRating)}<span className="text-neutral-200">{'★'.repeat(5 - reviewRating)}</span>
                </p>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{review.text}</p>
              </article>
            )
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">Be the first to share your experience with this formula.</p>
      )}

      {isFormOpen && <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-5 rounded-lg bg-white/70 p-5 sm:p-7">
        <h3 className="font-serif text-2xl font-semibold text-neutral-900">Share your experience</h3>
        <div>
          <label htmlFor="reviewer-name" className="mb-2 block text-sm font-medium text-neutral-700">Your name</label>
          <input id="reviewer-name" type="text" value={reviewer} onChange={(event) => setReviewer(event.target.value)} required className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#be315b]" />
        </div>
        <div>
          <span className="mb-2 block text-sm font-medium text-neutral-700">Your rating</span>
          <div className="flex gap-1" role="radiogroup" aria-label="Choose a rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} aria-label={`${star} star${star > 1 ? 's' : ''}`} aria-pressed={rating === star} className={`text-2xl transition ${rating >= star ? 'text-[#d4a017]' : 'text-neutral-300'}`}>★</button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="review-text" className="mb-2 block text-sm font-medium text-neutral-700">Your review</label>
          <textarea id="review-text" value={reviewText} onChange={(event) => setReviewText(event.target.value)} required rows="4" className="w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#be315b]" />
        </div>
        <button type="submit" className="rounded-md bg-[#be315b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#9f213f]">Submit review</button>
      </form>}
    </section>
  )
}
