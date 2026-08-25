import ProductCard from './ProductCard'

export default function ProductsSection({
  products = [],
  title = 'FEATURED PRODUCTS',
  eyebrow = 'OUR COLLECTION',
  brandName = 'Shelby Cosmetics',
  saleLabel = 'Sale'
}) {
  const fallbackProducts = [
    {
      id: 'hydra-boost-serum',
      slug: 'hydra-boost-serum',
      name: 'Hydra Boost Serum',
      price: 1264,
      originalPrice: 1399,
      images: [{ url: '/Home%20page%20images/2ddad497-8876-42bd-918a-e60aedb39018.png', alt: 'Hydra Boost Serum' }]
    },
    {
      id: 'glow-renew-serum',
      slug: 'glow-renew-serum',
      name: 'Glow Renew Serum',
      price: 1429,
      originalPrice: 1559,
      images: [{ url: '/Home%20page%20images/f2e34db9-f663-4cf8-93a3-18f6539a7bb6.png', alt: 'Glow Renew Serum' }]
    },
    {
      id: 'barrier-repair-serum',
      slug: 'barrier-repair-serum',
      name: 'Barrier Repair Serum',
      price: 899,
      originalPrice: 1079,
      images: [{ url: '/Home%20page%20images/d0467245-f545-4a2d-be84-2b0328c115f8.png', alt: 'Barrier Repair Serum' }]
    },
    {
      id: 'peptide-firm-serum',
      slug: 'peptide-firm-serum',
      name: 'Peptide Firm Serum',
      price: 1264,
      originalPrice: 1399,
      images: [{ url: '/Home%20page%20images/2ddad497-8876-42bd-918a-e60aedb39018.png', alt: 'Peptide Firm Serum' }]
    },
    {
      id: 'dew-essence-serum',
      slug: 'dew-essence-serum',
      name: 'Dew Essence Serum',
      price: 1429,
      originalPrice: 1559,
      images: [{ url: '/Home%20page%20images/f2e34db9-f663-4cf8-93a3-18f6539a7bb6.png', alt: 'Dew Essence Serum' }]
    }
  ]
  const visibleProducts = (products?.length ? products : fallbackProducts).slice(0, 4)
  const isBestSellerSection = title.toLowerCase().includes('best seller')

  return (
    <section className="w-full overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto w-full px-2 text-center sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#be315b] sm:text-xs">
          <span>❖</span>
          <span>{eyebrow}</span>
          <span>❖</span>
        </div>
        <div className="relative mb-10 flex items-center justify-center gap-4 sm:mb-16">
          <h2 className="w-full text-center font-serif text-3xl font-bold uppercase leading-[0.9] tracking-[-0.04em] text-black sm:text-4xl lg:text-[46px]">{title}</h2>
        </div>

        <div className="no-scrollbar mx-auto flex w-full max-w-[1400px] snap-x snap-mandatory gap-3 overflow-x-auto px-0 pb-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid lg:grid-cols-4 lg:gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id || product.slug} className="w-[calc((100%-0.75rem)/2)] min-w-[calc((100%-0.75rem)/2)] snap-start sm:w-auto sm:min-w-0 sm:flex-1 lg:w-auto lg:min-w-0">
              <ProductCard product={product} showReviewCount={isBestSellerSection} />
            </div>
          ))}
          </div>
      </div>
    </section>
  )
}