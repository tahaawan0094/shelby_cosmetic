import Link from 'next/link'

export default function BenefitsSection() {
  return (
    <section className="hidden w-full overflow-hidden bg-[#FAF8F5] py-12 sm:block md:py-24">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Side: Extra Large Feature Image */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
          {/* Adjusted border-radius for smoother look like the image */}
          <Link href="/collections/foundation" className="block w-full max-w-[650px] aspect-square rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-sm bg-gray-100">
              <img 
              src="/Home%20page%20images/beauty-essentials-section.webp" 
              alt="Beauty Essentials" 
              className="w-full h-full object-cover" 
            />
          </Link>
        </div>

        {/* Right Side: Header + Enlarged Staggered Cards Grid */}
        <div className="lg:col-span-6 flex flex-col items-center text-center w-full mt-4 md:mt-0">
          
          {/* Subtitle with Diamonds */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] text-[#be315b] uppercase mb-4 md:mb-3">
            <span>❖</span>
            <span>OUR PROMISE</span>
            <span>❖</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif text-[#be315b] uppercase tracking-wide leading-[1.1] mb-8 md:mb-12">
            BEAUTY ESSENTIALS. <br />
            REAL RESULTS.
          </h2>

          {/* Grid Layout: 2 Columns on Mobile, 3 Columns on Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-[780px]">
            
            {/* Top Row - Card 1 */}
            <div className="md:col-start-1 bg-white rounded-[32px] p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow aspect-[3/4] md:aspect-square">
              <div className="w-10 h-10 sm:w-16 sm:h-16 mb-3 md:mb-4 flex items-center justify-center text-[#1a1a1a]">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" />
                  <path d="M12 7c-1.5 2.5-3 4.2-3 5.8a3 3 0 0 0 6 0C15 11.2 13.5 9.5 12 7z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-[#1a1a1a] uppercase leading-tight md:leading-snug mt-1">
                FLAWLESS <br />COVERAGE
              </span>
            </div>

            {/* Top Row - Card 2 */}
            <div className="md:col-start-2 bg-white rounded-[32px] p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow aspect-[3/4] md:aspect-square">
              <div className="w-10 h-10 sm:w-16 sm:h-16 mb-3 md:mb-4 flex items-center justify-center text-[#1a1a1a]">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="6" width="14" height="2" rx="1" />
                  <rect x="5" y="10" width="14" height="2" rx="1" />
                  <rect x="5" y="14" width="14" height="2" rx="1" />
                  <rect x="5" y="18" width="14" height="2" rx="1" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-[#1a1a1a] uppercase leading-tight md:leading-snug mt-1">
                GLIDE <br />&amp; BLEND
              </span>
            </div>

            {/* Bottom Row - Card 3 */}
            <div className="md:col-start-2 bg-white rounded-[32px] p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow aspect-[3/4] md:aspect-square">
              <div className="w-10 h-10 sm:w-16 sm:h-16 mb-3 md:mb-4 flex items-center justify-center text-[#1a1a1a]">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 14c-2.5 0-4.5 2-4.5 4.5 2.5 0 4.5-2 4.5-4.5z" fill="currentColor"/>
                  <path d="M12 14c2.5 0 4.5 2 4.5 4.5-2.5 0-4.5-2-4.5-4.5z" fill="currentColor"/>
                  <path d="M12 11v3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor"/>
                  <path d="M6 7l0.5 1 1 0.5-1 0.5-0.5 1-0.5-1-1-0.5 1-0.5z" fill="currentColor"/>
                  <path d="M18 7l0.5 1 1 0.5-1 0.5-0.5 1-0.5-1-1-0.5 1-0.5z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-[#1a1a1a] uppercase leading-tight md:leading-snug mt-1">
                ENHANCE <br />YOUR GLOW
              </span>
            </div>

            {/* Bottom Row - Card 4 (Solid Pink) */}
            <div className="md:col-start-3 bg-[#be315b] text-white rounded-[32px] p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-lg transition-colors aspect-[3/4] md:aspect-square">
              <div className="w-10 h-10 sm:w-16 sm:h-16 mb-3 md:mb-4 flex items-center justify-center text-white">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 6c-2.5 3-2.5 9 0 12" />
                  <path d="M17 6c2.5 3 2.5 9 0 12" />
                  <path d="M10 12h4" />
                  <path d="M10 10l-2 2 2 2" />
                  <path d="M14 10l2 2-2 2" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-white uppercase leading-tight md:leading-snug mt-1">
                BUILD <br />CONFIDENCE
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}