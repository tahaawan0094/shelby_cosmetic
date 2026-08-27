import { useEffect, useState } from 'react'

const bannerImages = [
  '/Home%20page%20images/banner-0001.webp',
  '/Home%20page%20images/banner-0002.webp',
  '/Home%20page%20images/banner-0003.webp'
]

const mobileBannerImages = [
  '/Home%20page%20images/mobile-banner-01.webp',
  '/Home%20page%20images/mobile-banner-02.webp',
  '/Home%20page%20images/mobile-banner-03.webp',
  ...bannerImages
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
    <section className="relative aspect-[1030/1536] w-full min-h-0 flex flex-col justify-end md:aspect-auto md:min-h-[700px] md:h-screen">
      
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