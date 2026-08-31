import { reviews } from '../lib/reviews'

export default function TestimonialsSection() {
  // Infinite smooth scroll ke liye items 2 dafa repeat hain
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section className="py-20 bg-white w-full overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mb-16">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
            <span>❖</span>
            <span>CUSTOMER REVIEWS</span>
            <span>❖</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-gray-900 leading-[1.1] uppercase">
            LOVED BY SKINCARE <br /> ENTHUSIASTS
          </h2>
        </div>
      </div>

      {/* 🚀 ANNOUNCEMENT BAR JESI MOVING TRACK */}
      <div className="w-full overflow-hidden py-4">
        <div className="announcement-track flex gap-6 hover:[animation-play-state:paused]">
          {duplicatedReviews.map((r, index) => (
            <div 
              key={`${r.id}-${index}`} 
              className="w-[320px] sm:w-[400px] shrink-0 bg-[#FAF8F5] border border-gray-200/60 rounded-xl p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* 4-Diamond Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mb-6 opacity-80 text-accent">
                  <path d="M12 2L14.5 4.5L12 7L9.5 4.5L12 2Z" />
                  <path d="M5 9L7.5 11.5L5 14L2.5 11.5L5 9Z" />
                  <path d="M19 9L21.5 11.5L19 14L16.5 11.5L19 9Z" />
                  <path d="M12 16L14.5 18.5L12 21L9.5 18.5L12 16Z" />
                </svg>
                
                {/* Review Text */}
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-8 min-h-[4.5rem]">
                  "{r.text}"
                </p>
              </div>

              {/* User Profile */}
              <div>
                <hr className="border-gray-200 mb-6" />
                <div className="flex items-center gap-4">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                    {/* 5 Stars */}
                    <div className="flex gap-1 text-yellow-400 text-sm mt-1">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}