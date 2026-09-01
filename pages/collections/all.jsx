import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SeoHead from '../../components/SeoHead'
import Navbar from '../../components/Navbar'
import FooterSection from '../../components/FooterSection'
import ProductCard from '../../components/ProductCard'
import { getCollections, getProducts } from '../../lib/products'

const PRODUCTS_PER_PAGE = 20
const MAX_PRICE = 3999

export async function getStaticProps() {
  const products = await getProducts()
  const collections = await getCollections()
  return { props: { products, collections }, revalidate: 60 }
}

export default function AllCollectionsPage({ products = [], collections = [] }) {
  const router = useRouter()
  const [showInStock, setShowInStock] = useState(false)
  const [showOutOfStock, setShowOutOfStock] = useState(false)
  const [minPriceInput, setMinPriceInput] = useState('0')
  const [maxPriceInput, setMaxPriceInput] = useState(String(MAX_PRICE))
  const [priceRange, setPriceRange] = useState({ min: 0, max: MAX_PRICE })
  const [itemsPerPage, setItemsPerPage] = useState(PRODUCTS_PER_PAGE)
  const [sortBy, setSortBy] = useState('best')
  const [viewMode, setViewMode] = useState(4)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const requestedPage = Number.parseInt(router.query.page, 10)
  const searchQuery = typeof router.query.search === 'string' ? router.query.search.trim() : ''
  const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
  const inStockCount = products.filter((product) => product.stockStatus !== false).length
  const outOfStockCount = products.filter((product) => product.stockStatus === false).length
  const sliderMin = Math.min(Number(minPriceInput) || 0, Number(maxPriceInput) || 0)
  const sliderMax = Math.max(Number(minPriceInput) || 0, Number(maxPriceInput) || 0)
  const sliderStart = `${(sliderMin / MAX_PRICE) * 100}%`
  const sliderEnd = `${100 - (sliderMax / MAX_PRICE) * 100}%`
  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const searchableText = [
        product.name,
        product.vendor,
        product.category,
        product.subcategory,
        product.sku,
        product.shortDescription,
        product.fullDescription
      ].filter(Boolean).join(' ').toLowerCase()
      if (!searchableText.includes(searchQuery.toLowerCase())) return false
    }
    if (showInStock && product.stockStatus === false) return false
    if (showOutOfStock && product.stockStatus !== false) return false
    return product.price >= priceRange.min && product.price <= priceRange.max
  })
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const applyPriceFilter = () => {
    const min = Math.max(0, Number(minPriceInput) || 0)
    const max = Math.min(MAX_PRICE, Math.max(min, Number(maxPriceInput) || 0))
    setPriceRange({ min, max })
  }

  return (
    <>
      <SeoHead
        title="Buy Makeup & Cosmetics Online in Pakistan | Shelby Cosmetics"
        description="Shop imported makeup, skincare & nail products from Huda Beauty, Dermacol & more. Affordable prices, nationwide delivery across Pakistan."
      />
      <div className="min-h-screen bg-white text-[#141414]">
        <Navbar solid />
        <main className="mx-auto max-w-[1400px] px-2 pb-20 pt-28 sm:px-4 md:px-8 md:pt-32">
          <div className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>›</span>
            <span className="text-black">Shop All</span>
          </div>

          <div className="mb-10">
            <p className="text-sm font-medium text-neutral-600">Shop All</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-black md:text-4xl">{searchQuery ? `Search results for "${searchQuery}"` : 'All Products Collection'}</h1>
            {!searchQuery && (
              <p className="mt-4 max-w-5xl text-sm leading-relaxed text-neutral-600">
                From imported makeup and skincare to nail art and beauty tools, explore Shelby Cosmetics' full collection trusted brands like Huda Beauty, Dermacol and emelie Paris, at honest prices, delivered nationwide across Pakistan.
              </p>
            )}
          </div>

          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="hidden h-fit space-y-6 rounded-[12px] border border-stone-100 bg-[#fafafa] p-5 shadow-sm lg:block">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <h2 className="text-[13px] font-bold uppercase tracking-wide text-black">Collections</h2>
                  <span className="text-neutral-400">^</span>
                </div>
                <div className="no-scrollbar mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
                  {collections.map((collection) => (
                    <Link key={collection.slug} href={`/collections/${collection.slug}`} className="block text-sm text-neutral-600 hover:text-black">
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[13px] font-bold uppercase tracking-wide text-black">Availability</h2>
                  <span className="text-neutral-400">^</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-neutral-600">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" checked={showInStock} onChange={(event) => setShowInStock(event.target.checked)} className="h-4 w-4 rounded-[4px] border-neutral-300 accent-[#be315b]" />
                    In Stock ({inStockCount})
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-neutral-400">
                    <input type="checkbox" checked={showOutOfStock} onChange={(event) => setShowOutOfStock(event.target.checked)} className="h-4 w-4 rounded-[4px] border-neutral-300 accent-[#be315b]" />
                    Out Of Stock ({outOfStockCount})
                  </label>
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[13px] font-bold uppercase tracking-wide text-black">Price</h2>
                  <span className="text-neutral-400">^</span>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="relative h-5 w-full">
                    <div className="price-range-track" />
                    <div className="price-range-fill" style={{ left: sliderStart, right: sliderEnd }} />
                    <input type="range" min="0" max={MAX_PRICE} value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} aria-label="Minimum price" className="price-range-input" />
                    <input type="range" min="0" max={MAX_PRICE} value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} aria-label="Maximum price" className="price-range-input" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2">
                      <span className="text-xs text-neutral-500">Rs</span>
                      <input type="number" min="0" max={MAX_PRICE} value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                    <span className="text-xs text-neutral-500">to</span>
                    <div className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2">
                      <span className="text-xs text-neutral-500">Rs</span>
                      <input type="number" min="0" max={MAX_PRICE} value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                  </div>
                  <button type="button" onClick={applyPriceFilter} className="w-full rounded-[8px] bg-[#141414] px-3 py-3 text-[12px] font-bold uppercase tracking-[0.05em] text-white transition hover:bg-[#2a2a2a]">Apply</button>
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-5 text-sm text-neutral-600">
                Showing {filteredProducts.length ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </aside>

            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 lg:hidden">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 5h16M7 12h10M10 19h4" /></svg>
                    Filter
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">View</span>
                  <div className="flex items-center rounded-full border border-neutral-200/80 bg-neutral-50/50 p-1">
                    {[1, 2, 3, 4, 5].map((cols) => (
                      <button key={cols} type="button" onClick={() => setViewMode(cols)} aria-label={cols === 1 ? 'Show list view' : `Show ${cols} columns`} className={`${cols > 2 ? 'hidden md:flex' : 'flex'} h-[28px] w-[34px] items-center justify-center rounded-full transition ${viewMode === cols ? 'bg-[#141414] text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-200/50 hover:text-neutral-700'}`}>
                        <span className={`flex h-3 items-stretch gap-[2px] ${cols === 1 ? 'w-4 flex-col justify-between' : 'w-3.5'}`}>{Array.from({ length: cols }, (_, index) => <span key={index} className={cols === 1 ? 'h-px w-full bg-current' : 'flex-1 rounded-sm bg-current'} />)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <label className="flex items-center gap-3"><span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">Show</span><select value={itemsPerPage} onChange={(event) => setItemsPerPage(Number(event.target.value))} className="cursor-pointer rounded-full border border-neutral-200 bg-transparent px-3 py-1.5 text-xs font-medium outline-none"><option value={20}>20</option><option value={40}>40</option></select></label>
                  <label className="flex items-center gap-3"><span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">Sort</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="cursor-pointer rounded-full border border-neutral-200 bg-transparent px-3 py-1.5 text-xs font-medium outline-none"><option value="best">Best selling</option><option value="price-low">Price, low to high</option><option value="price-high">Price, high to low</option></select></label>
                </div>
              </div>

              <div className={`grid items-stretch gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-16 ${viewMode === 1 ? 'grid-cols-1' : viewMode === 2 ? 'grid-cols-2' : viewMode === 3 ? 'grid-cols-2 lg:grid-cols-3' : viewMode === 5 ? 'grid-cols-2 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-4'}`}>
                {visibleProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} viewMode={viewMode} />
                ))}
                {!visibleProducts.length && <p className="col-span-full py-16 text-center text-sm text-neutral-500">No products match the selected filters.</p>}
              </div>

              <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Products pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Link
                    key={page}
                    href={page === 1 ? (searchQuery ? `/collections/all?search=${encodeURIComponent(searchQuery)}` : '/collections/all') : `/collections/all?page=${page}${searchParam}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${page === currentPage ? 'border-[#be315b] bg-[#be315b] text-white' : 'border-neutral-200 text-neutral-600 hover:border-[#be315b] hover:text-[#be315b]'}`}
                  >
                    {page}
                  </Link>
                ))}
              </nav>
            </section>
          </div>

          <div className={`fixed inset-0 z-[70] transition-opacity duration-300 lg:hidden ${isFilterOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} role="dialog" aria-modal="true" aria-label="Product filters" aria-hidden={!isFilterOpen}>
            <button type="button" aria-label="Close filters" onClick={() => setIsFilterOpen(false)} className="absolute inset-0 bg-black/50" />
            <aside className={`relative h-full w-[min(86vw,360px)] overflow-y-auto bg-white px-5 pb-10 pt-6 shadow-2xl transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="mb-7 flex items-center justify-between border-b border-neutral-200 pb-4">
                <h2 className="font-serif text-2xl text-black">Filters</h2>
                <button type="button" aria-label="Close filters" onClick={() => setIsFilterOpen(false)} className="text-2xl leading-none text-neutral-600">×</button>
              </div>
              <div className="space-y-7">
                <div className="border-b border-neutral-200 pb-5">
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Collections</h3>
                  <div className="mt-4 max-h-56 space-y-2 overflow-y-auto text-sm text-neutral-600">
                    {collections.map((collection) => <Link key={collection.slug} href={`/collections/${collection.slug}`} className="block">{collection.name}</Link>)}
                  </div>
                </div>
                <div className="border-b border-neutral-200 pb-5">
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Availability</h3>
                  <div className="mt-4 space-y-3 text-sm text-neutral-600">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={showInStock} onChange={(event) => setShowInStock(event.target.checked)} className="h-4 w-4 accent-[#be315b]" /> In Stock ({inStockCount})</label>
                    <label className="flex items-center gap-2 text-neutral-400"><input type="checkbox" checked={showOutOfStock} onChange={(event) => setShowOutOfStock(event.target.checked)} className="h-4 w-4 accent-[#be315b]" /> Out Of Stock ({outOfStockCount})</label>
                  </div>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Price</h3>
                  <div className="mt-5 space-y-4">
                    <div className="relative h-5 w-full"><div className="price-range-track" /><div className="price-range-fill" style={{ left: sliderStart, right: sliderEnd }} /><input type="range" min="0" max={MAX_PRICE} value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} aria-label="Minimum price" className="price-range-input" /><input type="range" min="0" max={MAX_PRICE} value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} aria-label="Maximum price" className="price-range-input" /></div>
                    <div className="flex items-center gap-2"><label className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2"><span className="text-xs text-neutral-500">Rs</span><input type="number" value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" /></label><span className="text-xs text-neutral-500">to</span><label className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2"><span className="text-xs text-neutral-500">Rs</span><input type="number" value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" /></label></div>
                    <button type="button" onClick={() => { applyPriceFilter(); setIsFilterOpen(false) }} className="w-full rounded-[8px] bg-[#141414] px-3 py-3 text-[12px] font-bold uppercase tracking-[0.05em] text-white">Apply</button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
        <FooterSection />
      </div>
    </>
  )
}
