import Link from 'next/link'

export default function Breadcrumb({ items = [] }) {
  return <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500">
    <Link href="/" className="hover:text-brand">Home</Link>
    {items.map((item) => <span key={item.href || item.label} className="flex items-center gap-2"><span>/</span>{item.href ? <Link href={item.href} className="hover:text-brand">{item.label}</Link> : <span className="text-neutral-800">{item.label}</span>}</span>)}
  </nav>
}
