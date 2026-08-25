import Link from 'next/link'
import { useState } from 'react'
import SeoHead, { siteUrl } from '../../components/SeoHead'
import Navbar from '../../components/Navbar'
import FooterSection from '../../components/FooterSection'
import ProductCard from '../../components/ProductCard'
import { getCollectionBySlug, getCollectionSlugs } from '../../lib/products'

export async function getStaticPaths() {
  const collections = await getCollectionSlugs()
  return { paths: collections.map(({ slug }) => ({ params: { slug } })), fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const collection = await getCollectionBySlug(params.slug)
  if (!collection) return { notFound: true }

  return { props: { collection }, revalidate: 60 }
}

export default function CollectionPage({ collection }) {
  const [showInStock, setShowInStock] = useState(false)
  const [showOutOfStock, setShowOutOfStock] = useState(false)
  const [minPriceInput, setMinPriceInput] = useState('0')
  const [maxPriceInput, setMaxPriceInput] = useState('3999')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3999 })
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sortBy, setSortBy] = useState('best')
  const [viewMode, setViewMode] = useState(4)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const title = collection.seo?.metaTitle || `${collection.name} | Shelby Cosmetics`
  const description = collection.seo?.metaDescription || collection.description || `Shop ${collection.name} collection from Shelby Cosmetics.`
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: collection.name, item: `${siteUrl}/collections/${collection.slug}` }
    ]
  }

  const products = collection.products?.length ? collection.products : []
  const sliderMin = Math.min(Number(minPriceInput) || 0, Number(maxPriceInput) || 0)
  const sliderMax = Math.max(Number(minPriceInput) || 0, Number(maxPriceInput) || 0)
  const sliderStart = `${(sliderMin / 3999) * 100}%`
  const sliderEnd = `${100 - (sliderMax / 3999) * 100}%`
  const inStockCount = products.filter((product) => product.stockStatus !== false).length
  const outOfStockCount = products.filter((product) => product.stockStatus === false).length

  const filteredProducts = products
    .filter((product) => {
      if (showInStock && product.stockStatus === false) return false
      if (showOutOfStock && product.stockStatus !== false) return false
      return product.price >= priceRange.min && product.price <= priceRange.max
    })
    .sort((firstProduct, secondProduct) => {
      if (sortBy === 'price-low') return firstProduct.price - secondProduct.price
      if (sortBy === 'price-high') return secondProduct.price - firstProduct.price
      return (secondProduct.soldCount || 0) - (firstProduct.soldCount || 0)
    })
    .slice(0, itemsPerPage)

  const applyPriceFilter = () => {
    const min = Math.max(0, Number(minPriceInput) || 0)
    const max = Math.max(min, Number(maxPriceInput) || 0)
    setPriceRange({ min, max })
  }

  return (
    <>
      <SeoHead title={title} description={description} image={collection.image} schema={breadcrumb} />
      <div className="min-h-screen bg-white text-[#141414]">
        <Navbar solid />
        <main className="mx-auto max-w-[1400px] px-2 pb-20 pt-28 sm:px-4 md:px-8 md:pt-32">
          
          {/* Top Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>›</span>
            <span className="text-black">{collection.name}</span>
          </div>

          {/* Full-width Header Section */}
          <div className="mb-10">
            <p className="text-sm font-medium text-neutral-600">{collection.name}</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-black md:text-4xl">
              {collection.contentTitle || `${collection.name} Collection`}
            </h1>
            {(collection.content || collection.description) && (
              <div className="mt-4 max-w-5xl space-y-3 text-sm leading-relaxed text-neutral-600">
                {(collection.content || collection.description)
                  .split('\n')
                  .filter(Boolean)
                  .map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            )}
          </div>

          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="hidden h-fit space-y-6 rounded-[12px] border border-stone-100 bg-[#fafafa] p-5 shadow-sm lg:block">
              {/* Categories */}
              <div className="border-b border-neutral-200 pb-4">
                <div className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Categories</h3>
                  <span className="text-neutral-400">^</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Link href="/collections/hydration" className="block text-sm text-neutral-600 hover:text-black">Hydration</Link>
                  <Link href="/collections/brightening" className="block text-sm text-neutral-600 hover:text-black">Brightening</Link>
                  <Link href="/collections/repair" className="block text-sm text-neutral-600 hover:text-black">Repair</Link>
                  <Link href="/collections/firming" className="block text-sm text-neutral-600 hover:text-black">Firming</Link>
                  <Link href="/collections/radiance" className="block text-sm text-neutral-600 hover:text-black">Radiance</Link>
                </div>
              </div>

              {/* Availability */}
              <div className="border-b border-neutral-200 pb-4">
                <div className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Availability</h3>
                  <span className="text-neutral-400">^</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-neutral-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={showInStock} onChange={(event) => setShowInStock(event.target.checked)} className="h-4 w-4 rounded-[4px] border-neutral-300 accent-[#be315b]" />
                    In Stock ({inStockCount})
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-400">
                    <input type="checkbox" checked={showOutOfStock} onChange={(event) => setShowOutOfStock(event.target.checked)} className="h-4 w-4 rounded-[4px] border-neutral-300 accent-[#be315b]" />
                    Out Of Stock ({outOfStockCount})
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="border-b border-neutral-200 pb-4">
                <div className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Price</h3>
                  <span className="text-neutral-400">^</span>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="price-range relative h-5 w-full">
                    <div className="price-range-track" />
                    <div className="price-range-fill" style={{ left: sliderStart, right: sliderEnd }} />
                    <input
                      type="range"
                      min="0"
                      max="3999"
                      value={minPriceInput}
                      onChange={(event) => setMinPriceInput(event.target.value)}
                      aria-label="Minimum price"
                      className="price-range-input"
                    />
                    <input
                      type="range"
                      min="0"
                      max="3999"
                      value={maxPriceInput}
                      onChange={(event) => setMaxPriceInput(event.target.value)}
                      aria-label="Maximum price"
                      className="price-range-input"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2">
                      <span className="text-xs text-neutral-500">Rs</span>
                      <input type="number" value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                    <span className="text-xs text-neutral-500">to</span>
                    <div className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2">
                      <span className="text-xs text-neutral-500">Rs</span>
                      <input type="number" value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                  </div>
                  <button type="button" onClick={applyPriceFilter} className="w-full rounded-[8px] bg-[#141414] px-3 py-3 text-[12px] font-bold uppercase tracking-[0.05em] text-white hover:bg-[#2a2a2a] transition">
                    Apply
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="p-0">
              {/* Premium Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 lg:hidden">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <path d="M4 5h16M7 12h10M10 19h4" />
                    </svg>
                    Filter
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">View</span>
                  
                  <div className="flex items-center rounded-full border border-neutral-200/80 bg-neutral-50/50 p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                    {[1, 2, 3, 4, 5].map((cols) => {
                      const isActive = viewMode === cols;
                      return (
                        <button
                          key={cols}
                          type="button"
                          aria-label={cols === 1 ? 'Show list view' : `Show ${cols} columns`}
                          title={cols === 1 ? 'List view' : `${cols} columns`}
                          onClick={() => setViewMode(cols)}
                          className={`${cols > 2 ? 'hidden md:flex' : 'flex'} h-[28px] w-[34px] items-center justify-center rounded-full transition-all duration-300 ease-out ${
                            isActive
                              ? 'bg-[#141414] text-white shadow-md'
                              : 'bg-transparent text-neutral-400 hover:bg-neutral-200/50 hover:text-neutral-700'
                          }`}
                        >
                          {cols === 1 && (
                            <svg className="h-[14px] w-[14px]" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                              <line x1="2" y1="3" x2="12" y2="3" />
                              <line x1="2" y1="7" x2="12" y2="7" />
                              <line x1="2" y1="11" x2="12" y2="11" />
                            </svg>
                          )}
                          {cols === 2 && (
                            <svg className="h-[12px] w-[12px]" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="2" y="1" width="4" height="12" rx="0.75" />
                              <rect x="8" y="1" width="4" height="12" rx="0.75" />
                            </svg>
                          )}
                          {cols === 3 && (
                            <svg className="h-[12px] w-[14px]" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="1" y="1" width="2.5" height="12" rx="0.5" />
                              <rect x="5.75" y="1" width="2.5" height="12" rx="0.5" />
                              <rect x="10.5" y="1" width="2.5" height="12" rx="0.5" />
                            </svg>
                          )}
                          {cols === 4 && (
                            <svg className="h-[12px] w-[14px]" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="0.5" y="1" width="1.75" height="12" rx="0.5" />
                              <rect x="4.25" y="1" width="1.75" height="12" rx="0.5" />
                              <rect x="8" y="1" width="1.75" height="12" rx="0.5" />
                              <rect x="11.75" y="1" width="1.75" height="12" rx="0.5" />
                            </svg>
                          )}
                          {cols === 5 && (
                            <svg className="h-[12px] w-[16px]" viewBox="0 0 16 14" fill="currentColor">
                              <rect x="0.5" y="1" width="1.5" height="12" rx="0.5" />
                              <rect x="3.75" y="1" width="1.5" height="12" rx="0.5" />
                              <rect x="7" y="1" width="1.5" height="12" rx="0.5" />
                              <rect x="10.25" y="1" width="1.5" height="12" rx="0.5" />
                              <rect x="13.5" y="1" width="1.5" height="12" rx="0.5" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">Show</span>
                    <select value={itemsPerPage} onChange={(event) => setItemsPerPage(Number(event.target.value))} className="cursor-pointer appearance-none rounded-full border border-neutral-200 bg-transparent py-1.5 pl-3 pr-8 text-xs font-medium outline-none transition hover:border-neutral-300 focus:border-[#141414] focus:ring-1 focus:ring-[#141414]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}>
                      <option value={20}>20</option>
                      <option value={40}>40</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">Sort</span>
                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="cursor-pointer appearance-none rounded-full border border-neutral-200 bg-transparent py-1.5 pl-3 pr-8 text-xs font-medium outline-none transition hover:border-neutral-300 focus:border-[#141414] focus:ring-1 focus:ring-[#141414]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}>
                      <option value="best">Best selling</option>
                      <option value="price-low">Price, low to high</option>
                      <option value="price-high">Price, high to low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className={`grid items-stretch gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-16 ${viewMode === 1 ? 'grid-cols-1' : viewMode === 2 ? 'grid-cols-2' : viewMode === 3 ? 'grid-cols-2 lg:grid-cols-3' : viewMode === 5 ? 'grid-cols-2 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-4'}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} viewMode={viewMode} />
                ))}
                {filteredProducts.length === 0 && (
                  <p className="col-span-full py-16 text-center text-sm text-neutral-500">
                    No products match the selected filters.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className={`fixed inset-0 z-[70] transition-opacity duration-300 lg:hidden ${isFilterOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} role="dialog" aria-modal="true" aria-label="Collection filters" aria-hidden={!isFilterOpen}>
              <button type="button" aria-label="Close filters" onClick={() => setIsFilterOpen(false)} className="absolute inset-0 bg-black/50" />
              <aside className={`relative h-full w-[min(86vw,360px)] overflow-y-auto bg-white px-5 pb-10 pt-6 shadow-2xl transition-transform duration-300 ease-out ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="mb-7 flex items-center justify-between border-b border-neutral-200 pb-4">
                  <h2 className="font-serif text-2xl text-black">Filters</h2>
                  <button type="button" aria-label="Close filters" onClick={() => setIsFilterOpen(false)} className="text-2xl leading-none text-neutral-600">×</button>
                </div>
                <div className="space-y-7">
                  <div className="border-b border-neutral-200 pb-5">
                    <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Availability</h3>
                    <div className="mt-4 space-y-3 text-sm text-neutral-600">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={showInStock} onChange={(event) => setShowInStock(event.target.checked)} className="h-4 w-4 accent-[#be315b]" /> In Stock ({inStockCount})</label>
                      <label className="flex items-center gap-2 text-neutral-400"><input type="checkbox" checked={showOutOfStock} onChange={(event) => setShowOutOfStock(event.target.checked)} className="h-4 w-4 accent-[#be315b]" /> Out Of Stock ({outOfStockCount})</label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">Price</h3>
                    <div className="mt-6 space-y-4">
                      <div className="price-range relative h-5 w-full">
                        <div className="price-range-track" />
                        <div className="price-range-fill" style={{ left: sliderStart, right: sliderEnd }} />
                        <input type="range" min="0" max="3999" value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} aria-label="Minimum price" className="price-range-input" />
                        <input type="range" min="0" max="3999" value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} aria-label="Maximum price" className="price-range-input" />
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <label className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2"><span className="text-xs text-neutral-500">Rs</span><input type="number" value={minPriceInput} onChange={(event) => setMinPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" aria-label="Minimum price input" /></label>
                        <span className="text-xs text-neutral-500">to</span>
                        <label className="flex flex-1 items-center gap-1 rounded-[6px] border border-neutral-300 px-2 py-2"><span className="text-xs text-neutral-500">Rs</span><input type="number" value={maxPriceInput} onChange={(event) => setMaxPriceInput(event.target.value)} className="w-full bg-transparent text-sm outline-none" aria-label="Maximum price input" /></label>
                      </div>
                      <button type="button" onClick={() => { applyPriceFilter(); setIsFilterOpen(false) }} className="w-full rounded-[8px] bg-[#141414] px-3 py-3 text-[12px] font-bold uppercase tracking-[0.05em] text-white">Apply</button>
                    </div>
                  </div>
                </div>
              </aside>
          </div>

          <section className="mt-20 border-t border-stone-200 pt-12">
            <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl">
              {collection.whyTitle || `Why Choose Our ${collection.name} Range?`}
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-600 md:text-base">
              {collection.whyContent || `Explore our ${collection.name.toLowerCase()} range, selected for quality, comfort, and dependable results in your everyday routine.`}
            </p>
          </section>
        </main>
        <FooterSection />
      </div>
    </>
  )
}