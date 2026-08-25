export default function ResultsSection() {
  const stats = [
    { label: 'Soft Matte Finish', value: '92%' },
    { label: 'Long-Wear Coverage', value: '81%' },
    { label: 'Skin-Friendly Glow', value: '87%' },
    { label: 'Beauty Confidence', value: '94%' },
  ]

  return (
    <section className="py-12 sm:py-20 bg-white w-full">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-[1600px]">
        
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
          <span>❖</span>
          <span>VISIBLE RESULTS</span>
          <span>❖</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif text-gray-900 leading-tight mb-8 md:mb-16 px-2 sm:px-0">
          SEE THE DIFFERENCE.<br />FEEL THE CONFIDENCE.
        </h2>

        {/* Large Image Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
          {/* Main Large Image */}
          <img 
            src="/Home%20page%20images/f2e34db9-f663-4cf8-93a3-18f6539a7bb6.png" 
            alt="Results Large" 
            className="w-full h-[550px] md:h-[650px] lg:h-[750px] object-cover" 
          />

          {/* Bottom-Right: Stat Badges in Stack/Grid */}
          <div className="absolute right-3 bottom-3 sm:right-8 sm:bottom-8 lg:right-12 lg:bottom-12">
            <div className="flex flex-col items-end sm:items-center sm:grid sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              {stats.map((s, i) => (
                <div 
                  key={i} 
                  className="bg-white/85 backdrop-blur-md border border-white/40 text-[10px] sm:text-sm font-medium text-gray-800 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg text-center whitespace-nowrap"
                >
                  <span className="font-bold text-accent">{s.value}</span> - {s.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}