import { getProductSlugs, getCollectionSlugs } from '../lib/products'

export async function getServerSideProps({ res }) {
  const products = await getProductSlugs()
  const collections = await getCollectionSlugs()
  const baseUrl = 'https://www.shelbycosmetic.com'
  const staticRoutes = ['', '/products', '/face', '/eyes', '/about', '/contact', '/faqs', '/privacy-policy', '/terms-conditions', '/refund-policy', '/shipping-delivery-policy']
  const collectionRoutes = collections.map(({ slug }) => `/collections/${slug}`)
  const urls = [...staticRoutes, ...collectionRoutes, ...products.map(({ slug }) => `/products/${slug}`)]
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${baseUrl}${url}</loc></url>`).join('')}</urlset>`
  res.setHeader('Content-Type', 'text/xml')
  res.write(body)
  res.end()
  return { props: {} }
}

export default function Sitemap() { return null }
