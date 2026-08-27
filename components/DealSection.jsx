import Link from 'next/link'

export default function DealSection() {
  const deals = [
    {
      id: 1,
      title: 'Makeup Steal',
      description: 'Flash Sale! Flawless coverage for less — top foundations from Huda Beauty, Dermacol & emelie Paris at unbeatable prices.',
      badge: 'SALE',
      background: 'linear-gradient(135deg, rgba(26,18,15,0.25), rgba(92,56,35,0.2)), url("/Home%20page%20images/makeup-deal.webp")',
      button: 'SHOP NOW',
      href: '/collections/foundation'
    },
    {
      id: 2,
      title: 'Skincare Reset',
      description: 'Brighten, hydrate, repeat. Vitamin C serums, sheet masks & facial kits — now on sale.',
      badge: 'SALE',
      background: 'linear-gradient(135deg, rgba(22,18,14,0.25), rgba(72,62,48,0.2)), url("/Home%20page%20images/skincare-deal.webp")',
      button: 'SHOP NOW',
      href: '/collections/serum'
    },
    {
      id: 3,
      title: 'Nail It',
      description: 'Salon-quality press-on nails and long-wear polish, ready to ship to your door.',
      badge: 'SALE',
      background: 'linear-gradient(135deg, rgba(24,19,12,0.33), rgba(81,79,38,0.25)), url("/Home%20page%20images/nail-deal.webp")',
      button: 'SHOP NOW',
      href: '/collections/press-on-nails'
    },
    {
      id: 4,
      title: 'Self-Care Sunday',
      description: 'Stock up on hand & foot masks, waxing kits, and styling tools for your at-home spa day.',
      badge: 'SALE',
      background: 'linear-gradient(135deg, rgba(22,16,13,0.25), rgba(98,75,56,0.25)), url("/Home%20page%20images/selfcare-deal.jpg")',
      button: 'SHOP NOW',
      href: '/collections/hand-mask'
    }
  ]

  return (
    <section className="w-full bg-[#f8f9fa] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-8">
        
        {/* Sleek Premium Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] text-black sm:text-4xl lg:text-[50px]">
            TOP DEALS
          </h2>
          <div className="w-16 h-1 bg-[#be315b] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="group relative flex h-[480px] w-[94vw] min-w-[94vw] snap-start flex-shrink-0 flex-col justify-end overflow-hidden rounded-xl border border-gray-100 bg-cover bg-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] md:w-auto md:min-w-0 md:flex-shrink md:h-[480px] lg:h-[520px]"
              style={{ backgroundImage: deal.background }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black" />

              {/* Card Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                
                {/* Badge Container (Pushed to top) */}
                <div className="mb-auto">
                  <span className="inline-block rounded-[2px] bg-[#be315b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {deal.badge}
                  </span>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="mt-4 text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                    {deal.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-gray-300 line-clamp-3 font-light mb-6">
                    {deal.description}
                  </p>

                  {/* Button */}
                  <Link href={deal.href} className="w-full rounded-md bg-[#be315b] py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#be315b] flex items-center justify-center gap-2 group/btn">
                    {deal.button}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2 md:hidden" aria-label="Four deals available">
          {deals.map((deal) => <span key={deal.id} className="h-2 w-2 rounded-full bg-[#be315b]" />)}
        </div>
      </div>
    </section>
  )
}