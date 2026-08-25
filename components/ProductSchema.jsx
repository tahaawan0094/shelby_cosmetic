import { getImageUrl } from '../lib/products'

export default function ProductSchema({ product }) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.name, sku: product.sku,
    description: product.shortDescription, image: (product.images || []).map(getImageUrl),
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: product.price, availability: product.stockStatus === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://shelbycosmetics.com'}/products/${product.slug}` }
  }
  if (product.reviews?.length) {
    schema.aggregateRating = { '@type': 'AggregateRating', ratingValue: (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1), reviewCount: product.reviews.length }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
