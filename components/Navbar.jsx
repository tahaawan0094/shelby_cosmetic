'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../lib/contexts/CartContext'
import { useWishlist } from '../lib/contexts/WishlistContext'
import { useAuth } from '../lib/contexts/AuthContext'

export default function Navbar({ solid = false }) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeCollection, setActiveCollection] = useState(null)
  const [mobileTab, setMobileTab] = useState('menu')
  const [openMobileCategory, setOpenMobileCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [products, setProducts] = useState([])

  const { cartItems, mounted: cartMounted } = useCart()
  const { wishlistItems, mounted: wishlistMounted } = useWishlist()
  const { user, logout } = useAuth()
  
  const isSolid = solid || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let isMounted = true

    fetch('/api/categories', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : [])
      .then((nextCategories) => {
        if (isMounted && Array.isArray(nextCategories)) {
          setCategories(nextCategories)
        }
      })
      .catch(() => {
        if (isMounted) setCategories([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    fetch('/api/products', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : [])
      .then((nextProducts) => {
        if (isMounted && Array.isArray(nextProducts)) setProducts(nextProducts)
      })
      .catch(() => {
        if (isMounted) setProducts([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-category-dropdown]')) {
        setIsDropdownOpen(false)
        setActiveCollection(null)
      }
      if (!e.target.closest('[data-user-dropdown]')) {
        setIsUserMenuOpen(false)
      }
      if (!e.target.closest('[data-search-dropdown]')) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleCollectionClick = (e) => {
    e.preventDefault()
    if (isDropdownOpen) {
      setIsDropdownOpen(false)
      setActiveCollection(null)
      return
    }
    setIsDropdownOpen(true)
  }

  const handleCollectionLinkClick = () => {
    setIsDropdownOpen(false)
    setActiveCollection(null)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const query = searchTerm.trim()
    router.push(query ? `/collections/all?search=${encodeURIComponent(query)}` : '/collections/all')
    setIsSearchOpen(false)
    setIsMobileOpen(false)
  }

  const searchResults = searchTerm.trim()
    ? products.filter((product) => {
      const searchableText = [product.name, product.vendor, product.category, product.subcategory, product.sku]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return searchableText.includes(searchTerm.trim().toLowerCase())
    }).slice(0, 5)
    : []

  return (
    <header className={`w-full z-50 fixed left-0 transition-all duration-500 border-b ${
      isSolid
        ? 'backdrop-blur-xl bg-white/90 border-neutral-200 shadow-md text-neutral-900' 
        : 'bg-transparent border-white/30 text-white'
    }`}>

      <div className="announcement-bar flex h-7 items-center overflow-hidden bg-[#be315b] text-[9px] font-semibold uppercase tracking-[0.12em] text-white sm:h-8 sm:text-[10px]">
        <div className="announcement-track flex shrink-0 items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="announcement-segment flex shrink-0 items-center">
              <div className="flex shrink-0 items-center gap-2 px-8 sm:px-12">
                <svg className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.2 2 4 13h6.2L9.8 22 20 9.5h-6.4L13.2 2Z" />
                </svg>
                <span>Discount up to 20% off on entire products</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 px-8 sm:px-12">
                <svg className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.2 2 4 13h6.2L9.8 22 20 9.5h-6.4L13.2 2Z" />
                </svg>
                <span>Exclusive beauty picks, made for you</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 1. Massive Logo Text */}
      <div className={`w-full flex justify-center px-4 overflow-hidden transition-all duration-500 origin-top ${
        isSolid ? 'h-0 opacity-0 scale-95' : 'h-auto opacity-100 scale-100 pt-6 md:pt-8'
      }`}>
        <Link href="/">
          <h1 className="text-[8.5vw] leading-none font-serif text-white/90 mix-blend-overlay drop-shadow-sm whitespace-nowrap cursor-pointer">
            TIMELESS BEAUTY
          </h1>
        </Link>
      </div>

      {/* 2. Sub Navigation Bar */}
      <div className={`w-full px-4 md:px-12 flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium transition-all duration-500 ${
        isSolid ? 'py-3' : 'py-4 md:pt-6 md:pb-4'
      }`}>
        
        {/* Left: Tagline / Brand Logo */}
        <div className="w-auto md:w-1/4 flex text-left relative items-center h-10 z-50">
          <p className={`hidden lg:block absolute left-0 whitespace-nowrap transition-all duration-500 ${
            isSolid ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-80 translate-y-0 text-white'
          }`}>
            Luxury Skincare and Hair care products
          </p>
          
          <Link href="/" className={`absolute left-0 flex items-center gap-1.5 transition-all duration-500 text-neutral-900 ${
            isSolid ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
            <img 
              src="/logo/Skin_Care___3_-removebg-preview.png" 
              alt="Shelby logo" 
              className="h-8 md:h-12 w-auto object-contain" 
            />
            <span className="font-serif text-sm md:text-lg tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
              Shelby Cosmetics
            </span>
          </Link>
        </div>

        {/* Center: Nav Links (Desktop Only) */}
        <nav className="hidden md:flex items-center justify-center gap-8 w-2/4">
          <Link href="/" className="hover:opacity-75 transition-all">Home</Link>
          <Link href="/collections/all" className="hover:opacity-75 transition-all">Products</Link>

          {/* === COLLECTION DROPDOWN CONTAINER === */}
          <div 
            className="relative"
            data-category-dropdown
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => {
              if (!isDropdownOpen) {
                setIsDropdownOpen(false)
                setActiveCollection(null)
              }
            }}
          >
            <button 
              onClick={handleCollectionClick}
              className="flex items-center gap-1.5 hover:opacity-75 transition-all uppercase tracking-[0.15em] focus:outline-none py-1"
            >
              <span>Categories</span>
              <svg 
                className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* MAIN DROPDOWN BOX */}
            <div className={`absolute left-0 top-full mt-4 w-[280px] rounded-lg border border-neutral-200 bg-white shadow-2xl transition-all duration-300 z-50 py-3 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="px-6 py-3">
                <Link href="/collections/all" className="text-[13px] font-bold text-neutral-900 uppercase tracking-wide hover:text-rose-500 transition-colors">
                  ALL PRODUCTS
                </Link>
              </div>

              {categories.map((category) => (
                <div key={category.slug} className="group relative w-full">
                  <div className="flex w-full px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-neutral-900 transition-colors group-hover:text-rose-500 cursor-pointer">
                    <span>{category.name}</span>
                    {category.subcategories?.length ? <span className="ml-auto">›</span> : null}
                  </div>
                  {category.subcategories?.length ? (
                    <div className="invisible absolute left-full top-0 w-[240px] rounded-lg border border-neutral-200 bg-white py-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.slug}
                          href={`/collections/${subcategory.slug}`}
                          onClick={handleCollectionLinkClick}
                          className="block px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-neutral-800 hover:text-rose-500"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {/* === END COLLECTION DROPDOWN === */}

          <Link href="/about" className="hover:opacity-75 transition-all">About</Link>
        </nav>

        {/* Right: Wishlist, Cart, Profile & Mobile Toggle */}
        <div className="w-auto md:w-1/4 flex justify-end items-center gap-3 sm:gap-4 z-50">
          <div className="relative" data-search-dropdown>
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search products"
              aria-expanded={isSearchOpen}
              className={`p-1 transition-all hover:opacity-75 ${isSolid ? 'text-neutral-800' : 'text-white'}`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path strokeLinecap="round" d="m16 16 4 4" />
              </svg>
            </button>
            {isSearchOpen && (
              <div className="fixed left-0 top-0 right-0 bottom-0 z-[60] h-screen w-full overflow-y-auto rounded-none border-0 bg-white text-neutral-900 shadow-xl md:absolute md:bottom-auto md:left-auto md:right-0 md:top-full md:h-auto md:mt-3 md:w-[min(78vw,280px)] md:overflow-visible md:rounded-md md:border md:border-neutral-200">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3 md:border-0 md:px-3 md:py-2" role="search">
                  <svg className="h-4 w-4 shrink-0 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path strokeLinecap="round" d="m16 16 4 4" />
                  </svg>
                  <input
                    type="search"
                    autoFocus
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search products"
                    aria-label="Search products"
                    className="min-w-0 flex-1 bg-transparent py-2 text-base tracking-normal outline-none placeholder:text-neutral-400 md:py-1 md:text-sm"
                  />
                  <button type="submit" className="shrink-0 bg-[#be315b] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-[#9f213f] md:px-3 md:py-1.5">Search</button>
                  <button type="button" onClick={() => setIsSearchOpen(false)} aria-label="Close search" className="p-1 text-xl leading-none text-neutral-700 md:hidden">×</button>
                </form>
                <div className="max-h-[calc(100vh-74px)] overflow-y-auto py-2 md:max-h-none md:py-1">
                  {searchTerm.trim() ? (
                    searchResults.length ? (
                      <>
                        {searchResults.map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-left transition hover:bg-rose-50"
                          >
                            <img src={product.images?.[0]?.url} alt="" className="h-10 w-10 rounded-sm object-cover" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-xs font-semibold normal-case tracking-normal text-neutral-800">{product.name}</span>
                              <span className="mt-0.5 block text-[11px] text-[#be315b]">Rs {product.price}</span>
                            </span>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <p className="px-3 py-3 text-xs normal-case tracking-normal text-neutral-500">No products found.</p>
                    )
                  ) : (
                    <div className="md:hidden">
                      <div className="flex items-center justify-between px-4 py-3">
                        <h2 className="text-sm font-medium text-neutral-900">Recently viewed</h2>
                        <button type="button" onClick={() => setSearchTerm('')} className="text-sm text-neutral-600">Clear</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                        {products.slice(0, 4).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="min-w-0 text-left"
                          >
                            <img src={product.images?.[0]?.url} alt={product.name} className="aspect-square w-full object-cover" />
                            <span className="mt-1 block line-clamp-2 text-sm leading-tight text-neutral-900">{product.name}</span>
                            <span className="mt-1 block text-xs font-semibold text-[#be315b]">Rs.{product.price}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Wishlist Link */}
          <Link href="/wishlist" className="hover:opacity-75 transition-all relative p-1 flex items-center gap-1.5" aria-label="Wishlist">
            <svg className={`w-5 h-5 ${isSolid ? 'text-neutral-800' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className={`hidden xl:inline text-[11px] font-bold tracking-wider ${isSolid ? 'text-neutral-800' : 'text-white'}`}>
              Wishlist
            </span>
            {wishlistMounted && wishlistItems.length > 0 && (
              <span className="bg-[#be315b] text-[9px] text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center font-bold shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Link */}
          <Link href="/cart" className="hover:opacity-75 transition-all relative p-1 flex items-center gap-1.5" aria-label="Cart">
            <svg className={`w-5 h-5 ${isSolid ? 'text-neutral-800' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
            </svg>
            <span className={`hidden xl:inline text-[11px] font-bold tracking-wider ${isSolid ? 'text-neutral-800' : 'text-white'}`}>
              Cart
            </span>
            {cartMounted && cartItems.length > 0 && (
              <span className="bg-[#be315b] text-[9px] text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center font-bold shadow-sm">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </Link>

          {/* User Account / Auth Dropdown */}
          {user ? (
            <div className="relative hidden md:block" data-user-dropdown>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:opacity-80 transition-all focus:outline-none"
                aria-label="User Account Menu"
              >
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full border border-rose-300 object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#be315b] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className={`hidden lg:inline text-[11px] font-medium tracking-wider ${isSolid ? 'text-neutral-700' : 'text-white/90'}`}>
                  {user.name ? user.name.split(' ')[0] : 'Profile'}
                </span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''} ${isSolid ? 'text-neutral-700' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* === REAL-WORLD PROFESSIONAL USER DROPDOWN === */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-[260px] bg-white rounded-md shadow-xl border border-neutral-200 z-50 overflow-visible animate-in fade-in zoom-in-95 duration-200">
                  
                  {/* Caret pointing up to the avatar */}
                  <div className="absolute -top-[6px] right-5 w-3 h-3 bg-white border-t border-l border-neutral-200 rotate-45 z-0"></div>

                  {/* Wrapper to overlay the content on top of the caret bottom half */}
                  <div className="relative bg-white rounded-md z-10 flex flex-col">
                    
                    {/* User Info Section (Standard casing) */}
                    <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/50 rounded-t-md">
                      <p className="font-semibold text-sm text-neutral-900 tracking-normal normal-case truncate">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-neutral-500 tracking-normal normal-case truncate mt-0.5">
                        {user.email || 'user@example.com'}
                      </p>
                    </div>

                    {/* Quick Links Section */}
                   

                    {/* Logout Section */}
                    <div className="p-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          logout()
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#be315b] hover:bg-rose-50 rounded-md transition-all text-left tracking-normal normal-case"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="relative hidden items-center gap-1 p-1 transition-all hover:opacity-75 md:flex" aria-label="Profile">
              <svg className={`w-5 h-5 ${isSolid ? 'text-neutral-800' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden hover:opacity-75 transition-all p-1.5 ${isSolid ? 'text-neutral-800' : 'text-white'}`} 
            aria-label="Menu"
            onClick={() => {
              setIsMobileOpen(!isMobileOpen)
              setMobileTab('menu')
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <div className={`md:hidden fixed inset-0 top-0 z-40 bg-black/30 transition-opacity duration-300 ${isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`} onClick={() => setIsMobileOpen(false)} />
      <aside className={`md:hidden fixed left-0 top-0 z-50 h-screen w-[min(86vw,320px)] overflow-y-auto bg-white text-neutral-900 shadow-2xl transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-12 items-center border-b border-neutral-200 text-[12px] font-bold uppercase">
          <button type="button" onClick={() => setMobileTab('menu')} className={`h-full px-4 ${mobileTab === 'menu' ? 'text-neutral-900' : 'text-neutral-400'}`}>Menu</button>
          <button type="button" onClick={() => setMobileTab('categories')} className={`h-full flex-1 text-left ${mobileTab === 'categories' ? 'text-neutral-900' : 'text-neutral-400'}`}>Shop All Categories</button>
          <button type="button" aria-label="Close menu" onClick={() => setIsMobileOpen(false)} className="px-4 text-xl font-light text-neutral-700">×</button>
        </div>

        {mobileTab === 'menu' ? (
          <nav className="divide-y divide-neutral-100 text-[12px] font-semibold uppercase">
            {user ? (
              <div className="px-4 py-3.5 bg-neutral-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#be315b] text-white font-bold text-xs flex items-center justify-center">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-neutral-900 font-bold leading-tight normal-case text-sm">{user.name}</p>
                    <p className="text-neutral-400 font-normal normal-case text-[10px] truncate max-w-[150px]">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { logout(); setIsMobileOpen(false); }} className="text-red-600 font-bold text-[10px] uppercase">Logout</button>
              </div>
            ) : (
              <Link href="/auth" onClick={() => setIsMobileOpen(false)} className="block px-4 py-4 text-[#be315b] font-bold hover:bg-neutral-50">Sign In</Link>
            )}
            <Link href="/" onClick={() => setIsMobileOpen(false)} className="block px-4 py-4 hover:bg-neutral-50">Home</Link>
            <Link href="/about" onClick={() => setIsMobileOpen(false)} className="block px-4 py-4 hover:bg-neutral-50">About Us</Link>
          </nav>
        ) : (
          <nav className="divide-y divide-neutral-100 text-[12px] font-semibold uppercase">
            <Link href="/collections/all" onClick={() => setIsMobileOpen(false)} className="block px-4 py-4 hover:bg-neutral-50">All Products</Link>
            {categories.map((category) => {
              const isOpen = openMobileCategory === category.slug
              return (
                <div key={category.slug}>
                  <button type="button" onClick={() => setOpenMobileCategory(isOpen ? null : category.slug)} className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-neutral-50">
                    <span>{category.name}</span>
                    {category.subcategories?.length ? <span className="text-lg font-normal">{isOpen ? '⌃' : '›'}</span> : null}
                  </button>
                  {isOpen && category.subcategories?.length ? (
                    <div className="bg-neutral-50 pb-2">
                      {category.subcategories.map((subcategory) => (
                        <Link key={subcategory.slug} href={`/collections/${subcategory.slug}`} onClick={() => setIsMobileOpen(false)} className="block px-7 py-2.5 text-[11px] font-medium text-neutral-600 hover:text-rose-500">
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        )}
      </aside>

    </header>
  )
}