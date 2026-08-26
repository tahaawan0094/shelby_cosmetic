import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const bannerImages = [
  '/Home%20page%20images/banner-001.webp',
  '/Home%20page%20images/banner-02.webp'
]

const mobileBannerImages = [
  '/Home%20page%20images/final_1080x1600.jpg',
  '/Home%20page%20images/SADOER_1080x1600.jpg'
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
    <section className="relative min-h-[700px] flex flex-col justify-end pb-8 md:min-h-screen md:pb-14 pt-32">
      
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
              className="h-full w-full bg-[length:auto_100%] bg-top md:bg-cover md:bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </div>
        ))}
        {mobileBannerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out md:hidden ${
              index === activeImage % mobileBannerImages.length ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full w-full bg-[length:auto_100%] bg-top md:bg-cover md:bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </div>
        ))}
        {/* Slightly darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 hidden w-full max-w-[1600px] mx-auto px-4 md:flex md:flex-row md:justify-between md:items-end md:gap-8 md:px-12">

        {/* Left Side: Text & Button */}
        <div key={activeImage} className={`flex flex-col items-center md:items-start text-center md:text-left max-w-md lg:max-w-lg w-full ${activeImage === 0 || activeImage === 1 ? '-translate-y-16 md:-translate-y-24' : ''}`}>
          {(activeImage === 0 || activeImage === 1) && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white drop-shadow-md sm:text-sm"
            >
              Introducing new collection
            </motion.p>
          )}

          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }} 
            className={`${activeImage === 0 || activeImage === 1 ? 'text-[11vw] sm:text-6xl lg:text-7xl' : 'text-[8.5vw] sm:text-4xl lg:text-5xl'} leading-none font-serif text-white drop-shadow-md`}
          >
            {activeImage === 0 ? <>Flawless Base.<br />Perfected.</> : activeImage === 1 ? 'Clear Skin. Perfected.' : 'SHELBY COSMETICS'}
          </motion.h1>
          
          {activeImage === 0 ? (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-3 md:mt-4 text-sm text-white/95 leading-relaxed drop-shadow-sm sm:text-base md:text-lg"
            >
              Shop Emelie &amp; Huda Beauty Foundations
            </motion.p>
          ) : activeImage === 1 ? (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-3 text-sm text-white/95 leading-relaxed drop-shadow-sm sm:text-base md:text-lg"
            >
              Shop Sadoer skincare essentials
            </motion.p>
          ) : activeImage !== 1 && (
            <motion.p 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.15, duration: 0.6 }} 
              className="mt-3 md:mt-4 text-[11px] sm:text-xs md:text-sm text-white/95 leading-relaxed max-w-[280px] sm:max-w-sm drop-shadow-sm"
            >
              Affordable makeup in Pakistan, imported beauty essentials, and honest prices — shipped nationwide from Karachi.
            </motion.p>
          )}
          
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

      </div>

      <div className="relative z-10 flex w-full -translate-y-[21rem] flex-col items-start px-4 pl-4 text-left md:hidden">
        <motion.p
          key={`mobile-eyebrow-${activeImage}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white drop-shadow-md"
        >
          Introducing new collection
        </motion.p>
        <motion.h1
          key={`mobile-heading-${activeImage}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-[11vw] leading-none text-white drop-shadow-md"
        >
          {activeImage === 0 ? <>Flawless Base.<br />Perfected.</> : <>Clear Skin.<br />Perfected.</>}
        </motion.h1>
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