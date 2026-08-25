export default function PriceBlock({ price, originalPrice }) {
  return <div className="flex items-baseline gap-3"><span className="font-serif text-3xl text-brand">${price}</span>{originalPrice && originalPrice > price && <span className="text-sm text-neutral-400 line-through">${originalPrice}</span>}</div>
}
