import { useState } from 'react'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      id: 1,
      text: 'This serum absorbs beautifully and leaves my skin looking brighter and healthier. I love the lightweight texture on the skin.',
      name: 'Sofia Lee',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 2,
      text: 'My skin feels incredibly smooth and hydrated. Within just a few weeks, I noticed my fine lines looking softer and my skin glowing.',
      name: 'Emily Carter',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 3,
      text: 'Absolutely in love with this! It gave my dull skin an instant boost of radiance without feeling greasy or heavy at all.',
      name: 'Jessica Taylor',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    {
      id: 4,
      text: 'The best skincare addition I have made this year. My dry patches are completely gone and my foundation sits so smoothly now.',
      name: 'Sarah Jenkins',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    {
      id: 5,
      text: 'So gentle on my sensitive skin. I noticed a visible reduction in redness and my skin feels plump and hydrated all day long.',
      name: 'Maya Patel',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
  ]

  // Mobile par one-by-one aur desktop par two reviews visible rehte hain.
  const maxIndex = reviews.length - 1

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  // Desktop par active review ke saath next review bhi show hota hai.
  const visibleReviews = reviews.slice(currentIndex, currentIndex + 2)

  // Numbers ko '01', '02' format mein lane ke liye helper function
  const formatNumber = (num) => String(num).padStart(2, '0')

  return (
    <section className="py-20 bg-white w-full overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
            <span>❖</span>
            <span>CUSTOMER REVIEWS</span>
            <span>❖</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-gray-900 leading-[1.1] uppercase">
            LOVED BY SKINCARE <br /> ENTHUSIASTS
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Dynamic Review Cards (2 Cards Visible) */}
          {visibleReviews.map((r) => (
            <div 
              key={r.id} 
              className={`bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-between shadow-sm transition-all duration-300 ${visibleReviews.indexOf(r) > 0 ? 'hidden md:flex' : 'flex'}`}
            >
              <div>
                {/* 4-Diamond Decorative Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mb-6 opacity-80 text-accent">
                  <path d="M12 2L14.5 4.5L12 7L9.5 4.5L12 2Z" />
                  <path d="M5 9L7.5 11.5L5 14L2.5 11.5L5 9Z" />
                  <path d="M19 9L21.5 11.5L19 14L16.5 11.5L19 9Z" />
                  <path d="M12 16L14.5 18.5L12 21L9.5 18.5L12 16Z" />
                </svg>
                
                {/* Review Text */}
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-10 min-h-[4.5rem]">
                  {r.text}
                </p>
              </div>

              {/* User Profile Area */}
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

          {/* Right Stats / Pager Card */}
          <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-8 flex flex-col justify-between shadow-sm">
            
            {/* Dynamic Counter */}
            <div className="text-center text-lg sm:text-xl font-medium text-gray-800 mt-2">
              {formatNumber(currentIndex + 1)} / {formatNumber(reviews.length)}
            </div>
            
            {/* Center Rating */}
            <div className="my-10 text-center flex flex-col items-center justify-center">
              <div className="text-[64px] sm:text-[80px] font-serif text-gray-900 leading-none flex items-center gap-2">
                4.9 <span className="text-4xl sm:text-5xl text-gray-900">★</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 mt-4">
                Average Customer Ratings
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center gap-3 w-full">
              {/* Previous Button */}
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex-1 py-4 bg-white border border-gray-200 rounded-lg flex justify-center items-center gap-3 transition-colors group ${
                  currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                  ◀
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-800">
                  PREVIOUS
                </span>
              </button>
              
              {/* Next Button */}
              <button 
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className={`flex-1 py-4 bg-accent border border-accent rounded-lg flex justify-center items-center gap-3 transition-colors group ${
                  currentIndex === maxIndex ? 'opacity-40 cursor-not-allowed' : 'hover:bg-accent-dark'
                }`}
              >
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white">
                  NEXT
                </span>
                <div className="w-5 h-5 rounded-full bg-white text-accent flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}