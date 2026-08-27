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
    {/* FIX 1: Use h-screen and justify-end to force content to the bottom edge */}
    <section className="relative w-full min-h-[700px] md:h-screen flex flex-col justify-end">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 hidden transition-opacity duration-1000 ease-in-out md:block ${
              index === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* FIX 2: Changed to bg-cover to stop the image from squishing at different zooms */}
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
              index === activeImage % mobileBannerImages.length ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content Wrapper (Desktop) */}
      {/* FIX 3: Removed gap/between and added pb-24 to push it cleanly into the bottom-left corner */}
      <div className="relative z-10 hidden w-full max-w-[1600px] mx-auto px-4 md:flex flex-col items-start md:px-12 pb-16 lg:pb-28">
        <div key={activeImage} className="flex w-full max-w-md flex-col items-start text-left md:max-w-lg lg:max-w-xl">
          
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
            className={`${activeImage === 0 || activeImage === 1 ? 'text-[8.5vw] sm:text-6xl lg:text-7xl' : 'text-[6vw] sm:text-4xl lg:text-5xl'} leading-tight font-serif text-white drop-shadow-md`}
          >
            {activeImage === 0 ? <>Flawless Base.<br />Perfected.</> : activeImage === 1 ? 'Clear Skin. Perfected.' : 'SHELBY COSMETICS'}
          </motion.h1>
          
          {activeImage === 0 ? (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4 text-sm text-white/95 leading-relaxed drop-shadow-sm sm:text-base md:text-lg"
            >
              Shop Emelie &amp; Huda Beauty Foundations
            </motion.p>
          ) : activeImage === 1 ? (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4 text-sm text-white/95 leading-relaxed drop-shadow-sm sm:text-base md:text-lg"
            >
              Shop Sadoer skincare essentials
            </motion.p>
          ) : activeImage !== 1 && (
            <motion.p 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.15, duration: 0.6 }} 
              className="mt-4 text-[11px] sm:text-xs md:text-sm text-white/95 leading-relaxed max-w-[280px] sm:max-w-sm drop-shadow-sm"
            >
              Affordable makeup in Pakistan, imported beauty essentials, and honest prices — shipped nationwide from Karachi.
            </motion.p>
          )}
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="mt-8 w-full max-w-[280px]"
          >
            <button className="w-full py-3.5 bg-[#be315b] hover:bg-[#a82a50] transition-colors text-white text-xs font-bold tracking-widest rounded-full uppercase shadow-lg text-center">
              SHOP NOW
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Wrapper (Mobile) */}
      <div className="relative z-10 flex w-full flex-col items-start px-4 pb-20 text-left md:hidden">
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
          className="font-serif text-[11vw] leading-tight text-white drop-shadow-md"
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