import Head from 'next/head'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Skincare Rituals',
    excerpt: 'Discover how to build a consistent skincare routine that brings out your natural glow...',
    date: 'August 15, 2026',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Top 5 Summer Beauty Essentials',
    excerpt: 'Stay fresh and protected during the heat with our curated list of must-have beauty products...',
    date: 'July 28, 2026',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Understanding Your Skin Type',
    excerpt: 'Not sure if your skin is oily, dry, or combination? Here is how to find out and what it means...',
    date: 'June 10, 2026',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
  },
]

export default function BlogsPage() {
  return (
    <>
      <Head>
        <title>Blogs | Shelby Cosmetics</title>
        <meta name="description" content="Stay updated with the latest beauty tips, skincare rituals, and product guides from Shelby Cosmetics." />
      </Head>

      <div className="min-h-screen bg-[#fcfbf9] text-neutral-900">
        <Navbar solid />

        <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 lg:pt-40">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#c62c52]">Our Journal</p>
            <h1 className="font-serif text-5xl md:text-7xl text-neutral-900">
              Beauty Stories & Tips
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl bg-neutral-200 aspect-[4/5] mb-6 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-900">
                    {post.category}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">{post.date}</p>
                  <h2 className="text-2xl font-medium leading-tight group-hover:text-[#c62c52] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="pt-2">
                    <span className="text-sm font-semibold uppercase tracking-wider border-b-2 border-[#c62c52] pb-0.5">
                      Read More
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-24 rounded-3xl bg-accent p-8 md:p-16 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-5xl mb-6">Never miss a story</h2>
              <p className="text-white/80 mb-10 text-lg">Subscribe to get the latest beauty insights and exclusive offers delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors"
                />
                <button className="bg-white text-accent px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}
