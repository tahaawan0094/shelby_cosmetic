export default function FooterSection() {
  return (
    <footer className="bg-accent text-white pt-16 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Left Column: Logo, Info & Newsletter Input */}
          <div className="md:col-span-5 space-y-6">
            
            {/* FIXED: Logo image size further increased (w-20 h-20) */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo/Skin_Care___2_-removebg-preview.png" 
                alt="Shelby Cosmetics logo" 
                className="w-20 h-20 object-contain" 
              />
              <span className="font-serif text-3xl tracking-wide text-white">Shelby Cosmetics</span>
            </div>

            {/* Description */}
            <p className="text-sm text-white leading-relaxed max-w-sm">
              Shelby Cosmetics - your affordable, trusted online cosmetics store in Pakistan. Imported makeup, skincare & beauty essentials, delivered nationwide.
            </p>

            <div className="space-y-3 text-base text-white">
              <a href="mailto:shelbycosmetic18@gmail.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>shelbycosmetic18@gmail.com</span>
              </a>
              <a href="tel:03113041704" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6.6 3.5 9.5 3l2 4.5-2.1 1.7a14.8 14.8 0 0 0 5.4 5.4l1.7-2.1 4.5 2-.5 2.9a2 2 0 0 1-2.2 1.7A16.5 16.5 0 0 1 4.9 5.7a2 2 0 0 1 1.7-2.2Z" />
                </svg>
                <span>03113041704</span>
              </a>
              <p className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>Block 9 Clifton Karachi, Pakistan</span>
              </p>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-4 space-y-4">
              <label className="text-sm font-bold tracking-wide text-white block">
                Join Our Beauty Community
              </label>
              
              <div className="flex items-center bg-white/20 border border-white/50 rounded-full p-1.5 max-w-md focus-within:border-white focus-within:bg-white/30 transition-all shadow-sm">
                <input 
                  type="email" 
                  aria-label="email" 
                  placeholder="Enter your email address" 
                  className="bg-transparent px-4 py-2 text-sm text-white placeholder-white focus:outline-none flex-1 min-w-0" 
                />
                <button className="bg-white text-accent px-5 py-2.5 rounded-full font-semibold text-xs flex items-center gap-2 hover:bg-gray-100 transition-all shrink-0 shadow-md">
                  <span>Subscribe</span>
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-[10px]">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Columns: Links & Social Icons */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 pt-2">
            
            {/* Shop Column */}
            <div className="flex flex-col h-full min-h-[180px]">
              <div>
                <h4 className="font-serif text-lg font-medium text-white mb-5">Shop</h4>
                <ul className="space-y-3 text-sm text-white">
                  <li><a href="#" className="hover:opacity-80 transition-opacity">Our Product</a></li>
                </ul>
              </div>
              <div className="relative top-2 mt-auto mb-0 flex items-center gap-3 text-lg text-white md:top-0 md:mb-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <a href="https://www.instagram.com/shelby.cosmetic/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">Instagram</a>
              </div>
            </div>

            {/* Company Column */}
            <div className="flex flex-col h-full min-h-[180px]">
              <div>
                <h4 className="font-serif text-lg font-medium text-white mb-5">Company</h4>
                <ul className="space-y-3 text-sm text-white">
                  <li><a href="/about" className="hover:opacity-80 transition-opacity">About Us</a></li>
                  <li><a href="/privacy-policy" className="hover:opacity-80 transition-opacity">Privacy Policy</a></li>
                  <li><a href="/terms-conditions" className="hover:opacity-80 transition-opacity">Terms and Conditions</a></li>
                </ul>
              </div>
              <div className="relative top-2 mt-auto mb-0 flex items-center gap-3 text-lg text-white md:top-0 md:mb-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4Z" />
                </svg>
                <a href="https://www.facebook.com/profile.php?id=61591259949330" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">Facebook</a>
              </div>
            </div>

            {/* Support Column */}
            <div className="flex flex-col h-full min-h-[180px]">
              <div>
                <h4 className="font-serif text-lg font-medium text-white mb-5">Support</h4>
                <ul className="space-y-3 text-sm text-white">
                  <li><a href="/faqs" className="hover:opacity-80 transition-opacity">FAQ's</a></li>
                  <li><a href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</a></li>
                  <li><a href="/shipping-delivery-policy" className="hover:opacity-80 transition-opacity">Shipping & Delivery</a></li>
                  <li><a href="/refund-policy" className="hover:opacity-80 transition-opacity">Refund Policy</a></li>
                </ul>
              </div>
              <div className="relative top-2 mt-auto mb-0 flex items-center gap-3 text-lg text-white md:top-0 md:mb-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 4h3c.2 1.4 1 2.5 2.4 3.1v3.1c-1.4-.1-2.6-.5-3.7-1.2v6.1a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.1.1v3.2a2.7 2.7 0 1 0 1.6 2.5V4h1.4Z" />
                </svg>
                <a href="https://www.tiktok.com/@shelby.cosmetic" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">TikTok</a>
              </div>
            </div>

          </div>

        </div>

        {/* Copyright Text */}
        <div className="text-center pb-8 pt-4">
          <p className="text-xs tracking-widest text-white uppercase">
            © 2026 Shelby Cosmetics. All rights reserved.
          </p>
        </div>

      </div>

      {/* Bottom Large Text */}
      <div className="w-full pt-2 pb-2 flex justify-center items-center">
        <h1 className="text-[6.5vw] font-serif leading-none text-center tracking-wider text-white font-bold select-none uppercase w-full whitespace-nowrap">
          Shelby Cosmetics
        </h1>
      </div>
      <div className="mx-auto w-full max-w-7xl border-t border-white/30 pt-3">
        <div className="flex justify-center pb-5">
        <a href="https://www.vertexiaagency.com/" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-75">
          Developed by | Vertexia Agency
        </a>
        </div>
      </div>
    </footer>
  )
}