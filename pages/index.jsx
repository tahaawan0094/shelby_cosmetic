import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import BenefitsSection from '../components/BenefitsSection'
import ProductsSection from '../components/ProductsSection'
import BeautyToolsSection from '../components/BeautyToolsSection'
import ResultsSection from '../components/ResultsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import DealSection from '../components/DealSection'
import PurchaseSection from '../components/PurchaseSection'
import FAQSection from '../components/FAQSection'
import FooterSection from '../components/FooterSection'
import SeoHead from '../components/SeoHead'
import CategoryCarousel from '../components/CategoryCarousel'
import { getCategories, getCollections, getProducts } from '../lib/products'

const featuredCollectionImages = {
  liner: '/Home%20page%20images/carousel%20images/liner-collectiom.webp',
  brow: '/Home%20page%20images/carousel%20images/brow-collection.webp',
  foundation: '/Home%20page%20images/carousel%20images/foundation-collection.webp',
  gloss: '/Home%20page%20images/carousel%20images/gloss-collection.webp',
  mascara: '/Home%20page%20images/carousel%20images/mascara-collection.webp',
  palette: '/Home%20page%20images/carousel%20images/palette-collection.webp',
  powder: '/Home%20page%20images/carousel%20images/powder-collection.webp'
}

const featuredCollectionSlugs = Object.keys(featuredCollectionImages)

export async function getStaticProps() {
  const products = await getProducts()
  const categories = await getCategories()
  const collections = await getCollections()
  return { props: { products, categories, collections }, revalidate: 60 }
}

export default function Home({ products = [], categories = [], collections = [] }) {
  const safeCategories = Array.isArray(categories) ? categories : []
  const safeCollections = (Array.isArray(collections) ? collections : [])
    .filter((collection) => collection.productCount > 1)
    .filter((collection) => featuredCollectionSlugs.includes(collection.slug))
    .sort((firstCollection, secondCollection) => (
      featuredCollectionSlugs.indexOf(firstCollection.slug) - featuredCollectionSlugs.indexOf(secondCollection.slug)
    ))
    .map((collection) => ({
      ...collection,
      image: featuredCollectionImages[collection.slug]
    }))

  return (
    <>
      <SeoHead
        title="Shelby Cosmetics | Best Online Cosmetics Store in Pakistan"
        description="Buy cosmetics online in Pakistan at Shelby Cosmetics — imported makeup & skincare at the best price. Karachi-based online cosmetics store, nationwide delivery."
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <CategoryCarousel categories={safeCollections} />
          <FeatureSection />
          
          {/* Best Sellers Section */}
          <ProductsSection products={products.slice(0, 4).reverse()} title="BEST SELLERS" eyebrow="BEST SELLERS" brandName="Shelby Cosmetics" saleLabel="Sale" />

          <BeautyToolsSection products={products} />

          <BenefitsSection />

          {/* Main Products List / General Section */}
          <ProductsSection products={products} />
          
          <ResultsSection />
          
          {/* Note: Neeche wala extra "FEATURED PRODUCTS" section yahan se remove kar diya gaya hai */}

          <TestimonialsSection />
          <DealSection />
          <PurchaseSection products={products} />
          <FAQSection />
          <FooterSection />
        </main>
      </div>
    </>
  )
}