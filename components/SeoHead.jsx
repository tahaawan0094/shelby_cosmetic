import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSanityImageUrl } from '../lib/images'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shelbycosmetics.com'

export default function SeoHead({ title, description, image, schema = [] }) {
  const router = useRouter()
  const canonicalPath = router.asPath.split('?')[0]
  const canonical = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`
  const imageUrl = getSanityImageUrl(image, { width: 1200 })
  const schemas = Array.isArray(schema) ? schema : [schema]

  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="website" />
    {imageUrl && <meta property="og:image" content={imageUrl} />}
    {schemas.filter(Boolean).map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </Head>
}

export { siteUrl }
