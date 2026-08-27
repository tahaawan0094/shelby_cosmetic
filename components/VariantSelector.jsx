import { useState } from 'react'

export default function VariantSelector({ shades = [], variants = [], sizeOptions = [], onVariantChange }) {
  const safeShades = Array.isArray(shades) ? shades : []
  const safeVariants = Array.isArray(variants) ? variants : []
  const safeSizeOptions = Array.isArray(sizeOptions) ? sizeOptions : []
  const [selectedShade, setSelectedShade] = useState(safeShades[0]?.name || '')
  const [selectedVariant, setSelectedVariant] = useState(safeVariants[0]?.name || '')
  const [selectedSize, setSelectedSize] = useState(safeSizeOptions[0] || '')
  if (!safeShades.length && !safeVariants.length && !safeSizeOptions.length) return null

  return <div className="space-y-6 border-y border-neutral-200 py-6">
    {safeShades.length > 0 && <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]">Shade <span className="font-normal text-neutral-500">{selectedShade}</span></p><div className="flex flex-wrap gap-3">{safeShades.map((shade) => <button type="button" key={shade.name} onClick={() => setSelectedShade(shade.name)} title={shade.name} className={`h-8 w-8 rounded-full border-2 ${selectedShade === shade.name ? 'border-brand ring-2 ring-rose-100' : 'border-white ring-1 ring-neutral-300'}`} style={{ backgroundColor: shade.value || '#d9a18c' }} />)}</div></div>}
    {safeVariants.length > 0 && <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]">Shade</p><div className="flex flex-wrap gap-5">{safeVariants.map((variant) => <button type="button" key={variant.name} onClick={() => { setSelectedVariant(variant.name); onVariantChange?.(variant) }} title={variant.name} className="flex min-w-20 flex-col items-center gap-2 text-center"><span className={`h-12 w-12 rounded-full border-2 transition-shadow ${selectedVariant === variant.name ? 'border-brand ring-2 ring-rose-100' : 'border-white ring-1 ring-neutral-300'}`} style={{ background: variant.value || '#d9a18c' }} /><span className="text-[11px] leading-tight text-neutral-700">{variant.name}</span></button>)}</div></div>}
    {safeSizeOptions.length > 0 && <label className="block text-xs font-semibold uppercase tracking-[0.16em]">Size<select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className="mt-3 block w-full border border-neutral-300 bg-white px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-brand">{safeSizeOptions.map((size) => <option key={size}>{size}</option>)}</select></label>}
  </div>
}
