import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const bannerImages = [
  '/Home%20page%20images/shelby-cosmetics-banner-image-1.webp',
  '/Home%20page%20images/shelby-cosmetics-banner-image-2.webp',
  '/Home%20page%20images/shelby-cosmetics-banner-image-3.webp'
]

const mobileBannerImages = [
  '/Home%20page%20images/banner-image-mobile-1.webp',
  '/Home%20page%20images/banner-image-mobile-2.webp',
  '/Home%20page%20images/banner-image-mobile-3.webp'
]

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % bannerImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
    <section className="relative min-h-screen flex flex-col justify-end pb-8 md:pb-14 pt-32">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 hidden transition-opacity duration-1000 ease-in-out md:block ${
              index === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </div>
        ))}
        {mobileBannerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out md:hidden ${
              index === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </div>
        ))}
        {/* Slightly darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-8">

        {/* Left Side: Text & Button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md lg:max-w-lg w-full">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }} 
            className="text-[8.5vw] sm:text-4xl lg:text-5xl font-serif text-white leading-none drop-shadow-md whitespace-nowrap"
          >
            SHELBY COSMETICS
          </motion.h1>
          
          <motion.p 
            initial={{ y: 10, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.15, duration: 0.6 }} 
            className="mt-3 md:mt-4 text-[11px] sm:text-xs md:text-sm text-white/95 leading-relaxed max-w-[280px] sm:max-w-sm drop-shadow-sm"
          >
            Affordable makeup in Pakistan, imported beauty essentials, and honest prices — shipped nationwide from Karachi.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="mt-6 md:mt-8 w-full max-w-[280px] sm:max-w-sm"
          >
            {/* Button matched with the provided image color & style */}
            <button className="w-full py-3.5 bg-[#be315b] hover:bg-[#be315b] transition-colors text-white text-xs font-bold tracking-widest rounded-full uppercase shadow-lg text-center">
              SHOP NOW
            </button>
          </motion.div>
        </div>

        {/* Right Side: Product Cards (Horizontal Scroll on Mobile) */}
        {/* Added snap-x and hidden scrollbars for better mobile UX */}
        <div className="grid grid-cols-3 gap-2 w-full md:flex md:w-auto md:gap-4 overflow-hidden pb-2 md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-0 px-1 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          
          {/* Card 1 */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.5 }} 
            className="bg-white p-1.5 sm:p-3 md:p-3.5 rounded-xl md:rounded-2xl shadow-2xl w-auto sm:w-48 md:w-40 lg:w-56 min-w-0 flex-shrink-0 snap-center"
          >
            <img 
              src="/Home%20page%20images/MAKEUP-Card.webp" 
              alt="makeup essentials" 
              className="w-full aspect-square sm:aspect-auto h-auto sm:h-32 lg:h-36 object-cover rounded-lg sm:rounded-xl"
            />
            <p className="mt-1.5 sm:mt-3 text-center text-[8px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wide sm:tracking-wider whitespace-nowrap">
              MAKEUP
            </p>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.6 }} 
            className="bg-white p-1.5 sm:p-3 md:p-3.5 rounded-xl md:rounded-2xl shadow-2xl w-auto sm:w-48 md:w-40 lg:w-56 min-w-0 flex-shrink-0 snap-center"
          >
            <img 
              src="/Home%20page%20images/SKINCARE-Card.webp" 
              alt="skincare essentials" 
              className="w-full aspect-square sm:aspect-auto h-auto sm:h-32 lg:h-36 object-cover rounded-lg sm:rounded-xl"
            />
            <p className="mt-1.5 sm:mt-3 text-center text-[8px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wide sm:tracking-wider whitespace-nowrap">
              SKINCARE
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.7 }} 
            className="bg-white p-1.5 sm:p-3 md:p-3.5 rounded-xl md:rounded-2xl shadow-2xl w-auto sm:w-48 md:w-40 lg:w-56 min-w-0 flex-shrink-0 snap-center"
          >
            <img 
              src="/Home%20page%20images/NAIL-ART-Card.webp" 
              alt="nail art essentials" 
              className="w-full aspect-square sm:aspect-auto h-auto sm:h-32 lg:h-36 object-cover rounded-lg sm:rounded-xl"
            />
            <p className="mt-1.5 sm:mt-3 text-center text-[8px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wide sm:tracking-wider whitespace-nowrap">
              NAIL ART
            </p>
          </motion.div>

        </div>
        
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
        {bannerImages.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`Show banner ${index + 1}`}
            onClick={() => setActiveImage(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === activeImage ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
    </>
  )
}