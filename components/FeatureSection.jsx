export default function FeatureSection() {
  return (
    <section className="py-12 md:py-24 bg-neutral-1 overflow-hidden">
      <div className="w-full max-w-[1450px] mx-auto px-4 sm:px-8">
        
        {/* Staggered Arch Images */}
        <div className="flex justify-center items-start gap-3 md:gap-8 mb-10 md:mb-20 px-2 md:px-0">
          
          {/* 1st Image: Large Top-Left Arch */}
          {/* Mobile par width 45% taake donon images barabar fit ayen */}
          <div className="w-[45%] sm:w-64 md:w-[350px] h-48 sm:h-80 md:h-[420px] rounded-tl-[80px] sm:rounded-tl-[180px] md:rounded-tl-[200px] overflow-hidden shadow-sm bg-gray-100 flex-shrink-0">
            <img 
              src="/Home%20page%20images/2ddad497-8876-42bd-918a-e60aedb39018.png" 
              alt="Serum Feature 1" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* 2nd Image: Large Top-Right Arch + Shifted Down */}
          <div className="w-[45%] sm:w-64 md:w-[350px] h-48 sm:h-80 md:h-[420px] rounded-tr-[80px] sm:rounded-tr-[180px] md:rounded-tr-[200px] overflow-hidden shadow-sm bg-gray-100 flex-shrink-0 mt-8 sm:mt-14 md:mt-16">
            <img 
              src="/Home%20page%20images/f2e34db9-f663-4cf8-93a3-18f6539a7bb6.png" 
              alt="Serum Feature 2" 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>

        {/* Typography Layout - Responsive 3 Lines */}
        {/* Mobile par font chota kiya hai aur gap kam rakha hai */}
        <div className="w-full flex flex-col items-center md:items-stretch font-serif tracking-[0.03em] text-accent uppercase font-normal text-[11px] sm:text-base md:text-3xl lg:text-[38px] xl:text-[42px] leading-[1.6] md:leading-[1.35] gap-1 md:gap-3 px-2">
          
          {/* Line 1: Mobile par Centered, Desktop par Left Aligned */}
          {/* whitespace-normal ensures text can wrap on mobile if needed */}
          <div className="text-center md:text-left w-full whitespace-normal md:whitespace-nowrap">
            SHELBY COSMETICS IS KARACHI'S HOME FOR
          </div>

          {/* Line 2: Mobile par Centered, Desktop par Right Aligned */}
          <div className="text-center md:text-right w-full md:pl-24 mt-1 whitespace-normal md:whitespace-nowrap">
            IMPORTED COSMETICS IN PAKISTAN - MAKEUP,
          </div>

          {/* Line 3: Hamesha Centered */}
          <div className="text-center w-full mt-1 md:mt-5 whitespace-normal md:whitespace-nowrap">
            SKINCARE, NAIL ART, HAIR TOOLS, AND PERSONAL CARE.
          </div>

        </div>

      </div>
    </section>
  )
}