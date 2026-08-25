import { useState } from 'react'

export default function WishlistButton() {
  const [saved, setSaved] = useState(false)
  return <button type="button" onClick={() => setSaved(!saved)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} className="flex h-14 w-14 items-center justify-center border border-neutral-300 text-xl text-brand transition-colors hover:border-brand">{saved ? '♥' : '♡'}</button>
}
