import { useState } from 'react'

export default function AddToCartButton({ disabled = false }) {
  const [added, setAdded] = useState(false)
  return <button type="button" disabled={disabled} onClick={() => setAdded(true)} className="flex-1 bg-brand px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-neutral-300">{disabled ? 'Out of stock' : added ? 'Added to cart' : 'Add to cart'}</button>
}
