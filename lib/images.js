export function urlFor(source) {
  if (!source) return null
  return typeof source === 'string' ? source : source?.url || null
}

export function getSanityImageUrl(source, options = {}) {
  return urlFor(source)
}
