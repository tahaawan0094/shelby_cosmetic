import ProductCard from './ProductCard'
import { useState } from 'react'

const collections = [
	{ label: 'Nails', slug: 'nails' },
	{ label: 'Set', slug: 'set' },
	{ label: 'Foundation', slug: 'foundation' },
	{ label: 'Cleanser', slug: 'cleanser' },
	{ label: 'Foot Mask', slug: 'foot-mask' },
	{ label: 'Press', slug: 'press' }
]

export default function BeautyToolsSection({ products = [] }) {
	const [selectedCollection, setSelectedCollection] = useState('nails')
	const selectedProducts = products.filter((product) => {
		if (selectedCollection === 'brushes') return product.subcategorySlug === 'brush-set'
		return product.categorySlug === selectedCollection || product.subcategorySlug === selectedCollection
	}).slice(0, 4)

	return (
		<section className="w-full bg-white px-2 py-10 sm:px-8 md:py-16 lg:px-12">
			<div className="mx-auto max-w-[1400px]">
				<div className="mb-5 flex items-end justify-between gap-4">
					<div>
						<h2 className="font-serif text-2xl font-bold text-black sm:text-3xl">World of Beauty Tools</h2>
						<p className="mt-1 max-w-[280px] text-xs leading-relaxed text-neutral-700 sm:max-w-none sm:text-sm">Pro-grade brushes, 3D lashes, vanity cases, makeup bags and more</p>
					</div>
					<a href={`/collections/${selectedCollection}`} className="shrink-0 text-xs font-bold text-[#be315b] underline underline-offset-4">View all</a>
				</div>

				<div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
					{collections.map((collection) => (
						<button key={collection.slug} type="button" onClick={() => setSelectedCollection(collection.slug)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium ${selectedCollection === collection.slug ? 'border-[#be315b] bg-[#f3a0bd] text-[#171717]' : 'border-[#f1a5bc] bg-white text-neutral-900'}`}>
							{collection.label}
						</button>
					))}
				</div>

				<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
					{selectedProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
					{!selectedProducts.length && <p className="col-span-full py-8 text-center text-sm text-neutral-500">No products in this collection yet.</p>}
				</div>
			</div>
		</section>
	)
}
