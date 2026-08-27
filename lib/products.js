import { getSanityImageUrl } from './images'

const imagePaths = [
  '/Home%20page%20images/2ddad497-8876-42bd-918a-e60aedb39018.png',
  '/Home%20page%20images/f2e34db9-f663-4cf8-93a3-18f6539a7bb6.png',
  '/Home%20page%20images/d0467245-f545-4a2d-be84-2b0328c115f8.png'
]

const emelieFaceShadeVariants = [
  { name: 'Shade 1', value: '#e8ccb1' },
  { name: 'Shade 2', value: '#eacbaa' }
]

const makeProduct = ({
  slug,
  name,
  price,
  originalPrice = null,
  category,
  categorySlug,
  subcategory,
  subcategorySlug,
  sku,
  stockStatus = true,
  shortDescription,
  fullDescription = shortDescription,
  metaTitle,
  metaDescription,
  images = imagePaths,
  vendor = 'Shelby Cosmetics',
  availability = 'Many In Stock',
  soldCount = 5,
  discountPercent = 0,
  reviews = [],
  variants = [],
  maxImages = 3
}) => ({
  id: slug,
  slug,
  name,
  price,
  originalPrice,
  category,
  categorySlug,
  subcategory,
  subcategorySlug,
  sku,
  stockStatus,
  shortDescription,
  fullDescription,
  metaTitle: metaTitle || `${name} | Shelby Cosmetics`,
  metaDescription: metaDescription || shortDescription,
  images: [...images, ...imagePaths].slice(0, maxImages).map((image) => (typeof image === 'string' ? { url: image, alt: name } : image)),
  vendor,
  availability,
  soldCount,
  discountPercent,
  reviews,
  variants: variants.length > 0
    ? variants
    : name?.toLowerCase().startsWith('emelie paris') && ['Foundation', 'Powder'].includes(subcategory)
      ? emelieFaceShadeVariants
      : []
})

const fallbackProducts = [
  makeProduct({
    slug: 'hydra-boost-serum',
    name: 'Hydra Boost Serum',
    price: 1264,
    originalPrice: 1399,
    category: 'Serums',
    categorySlug: 'serums',
    subcategory: 'Hydration',
    subcategorySlug: 'hydration',
    sku: 'HB-101',
    shortDescription: 'A cushiony daily serum that floods skin with long-lasting hydration and a healthy glow.',
    fullDescription: 'This lightweight serum combines hyaluronic acid, peptides, and soothing botanicals to leave skin plump, smooth, and visibly refreshed.',
    metaTitle: 'Hydra Boost Serum | Shelby Cosmetics',
    metaDescription: 'Hydra Boost Serum hydrates, plumps, and smooths skin with a radiant, lightweight daily formula.',
    images: [
      { url: imagePaths[0], alt: 'Hydra Boost Serum' },
      { url: imagePaths[1], alt: 'Hydra Boost Serum side view' },
      { url: imagePaths[2], alt: 'Hydra Boost Serum bottle' }
    ],
    discountPercent: 15,
    reviews: []
  }),
  makeProduct({
    slug: 'glow-renew-serum',
    name: 'Glow Renew Serum',
    price: 1429,
    originalPrice: 1559,
    category: 'Serums',
    categorySlug: 'serums',
    subcategory: 'Brightening',
    subcategorySlug: 'brightening',
    sku: 'GR-202',
    shortDescription: 'Brightens dull skin and strengthens the barrier for a naturally radiant finish.',
    fullDescription: 'A vitamin-rich formula designed to visibly improve brightness, smooth tone, and support the skin barrier from day one.',
    metaTitle: 'Glow Renew Serum | Shelby Cosmetics',
    metaDescription: 'Glow Renew Serum targets dullness and strengthens the skin barrier for a brighter, smoother complexion.',
    images: [
      { url: imagePaths[1], alt: 'Glow Renew Serum' },
      { url: imagePaths[2], alt: 'Glow Renew Serum bottle' },
      { url: imagePaths[0], alt: 'Glow Renew Serum close up' }
    ],
    discountPercent: 10,
    reviews: []
  }),
  makeProduct({
    slug: 'barrier-repair-serum',
    name: 'Barrier Repair Serum',
    price: 899,
    originalPrice: 1079,
    category: 'Serums',
    categorySlug: 'serums',
    subcategory: 'Repair',
    subcategorySlug: 'repair',
    sku: 'BR-303',
    shortDescription: 'Calms stressed skin, supports resilience, and restores a smooth healthy-looking texture.',
    fullDescription: 'Packed with ceramides and soothing extracts, this serum helps reduce redness and supports a more balanced, resilient complexion.',
    metaTitle: 'Barrier Repair Serum | Shelby Cosmetics',
    metaDescription: 'Barrier Repair Serum calms sensitive skin and restores resilience with ceramides and barrier-supporting actives.',
    images: [
      { url: imagePaths[2], alt: 'Barrier Repair Serum' },
      { url: imagePaths[0], alt: 'Barrier Repair Serum bottle' },
      { url: imagePaths[1], alt: 'Barrier Repair Serum glow shot' }
    ],
    discountPercent: 20,
    reviews: []
  }),
  makeProduct({
    slug: 'peptide-firm-serum',
    name: 'Peptide Firm Serum',
    price: 1264,
    originalPrice: 1399,
    category: 'Serums',
    categorySlug: 'serums',
    subcategory: 'Firming',
    subcategorySlug: 'firming',
    sku: 'PF-404',
    shortDescription: 'Targets visible signs of aging with a firming peptide blend and silky finish.',
    fullDescription: 'This firming serum helps support elasticity and smooth fine lines for a lifted, refined appearance without heaviness.',
    metaTitle: 'Peptide Firm Serum | Shelby Cosmetics',
    metaDescription: 'Peptide Firm Serum supports elasticity and smooths visible fine lines for a firmer, refined look.',
    images: [
      { url: imagePaths[0], alt: 'Peptide Firm Serum' },
      { url: imagePaths[1], alt: 'Peptide Firm Serum bottle' },
      { url: imagePaths[2], alt: 'Peptide Firm Serum product shot' }
    ],
    discountPercent: 18,
    reviews: []
  }),
  makeProduct({
    slug: 'dew-essence-serum',
    name: 'Dew Essence Serum',
    price: 1429,
    originalPrice: 1559,
    category: 'Serums',
    categorySlug: 'serums',
    subcategory: 'Radiance',
    subcategorySlug: 'radiance',
    sku: 'DE-505',
    shortDescription: 'Delivers dewy hydration and an instant fresh glow for a luminous, healthy-looking finish.',
    fullDescription: 'A radiant daily serum that blends moisture-locking ingredients with glow-boosting actives for a soft, lit-from-within sheen.',
    metaTitle: 'Dew Essence Serum | Shelby Cosmetics',
    metaDescription: 'Dew Essence Serum gives skin a fresh, dewy glow with lightweight hydration for a healthy radiance.',
    images: [
      { url: imagePaths[1], alt: 'Dew Essence Serum' },
      { url: imagePaths[2], alt: 'Dew Essence Serum bottle' },
      { url: imagePaths[0], alt: 'Dew Essence Serum close view' }
    ],
    discountPercent: 12,
    reviews: []
  })
]

const foundationProducts = [
  makeProduct({
    slug: 'masarrat-misbah-silk-foundation',
    name: 'Masarrat Misbah Silk Foundation',
    price: 3950,
    originalPrice: 5000,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'MM-SILK-FOUNDATION',
    shortDescription: 'A smooth, silky foundation that creates an even, naturally polished complexion.',
    fullDescription: 'Masarrat Misbah Silk Foundation gives complexion a refined, comfortable finish with buildable coverage for everyday and occasion makeup.',
    metaDescription: 'Shop Masarrat Misbah Silk Foundation for smooth, buildable coverage and a naturally polished complexion.',
    images: [
      { url: '/product%20images/silk_foundation_luxury.webp', alt: 'Masarrat Misbah Silk Foundation luxury bottle' },
      { url: '/product%20images/masarrat_misbah_foundation_bottle.webp', alt: 'Masarrat Misbah Silk Foundation bottle' },
      { url: '/product%20images/silk_foundation_lifestyle.webp', alt: 'Masarrat Misbah Silk Foundation lifestyle' },
      { url: '/product%20images/Masarrat%20Misbah%20Silk%20Foundation%20gif.gif', alt: 'Masarrat Misbah Silk Foundation animation' }
    ],
    maxImages: 4,
    variants: [
      { name: 'Fair', value: '#dbbb94' },
      { name: 'Beige', value: '#e9b78b' },
      { name: 'Cream', value: '#f0bc95' },
      { name: 'Porcelain', value: '#e0cdc1' }
    ]
  }),
  makeProduct({
    slug: 'huda-beauty-fauxfilter-luminous-matte-foundation',
    name: 'Huda Beauty FauxFilter Luminous Matte Foundation (35ml)',
    price: 950,
    originalPrice: 1200,
    discountPercent: 21,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'HUDA-FAUXFILTER-35ML',
    shortDescription: 'A full-coverage luminous matte foundation with a smooth, camera-ready finish.',
    fullDescription: 'Huda Beauty FauxFilter Luminous Matte Foundation delivers long-wearing, full coverage while leaving skin with a softly luminous matte look.',
    metaDescription: 'Shop Huda Beauty FauxFilter Luminous Matte Foundation 35ml for full coverage and a long-wearing luminous matte finish.',
    images: [
      '/product%20images/Huda%20Beauty%20FauxFilter%20Luminous%20Matte%20Foundation%20(35ml)%201.webp',
      '/product%20images/Huda%20Beauty%20FauxFilter%20Luminous%20Matte%20Foundation%20(35ml)%202.webp',
      '/product%20images/Huda%20Beauty%20FauxFilter%20Luminous%20Matte%20Foundation%20(35ml)%203.webp'
    ],
    variants: [
      { name: 'Milkshake', value: '#ffeac8' },
      { name: 'Vanilla', value: '#fbdcc6' }
    ]
  }),
  makeProduct({
    slug: 'dermacol-original-make-up-cover-foundation-shade-211',
    name: 'Dermacol Original Make-Up Cover Foundation (Shade 211)',
    price: 750,
    originalPrice: 1000,
    discountPercent: 25,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'DERMACOL-211',
    shortDescription: 'A highly pigmented makeup cover foundation for strong, even complexion coverage.',
    fullDescription: 'Dermacol Original Make-Up Cover Foundation in Shade 211 provides highly pigmented coverage with a creamy texture that blends smoothly into the complexion.',
    metaDescription: 'Shop Dermacol Original Make-Up Cover Foundation in Shade 211 for highly pigmented, even complexion coverage.',
    images: [
      '/product%20images/Dermacol%20Original%20Make-Up%20Cover%20Foundation%20(Shade%20211)-01.webp',
      '/product%20images/Dermacol%20Original%20Make-Up%20Cover%20Foundation%20(Shade%20211)-02.webp',
      '/product%20images/Dermacol%20Original%20Make-Up%20Cover%20Foundation%20(Shade%20211)-03.webp'
    ],
    variants: [
      { name: '211', value: '#d2bfa1' }
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-derma-make-up-cover-24h-matte',
    name: 'emelie Paris DERMA Make-Up Cover 24H Matte',
    price: 850,
    originalPrice: 1100,
    discountPercent: 23,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-DERMA-24H',
    shortDescription: 'A 24-hour matte makeup cover foundation for a smooth, even-looking base.',
    fullDescription: 'emelie Paris DERMA Make-Up Cover 24H Matte helps create an even, comfortable base with durable matte coverage for long days and events.',
    metaDescription: 'Shop emelie Paris DERMA Make-Up Cover 24H Matte for smooth, long-lasting matte foundation coverage.',
    images: [
      '/product%20images/emelie%20Paris%20DERMA%20Make-Up%20Cover%2024H%20Matte.webp',
      '/product%20images/emelie%20Paris%20DERMA%20Make-Up%20Cover%2024H%20Matte2.webp',
      '/product%20images/emelie%20Paris%20DERMA%20Make-Up%20Cover%2024H%20Matte3.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-ultra-matte-bb-double-wear-spf15',
    name: 'emelie Paris Ultra Matte BB Double Wear Maximum Cover SPF15',
    price: 850,
    originalPrice: 1100,
    discountPercent: 23,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-BB-SPF15',
    shortDescription: 'Maximum-cover BB makeup with an ultra-matte double-wear finish and SPF 15.',
    fullDescription: 'emelie Paris Ultra Matte BB Double Wear Maximum Cover SPF15 combines maximum coverage with an ultra-matte finish designed for dependable daily wear.',
    metaDescription: 'Shop emelie Paris Ultra Matte BB Double Wear Maximum Cover SPF15 for ultra-matte, maximum-coverage makeup.',
    images: [
      '/product%20images/emelie%20Paris%20Ultra%20Matte%20BB%20Double%20Wear%20Maximum%20Cover%20SPF15%202.webp',
      '/product%20images/emelie%20Paris%20Ultra%20Matte%20BB%20Double%20Wear%20Maximum%20Cover%20SPF15%203.webp',
      '/product%20images/emelie%20Paris%20Ultra%20Matte%20BB%20Double%20Wear%20Maximum%20Cover%20SPF15%201.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-vip-hi-silk-foundation',
    name: 'emelie Paris VIP Hi-Silk Foundation',
    price: 950,
    originalPrice: 1200,
    discountPercent: 21,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-VIP-HISILK',
    shortDescription: 'A high-silk foundation with a soft, refined texture for an elegant complexion finish.',
    fullDescription: 'emelie Paris VIP Hi-Silk Foundation glides over skin with a silky texture to create a smooth and refined makeup base.',
    metaDescription: 'Shop emelie Paris VIP Hi-Silk Foundation for a smooth, silky and refined complexion finish.',
    images: [
      '/product%20images/emelie%20Paris%20VIP%20Hi-Silk%20Foundation%202.webp',
      '/product%20images/emelie%20Paris%20VIP%20Hi-Silk%20Foundation%203.webp',
      '/product%20images/emelie%20Paris%20VIP%20Hi-Silk%20Foundation%201.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-exemplary-24h-full-coverage-skin-perfector',
    name: 'emelie Paris Exemplary 24h Full Coverage Skin Perfector Liquid Foundation',
    price: 1000,
    originalPrice: 1300,
    discountPercent: 23,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-EXEMPLARY-24H',
    shortDescription: 'A 24-hour full-coverage liquid foundation that perfects the look of skin.',
    fullDescription: 'emelie Paris Exemplary 24h Full Coverage Skin Perfector Liquid Foundation offers reliable, full-coverage wear with a smooth liquid texture.',
    metaDescription: 'Shop emelie Paris Exemplary 24h Full Coverage Skin Perfector Liquid Foundation for long-lasting full coverage.',
    images: [
      '/product%20images/emelie%20Paris%20Exemplary%2024h%20Full%20Coverage%20Skin%20Perfector%20Liquid%20Foundation.webp',
      '/product%20images/emelie%20Paris%20Exemplary%2024h%20Full%20Coverage%20Skin%20Perfector%20Liquid%20Foundation3.webp',
      '/product%20images/emelie%20Paris%20Exemplary%2024h%20Full%20Coverage%20Skin%20Perfector%20Liquid%20Foundation2.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-master-chrome-professional-makeup-spf15',
    name: 'emelie Paris Blend With The New Master Chrome Professional Makeup SPF 15',
    price: 1000,
    originalPrice: 1300,
    discountPercent: 23,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-MASTER-CHROME',
    shortDescription: 'Professional complexion makeup with SPF 15 for a smooth, camera-ready base.',
    fullDescription: 'emelie Paris Blend With The New Master Chrome Professional Makeup SPF 15 helps create an even professional makeup base with comfortable coverage.',
    metaDescription: 'Shop emelie Paris Master Chrome Professional Makeup SPF 15 for an even, professional complexion base.',
    images: [
      '/product%20images/emelie%20Paris%20Blend%20With%20The%20New%20Master%20Chrome%20Professional%20Makeup%20SPF%2015-01.webp',
      '/product%20images/emelie%20Paris%20Blend%20With%20The%20New%20Master%20Chrome%20Professional%20Makeup%20SPF%2015-02.webp',
      '/product%20images/emelie%20Paris%20Blend%20With%20The%20New%20Master%20Chrome%20Professional%20Makeup%20SPF%2015-03.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-full-matte-waterproof-foundation',
    name: 'emelie Paris Full Matte Coverage & Waterproof Matte Perfect & Air-Fine Texture',
    price: 850,
    originalPrice: 1100,
    discountPercent: 23,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-FULL-MATTE-WP',
    shortDescription: 'Full matte, waterproof coverage with a lightweight air-fine texture.',
    fullDescription: 'emelie Paris Full Matte Coverage Waterproof Matte Perfect Foundation gives a smooth matte base with a lightweight, air-fine feel.',
    metaDescription: 'Shop emelie Paris Full Matte Coverage Waterproof Foundation for lightweight, air-fine matte coverage.',
    images: [
      '/product%20images/emelie%20Paris%20Full%20Matte%20Coverage%20%26%20Waterproof%20Matte%20Perfect%20%26%20Air-Fine%20Texture.jpg',
      '/product%20images/emelie%20Paris%20Full%20Matte%20Coverage%20%26%20Waterproof%20Matte%20Perfect%20%26%20Air-Fine%20Texture3.jpg',
      '/product%20images/emelie%20Paris%20Full%20Matte%20Coverage%20%26%20Waterproof%20Matte%20Perfect%20%26%20Air-Fine%20Texture2.jpg'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-comfort-matte-foundation-spf50',
    name: 'emelie Paris Comfort Matte Advanced Makeup Extreme Wear Foundation SPF 50',
    price: 1100,
    originalPrice: 1400,
    discountPercent: 21,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-COMFORT-MATTE-SPF50',
    shortDescription: 'An extreme-wear comfort matte foundation with SPF 50.',
    fullDescription: 'emelie Paris Comfort Matte Advanced Makeup Extreme Wear Foundation SPF 50 combines a comfortable matte finish with long-wearing coverage.',
    metaDescription: 'Shop emelie Paris Comfort Matte Extreme Wear Foundation SPF 50 for comfortable, long-lasting matte coverage.',
    images: [
      '/product%20images/emelie%20Paris%20Comfort%20Matte%20Advanced%20Makeup%20Extreme%20Wear%20Foundation%20SPF%2050.webp',
      '/product%20images/emelie%20Paris%20Comfort%20Matte%20Advanced%20Makeup%20Extreme%20Wear%20Foundation%20SPF%20503.webp',
      '/product%20images/emelie%20Paris%20Comfort%20Matte%20Advanced%20Makeup%20Extreme%20Wear%20Foundation%20SPF%20502.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-professional-prestige-luminous-serum-foundation-spf15',
    name: 'emelie Paris Professional Prestige Luminous Serum Foundation SPF15/PA+++',
    price: 1100,
    originalPrice: 1400,
    discountPercent: 21,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-PRESTIGE-SPF15',
    shortDescription: 'A luminous serum foundation with SPF 15 and PA+++ protection.',
    fullDescription: 'emelie Paris Professional Prestige Luminous Serum Foundation SPF15/PA+++ gives skin a luminous, comfortable finish with serum-inspired fluidity.',
    metaDescription: 'Shop emelie Paris Professional Prestige Luminous Serum Foundation SPF15/PA+++ for luminous coverage.',
    images: [
      '/product%20images/emelie%20Paris%20Professional%20Prestige%20Luminous%20Serum%20Foundation1.webp',
      '/product%20images/emelie%20Paris%20Professional%20Prestige%20Luminous%20Serum%20Foundation3.webp',
      '/product%20images/emelie%20Paris%20Professional%20Prestige%20Luminous%20Serum%20Foundation2.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-professional-prestige-luminous-serum-foundation',
    name: 'emelie Paris Professional Prestige Luminous Serum Foundation',
    price: 1100,
    originalPrice: 1400,
    discountPercent: 21,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-PRESTIGE-LUMINOUS',
    shortDescription: 'A luminous serum foundation that leaves complexion smooth, fresh and naturally radiant.',
    fullDescription: 'emelie Paris Professional Prestige Luminous Serum Foundation blends easily to create a fresh, radiant complexion with a comfortable serum-like feel.',
    metaDescription: 'Shop emelie Paris Professional Prestige Luminous Serum Foundation for fresh, radiant complexion coverage.',
    images: [
      '/product%20images/emelie%20Paris%20Professional%20Prestige%20Luminous%20Serum%20Foundation33%20(2).webp',
      '/product%20images/emelie%20Paris%20Professional%20Prestige%20Luminous%20Serum%20Foundation33.webp',
      '/product%20images/emelie%20Paris%20Professional%20Prestige%20Luminous%20Serum%20Foundation33%20(1).webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-bestskin-ever-outlast-foundation',
    name: 'emelie Paris Bestskin Ever Outlast Foundation',
    price: 920,
    originalPrice: 1300,
    discountPercent: 29,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Foundation',
    subcategorySlug: 'foundation',
    sku: 'EMELIE-BESTSKIN-OUTLAST',
    shortDescription: 'An outlast foundation designed for an even, comfortable and enduring complexion finish.',
    fullDescription: 'emelie Paris Bestskin Ever Outlast Foundation creates a smooth, even-looking base with comfortable coverage made for lasting wear.',
    metaDescription: 'Shop emelie Paris Bestskin Ever Outlast Foundation for comfortable, long-lasting complexion coverage.',
    images: [
      '/product%20images/emelie%20Paris%20Bestskin%20Ever%20Outlast%20Foundation.webp',
      '/product%20images/emelie%20Paris%20Bestskin%20Ever%20Outlast%20Foundation3.webp',
      '/product%20images/emelie%20Paris%20Bestskin%20Ever%20Outlast%20Foundation2.webp'
    ]
  })
]

const settingSprayProducts = [
  makeProduct({
    slug: 'huda-beauty-the-matte-fixer-setting-spray-160ml',
    name: 'Huda Beauty The Matte Fixer Setting Spray (160ml)',
    price: 550,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Setting Spray',
    subcategorySlug: 'setting-spray',
    sku: 'HUDA-MATTE-FIXER-160ML',
    shortDescription: 'A long-lasting matte setting spray that helps lock makeup in place.',
    fullDescription: 'Huda Beauty The Matte Fixer Setting Spray helps set makeup with a comfortable matte finish and dependable wear throughout the day.',
    metaDescription: 'Shop Huda Beauty The Matte Fixer Setting Spray 160ml for long-lasting makeup hold and a comfortable matte finish.',
    images: [
      '/product%20images/Huda%20Beauty%20The%20Matte%20Fixer%20Setting%20Spray%20(160ml)%201.webp',
      '/product%20images/Huda%20Beauty%20The%20Matte%20Fixer%20Setting%20Spray%20(160ml)%202.webp',
      '/product%20images/Huda%20Beauty%20The%20Matte%20Fixer%20Setting%20Spray%20(160ml)%203.webp'
    ]
  })
]

const primerProducts = [
  makeProduct({
    slug: 'beauty-nakeed-bn-make-up-hydrating-primer-35ml',
    name: 'Beauty Nakèed BN Make-Up Hydrating Primer (35ml)',
    price: 425,
    originalPrice: 550,
    discountPercent: 23,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Primer',
    subcategorySlug: 'primer',
    sku: 'BN-HYDRATING-PRIMER-35ML',
    shortDescription: 'A hydrating makeup primer that creates a smooth, fresh base for makeup.',
    fullDescription: 'Beauty Nakèed BN Make-Up Hydrating Primer helps hydrate and smooth the skin before makeup application for a comfortable, even-looking finish.',
    metaDescription: 'Shop Beauty Nakèed BN Make-Up Hydrating Primer 35ml for a smooth, hydrated makeup base.',
    images: [
      '/product%20images/Beauty%20Nak%C3%A8ed%20BN%20Make-Up%20Hydrating%20Primer%20%2835ml%29-01.webp',
      '/product%20images/Beauty%20Nak%C3%A8ed%20BN%20Make-Up%20Hydrating%20Primer%20%2835ml%29-02.webp',
      '/product%20images/Beauty%20Nak%C3%A8ed%20BN%20Make-Up%20Hydrating%20Primer%20%2835ml%29-03.webp'
    ]
  })
]

const additionalProducts = [
  makeProduct({ slug: 'bob-fashion-color-nail-polish', name: 'BOB Fashion Color Nail Polish', price: 250, originalPrice: 320, discountPercent: 22, category: 'Nails', categorySlug: 'nails', subcategory: 'Polish', subcategorySlug: 'polish', sku: 'BOB-FASHION-COLOR-NAIL-POLISH', shortDescription: 'A fashionable nail polish for a smooth, colourful finish.', images: [
    '/product%20images/BOB%20Fashion%20Color%20Nail%20Polish-01.jpg',
    '/product%20images/BOB%20Fashion%20Color%20Nail%20Polish-02.jpg',
    '/product%20images/BOB%20Fashion%20Color%20Nail%20Polish-03.jpg'
  ] }),
  makeProduct({ slug: 'mode-love-matte-nail-polish', name: 'Mode Love Matte Nail Polish', price: 250, originalPrice: 320, discountPercent: 22, category: 'Nails', categorySlug: 'nails', subcategory: 'Polish Set', subcategorySlug: 'polish-set', sku: 'MODE-LOVE-MATTE-NAIL-POLISH', shortDescription: 'A matte nail polish with a smooth, modern finish.', images: [
    '/product%20images/Mode%20Love%20Matte%20Nail%20Polish1.webp',
    '/product%20images/Mode%20Love%20Matte%20Nail%20Polish2.webp',
    '/product%20images/Mode%20Love%20Matte%20Nail%20Polish3.webp'
  ] }),
  makeProduct({ slug: 'assorted-nail-polish-glamour', name: 'Assorted Nail Polish Glamour', price: 250, originalPrice: 320, discountPercent: 22, category: 'Nails', categorySlug: 'nails', subcategory: 'Polish Set', subcategorySlug: 'polish-set', sku: 'ASSORTED-NAIL-POLISH-GLAMOUR', shortDescription: 'A glamorous assorted nail polish selection.', images: [
    '/product%20images/Assorted%20Nail%20Polish%20Glamour-01.webp',
    '/product%20images/Assorted%20Nail%20Polish%20Glamour-02.webp',
    '/product%20images/Assorted%20Nail%20Polish%20Glamour-03.webp'
  ] }),
  makeProduct({ slug: 'cosmee-lemon-fruit-care-nail-polish-remover-wipes', name: 'Cosmee Lemon Fruit Care Nail Polish Remover Wipes', price: 225, originalPrice: 300, discountPercent: 25, category: 'Nails', categorySlug: 'nails', subcategory: 'Remover Wipes', subcategorySlug: 'remover-wipes', sku: 'COSMEE-LEMON-REMOVER-WIPES', shortDescription: 'Lemon fruit care wipes for quick nail polish removal.', images: [
    '/product%20images/Cosmee%20Lemon%20Fruit%20Care%20Nail%20Polish%20Remover%20Wipes-01.jpg',
    '/product%20images/Cosmee%20Lemon%20Fruit%20Care%20Nail%20Polish%20Remover%20Wipes-02.jpg',
    '/product%20images/Cosmee%20Lemon%20Fruit%20Care%20Nail%20Polish%20Remover%20Wipes-03.jpg'
  ] }),
  makeProduct({
    slug: 'bosuya-long-lasting-hairdressing-wand-black-01',
    name: 'Bosuya Long-Lasting Hairdressing Wand',
    price: 800,
    originalPrice: 1000,
    discountPercent: 20,
    category: 'Hair',
    categorySlug: 'hair',
    subcategory: 'Color Wand',
    subcategorySlug: 'color-wand',
    sku: 'BOSUYA-LONG-LASTING-HAIRDRESSING-WAND',
    shortDescription: 'A long-lasting hairdressing colour wand available in three shades.',
    images: [
      '/product%20images/Bosuya%20Long-Lasting%20Hairdressing%20Wand%20-%2001%23%20Black.webp',
      '/product%20images/Bosuya%20Long-Lasting%20Hairdressing%20Wand%20-%2002%23%20Brownish%20Black.webp',
      '/product%20images/Bosuya%20Long-Lasting%20Hairdressing%20Wand%20-%2003%23%20Coffee%20Color.webp'
    ],
    variants: [
      {
        name: 'Black',
        value: '#090909',
        images: ['/product%20images/Bosuya%20Long-Lasting%20Hairdressing%20Wand%20-%2001%23%20Black.webp']
      },
      {
        name: 'Brownish Black',
        value: '#593731',
        images: ['/product%20images/Bosuya%20Long-Lasting%20Hairdressing%20Wand%20-%2002%23%20Brownish%20Black.webp']
      },
      {
        name: 'Coffee Color',
        value: '#704437',
        images: ['/product%20images/Bosuya%20Long-Lasting%20Hairdressing%20Wand%20-%2003%23%20Coffee%20Color.webp']
      }
    ]
  }),
  makeProduct({ slug: 'meow-club-10-min-painless-body-wax-powder-orange', name: 'Meow Club 10 Min Painless Body Wax Powder - Orange', price: 1500, originalPrice: 1800, discountPercent: 17, category: 'Hair Removal', categorySlug: 'hair-removal', subcategory: 'Wax Powder', subcategorySlug: 'wax-powder', sku: 'MEOW-CLUB-WAX-POWDER-ORANGE', shortDescription: 'An orange body wax powder designed for a quick hair removal routine.', images: [
    '/product%20images/Meow%20Club%2010%20Min%20Painless%20Body%20Wax%20Powder%20-%20Orange-01.jpg',
    '/product%20images/Meow%20Club%2010%20Min%20Painless%20Body%20Wax%20Powder%20-%20Orange-02.jpg',
    '/product%20images/Meow%20Club%2010%20Min%20Painless%20Body%20Wax%20Powder%20-%20Orange-03.jpg'
  ] }),
  makeProduct({ slug: 'emelie-waxing-strips-rose', name: 'emelie Waxing Strips (Rose)', price: 450, originalPrice: 600, discountPercent: 25, category: 'Hair Removal', categorySlug: 'hair-removal', subcategory: 'Wax Strips', subcategorySlug: 'wax-strips', sku: 'EMELIE-WAXING-STRIPS-ROSE', shortDescription: 'Rose waxing strips for an easy at-home hair removal routine.', images: [
    '/product%20images/emelie%20Waxing%20Strips%20(Rose)1.webp',
    '/product%20images/emelie%20Waxing%20Strips%20(Rose)2.webp',
    '/product%20images/emelie%20Waxing%20Strips%20(Rose)3.webp'
  ] }),
  makeProduct({ slug: 'emelie-waxing-strips-aloe-vera', name: 'emelie Waxing Strips (Aloe Vera)', price: 450, originalPrice: 600, discountPercent: 25, category: 'Hair Removal', categorySlug: 'hair-removal', subcategory: 'Wax Strips', subcategorySlug: 'wax-strips', sku: 'EMELIE-WAXING-STRIPS-ALOE-VERA', shortDescription: 'Aloe vera waxing strips for an easy at-home hair removal routine.', images: [
    '/product%20images/emelie%20Waxing%20Strips%20(Aloe%20Vera)%201.webp',
    '/product%20images/emelie%20Waxing%20Strips%20(Aloe%20Vera)%202.webp',
    '/product%20images/emelie%20Waxing%20Strips%20(Aloe%20Vera)%203.webp'
  ] }),
  makeProduct({ slug: 'battery-operated-eyebrow-trimmer-shaver-ladies', name: 'Battery Operated Eyebrow Trimmer Shaver For Ladies', price: 999, originalPrice: 1250, discountPercent: 20, category: 'Tools', categorySlug: 'tools', subcategory: 'Trimmer', subcategorySlug: 'trimmer', sku: 'BATTERY-EYEBROW-TRIMMER-LADIES', shortDescription: 'A battery-operated eyebrow trimmer for easy brow grooming.', images: [
    '/product%20images/Battery%20Operated%20Eyebrow%20Trimmer%20Shaver%20For%20Ladies-01.jpg',
    '/product%20images/Battery%20Operated%20Eyebrow%20Trimmer%20Shaver%20For%20Ladies-02.jpg',
    '/product%20images/Battery%20Operated%20Eyebrow%20Trimmer%20Shaver%20For%20Ladies-03.jpg'
  ] }),
  makeProduct({ slug: 'ice-roller', name: 'Ice Roller', price: 650, originalPrice: 800, discountPercent: 19, category: 'Tools', categorySlug: 'tools', subcategory: 'Ice Roller', subcategorySlug: 'ice-roller', sku: 'ICE-ROLLER', shortDescription: 'A cooling ice roller for a refreshed skincare routine.', images: [
    '/product%20images/Ice%20Roller%201.webp',
    '/product%20images/Ice%20Roller%202.webp',
    '/product%20images/Ice%20Roller%203.webp'
  ] }),
  makeProduct({ slug: '5-piece-pink-mini-makeup-brush-set', name: '5-Piece Pink Mini Makeup Brush Set', price: 550, originalPrice: 700, discountPercent: 21, category: 'Tools', categorySlug: 'tools', subcategory: 'Brush Set', subcategorySlug: 'brush-set', sku: 'PINK-MINI-MAKEUP-BRUSH-5PCS', shortDescription: 'A five-piece pink mini makeup brush set for everyday application.', images: [
    '/product%20images/5-Piece%20Pink%20Mini%20Makeup%20Brush%20Set-01.webp',
    '/product%20images/5-Piece%20Pink%20Mini%20Makeup%20Brush%20Set-02.webp',
    '/product%20images/5-Piece%20Pink%20Mini%20Makeup%20Brush%20Set-03.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-press-on-fake-nails-rhinestone-acrylic-set', name: 'Fashion Nail Press-On Fake Nails Set / Rhinestone Acrylic Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-RHINESTONE-ACRYLIC', shortDescription: 'A fashionable rhinestone acrylic press-on nail set.', images: [
    '/product%20images/Fashion%20Nail%20Press-On%20Fake%20Nails%20Set%20Rhinestone%20Acrylic%20Nails1.webp',
    '/product%20images/Fashion%20Nail%20Press-On%20Fake%20Nails%20Set%20Rhinestone%20Acrylic%20Nails2.webp',
    '/product%20images/Fashion%20Nail%20Press-On%20Fake%20Nails%20Set%20Rhinestone%20Acrylic%20Nails3.webp'
  ] }),
  makeProduct({ slug: 'pink-key-french-manicure-press-on-nails-12-pcs', name: 'Pink Key French Manicure Press-On Nails Set (12 Pcs)', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'PINK-KEY-FRENCH-NAILS-12PCS', shortDescription: 'A 12-piece pink key French manicure press-on nail set.', images: [
    '/product%20images/Pink%20Key%20French%20Manicure%20Press-On%20Nails%20Set%20(12%20Pcs)1.webp',
    '/product%20images/Pink%20Key%20French%20Manicure%20Press-On%20Nails%20Set%20(12%20Pcs)2.webp',
    '/product%20images/Pink%20Key%20French%20Manicure%20Press-On%20Nails%20Set%20(12%20Pcs)3.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-silver-swirl-rhinestone-press-on-nails', name: 'Fashion Nail Silver Swirl Rhinestone Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-SILVER-SWIRL', shortDescription: 'Silver swirl rhinestone press-on nails for a glamorous look.', images: [
    '/product%20images/Fashion%20Nail%20Silver%20Swirl%20Rhinestone%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Silver%20Swirl%20Rhinestone%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Silver%20Swirl%20Rhinestone%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-pink-star-heart-gem-press-on-nails', name: 'Fashion Nail Pink Star & Heart Gem Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-PINK-STAR-HEART', shortDescription: 'Pink press-on nails decorated with star and heart gems.', images: [
    '/product%20images/Fashion%20Nail%20Pink%20Star%20%26%20Heart%20Gem%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Star%20%26%20Heart%20Gem%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Star%20%26%20Heart%20Gem%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-teddy-bear-checkered-press-on-nails', name: 'Fashion Nail Teddy Bear & Checkered Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-TEDDY-CHECKERED', shortDescription: 'Cute teddy bear and checkered press-on nail designs.', images: [
    '/product%20images/Fashion%20Nail%20Teddy%20Bear%20%26%20Checkered%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Teddy%20Bear%20%26%20Checkered%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Teddy%20Bear%20%26%20Checkered%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-pink-ombre-floral-star-rhinestone-nails', name: 'Fashion Nail Pink Ombre Floral & Star Rhinestone Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-PINK-OMBRE-FLORAL', shortDescription: 'Pink ombre press-on nails with floral and star rhinestones.', images: [
    '/product%20images/Fashion%20Nail%20Pink%20Ombre%20Floral%20%26%20Star%20Rhinestone%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Ombre%20Floral%20%26%20Star%20Rhinestone%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Ombre%20Floral%20%26%20Star%20Rhinestone%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-pink-plaid-gold-bow-rhinestone-nails', name: 'Fashion Nail Pink Plaid & Gold Bow Rhinestone Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-PLAID-GOLD-BOW', shortDescription: 'Pink plaid press-on nails with gold bow rhinestone details.', images: [
    '/product%20images/Fashion%20Nail%20Pink%20Plaid%20%26%20Gold%20Bow%20Rhinestone%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Plaid%20%26%20Gold%20Bow%20Rhinestone%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Plaid%20%26%20Gold%20Bow%20Rhinestone%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-pink-star-rose-gem-press-on-nails', name: 'Fashion Nail Pink Star & Rose Gem Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-PINK-STAR-ROSE', shortDescription: 'Pink press-on nails with star and rose gem accents.', images: [
    '/product%20images/Fashion%20Nail%20Pink%20Star%20%26%20Rose%20Gem%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Star%20%26%20Rose%20Gem%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Star%20%26%20Rose%20Gem%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-cute-cat-moon-gem-press-on-nails', name: 'Fashion Nail Cute Cat & Moon Gem Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-CAT-MOON-GEM', shortDescription: 'Cute cat and moon gem press-on nail designs.', images: [
    '/product%20images/Fashion%20Nail%20Cute%20Cat%20%26%20Moon%20Gem%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Cute%20Cat%20%26%20Moon%20Gem%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Cute%20Cat%20%26%20Moon%20Gem%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-pink-ombre-heart-pearl-press-on-nails', name: 'Fashion Nail Pink Ombre Heart & Pearl Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-OMBRE-HEART-PEARL', shortDescription: 'Pink ombre press-on nails with heart and pearl details.', images: [
    '/product%20images/Fashion%20Nail%20Pink%20Ombre%20Heart%20%26%20Pearl%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Ombre%20Heart%20%26%20Pearl%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Pink%20Ombre%20Heart%20%26%20Pearl%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'pink-key-classic-french-tip-press-on-nails-12-pcs', name: 'Pink Key Classic French Tip Press-On Nails Set (12 Pcs)', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'PINK-KEY-CLASSIC-FRENCH-12PCS', shortDescription: 'A 12-piece classic French tip press-on nail set.', images: [
    '/product%20images/Pink%20Key%20Classic%20French%20Tip%20Press-On%20Nails%20Set%20(12%20Pcs)1.webp',
    '/product%20images/Pink%20Key%20Classic%20French%20Tip%20Press-On%20Nails%20Set%20(12%20Pcs)2.webp',
    '/product%20images/Pink%20Key%20Classic%20French%20Tip%20Press-On%20Nails%20Set%20(12%20Pcs)3.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-purple-ombre-silver-charm-press-on-nails', name: 'Fashion Nail Purple Ombre Silver Charm Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-PURPLE-SILVER-CHARM', shortDescription: 'Purple ombre press-on nails with silver charm details.', images: [
    '/product%20images/Fashion%20Nail%20Purple%20Ombre%20Silver%20Charm%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Purple%20Ombre%20Silver%20Charm%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Purple%20Ombre%20Silver%20Charm%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-floral-print-pink-butterfly-gem-press-on-nails', name: 'Fashion Nail Floral Print Pink Butterfly Gem Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-FLORAL-BUTTERFLY', shortDescription: 'Floral print press-on nails with pink butterfly gem accents.', images: [
    '/product%20images/Fashion%20Nail%20Floral%20Print%20Pink%20Butterfly%20Gem%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Floral%20Print%20Pink%20Butterfly%20Gem%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Floral%20Print%20Pink%20Butterfly%20Gem%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'dodo-lady-matte-dark-nude-almond-press-on-nails', name: 'DoDo Lady Matte Dark Nude Almond Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'DODO-DARK-NUDE-ALMOND', shortDescription: 'Matte dark nude almond-shaped press-on nails.', images: [
    '/product%20images/DoDo%20Lady%20Matte%20Dark%20Nude%20Almond%20Press-On%20Nails-01.webp',
    '/product%20images/DoDo%20Lady%20Matte%20Dark%20Nude%20Almond%20Press-On%20Nails-02.webp',
    '/product%20images/DoDo%20Lady%20Matte%20Dark%20Nude%20Almond%20Press-On%20Nails-03.webp'
  ] }),
  makeProduct({ slug: 'dodo-lady-matte-light-nude-almond-press-on-nails', name: 'DoDo Lady Matte Light Nude Almond Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'DODO-LIGHT-NUDE-ALMOND', shortDescription: 'Matte light nude almond-shaped press-on nails.', images: [
    '/product%20images/DoDo%20Lady%20Matte%20Light%20Nude%20Almond%20Press-On%20Nails-02.webp',
    '/product%20images/DoDo%20Lady%20Matte%20Light%20Nude%20Almond%20Press-On%20Nails-03.webp',
    '/product%20images/DoDo%20Lady%20Matte%20Light%20Nude%20Almond%20Press-On%20Nails-01.webp'
  ] }),
  makeProduct({ slug: 'fashion-nail-burgundy-glitter-ombre-moon-gem-press-on-nails', name: 'Fashion Nail Burgundy Glitter Ombre Moon Gem Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'FASHION-NAIL-BURGUNDY-MOON-GEM', shortDescription: 'Burgundy glitter ombre press-on nails with moon gems.', images: [
    '/product%20images/Fashion%20Nail%20Burgundy%20Glitter%20Ombre%20Moon%20Gem%20Press-On%20Nails%201.webp',
    '/product%20images/Fashion%20Nail%20Burgundy%20Glitter%20Ombre%20Moon%20Gem%20Press-On%20Nails%202.webp',
    '/product%20images/Fashion%20Nail%20Burgundy%20Glitter%20Ombre%20Moon%20Gem%20Press-On%20Nails%203.webp'
  ] }),
  makeProduct({ slug: 'dodo-lady-matte-peach-nude-almond-press-on-nails', name: 'DoDo Lady Matte Peach Nude Almond Press-On Nails', price: 500, originalPrice: 650, discountPercent: 23, category: 'Nails', categorySlug: 'nails', subcategory: 'Press', subcategorySlug: 'press', sku: 'DODO-PEACH-NUDE-ALMOND', shortDescription: 'Matte peach nude almond-shaped press-on nails.', images: [
    '/product%20images/DoDo%20Lady%20Matte%20Peach%20Nude%20Almond%20Press-On%20Nails-03.webp',
    '/product%20images/DoDo%20Lady%20Matte%20Peach%20Nude%20Almond%20Press-On%20Nails-01.webp',
    '/product%20images/DoDo%20Lady%20Matte%20Peach%20Nude%20Almond%20Press-On%20Nails-02.webp'
  ] }),
  makeProduct({
    slug: 'dodo-lady-matte-chocolate-brown-almond-press-on-nails',
    name: 'DoDo Lady Matte Chocolate Brown Almond Press-On Nails',
    price: 500,
    originalPrice: 650,
    discountPercent: 23,
    category: 'Nails',
    categorySlug: 'nails',
    subcategory: 'Press',
    subcategorySlug: 'press',
    sku: 'DODO-CHOCOLATE-BROWN-ALMOND',
    shortDescription: 'Matte chocolate brown almond-shaped press-on nails.',
    images: [
      '/product%20images/DoDo%20Lady%20Matte%20Chocolate%20Brown%20Almond%20Press-On%20Nails-02.webp',
      '/product%20images/DoDo%20Lady%20Matte%20Chocolate%20Brown%20Almond%20Press-On%20Nails-03.webp',
      '/product%20images/DoDo%20Lady%20Matte%20Chocolate%20Brown%20Almond%20Press-On%20Nails-01.webp'
    ]
  }),
  makeProduct({ slug: 'sadoer-whiten-hand-mask', name: 'Sadoer Whiten Hand Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Hand Mask', subcategorySlug: 'hand-mask', sku: 'SADOER-WHITEN-HAND-MASK', shortDescription: 'A hand mask for softer, brighter-looking hands.', images: [
    '/product%20images/Sadoer%20Whiten%20Hand%20Mask1.webp',
    '/product%20images/Sadoer%20Whiten%20Hand%20Mask3.webp',
    '/product%20images/Sadoer%20Whiten%20Hand%20Mask2.webp'
  ] }),
  makeProduct({ slug: 'sadoer-coconut-extract-nourish-hand-mask', name: 'Sadoer Coconut Extract Nourish Hand Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Hand Mask', subcategorySlug: 'hand-mask', sku: 'SADOER-COCONUT-NOURISH-HAND-MASK', shortDescription: 'A nourishing coconut extract hand mask for soft, moisturised hands.', images: [
    '/product%20images/SADOER%20Coconut%20Extract%20Nourish%20Soften%20Exfoliation%20Hand%20Mask1.webp',
    '/product%20images/SADOER%20Coconut%20Extract%20Nourish%20Soften%20Exfoliation%20Hand%20Mask3.webp',
    '/product%20images/SADOER%20Coconut%20Extract%20Nourish%20Soften%20Exfoliation%20Hand%20Mask2.webp'
  ] }),
  makeProduct({ slug: 'sadoer-lemon-extract-hydrate-hand-mask', name: 'Sadoer Lemon Extract Hydrate Hand Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Hand Mask', subcategorySlug: 'hand-mask', sku: 'SADOER-LEMON-HYDRATE-HAND-MASK', shortDescription: 'A hydrating lemon extract hand mask for refreshed hands.', images: [
    '/product%20images/SADOER%20Lemon%20Extract%20Hydrate%20Soften%20Exfoliation%20Hand%20Mask2.webp',
    '/product%20images/SADOER%20Lemon%20Extract%20Hydrate%20Soften%20Exfoliation%20Hand%20Mask3.webp',
    '/product%20images/SADOER%20Lemon%20Extract%20Hydrate%20Soften%20Exfoliation%20Hand%20Mask1.webp'
  ] }),
  makeProduct({ slug: 'sadoer-strawberry-extract-moisture-hand-mask', name: 'Sadoer Strawberry Extract Moisture Hand Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Hand Mask', subcategorySlug: 'hand-mask', sku: 'SADOER-STRAWBERRY-MOISTURE-HAND-MASK', shortDescription: 'A moisture-boosting strawberry extract hand mask.', images: [
    '/product%20images/Sadoer%20Strawberry%20Extract%20Moisture%20Soften%20Exfoliation%20Hand%20Mask1.webp',
    '/product%20images/Sadoer%20Strawberry%20Extract%20Moisture%20Soften%20Exfoliation%20Hand%20Mask2.webp',
    '/product%20images/Sadoer%20Strawberry%20Extract%20Moisture%20Soften%20Exfoliation%20Hand%20Mask3.webp'
  ] }),
  makeProduct({ slug: 'sadoer-rejuvenating-coconut-oil-hand-mask', name: 'Sadoer Rejuvenating Coconut Oil Hand Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Hand Mask', subcategorySlug: 'hand-mask', sku: 'SADOER-REJUVENATING-COCONUT-HAND-MASK', shortDescription: 'A rejuvenating coconut oil hand mask for nourished-looking hands.', images: [
    '/product%20images/Sadoer%20Rejuvenating%20Coconut%20Oil%20Hand%20Mask-01.webp',
    '/product%20images/Sadoer%20Rejuvenating%20Coconut%20Oil%20Hand%20Mask-02.webp',
    '/product%20images/Sadoer%20Rejuvenating%20Coconut%20Oil%20Hand%20Mask-03.webp'
  ] }),
  makeProduct({ slug: 'fayankou-avocado-petroleum-jelly-hand-mask', name: 'FAYANKOU Avocado Petroleum Jelly Moisturizing Hand Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Hand Mask', subcategorySlug: 'hand-mask', sku: 'FAYANKOU-AVOCADO-HAND-MASK', shortDescription: 'A moisturising avocado and petroleum jelly hand mask.', images: [
    '/product%20images/FAYANKOU%20Avocado%20Petroleum%20Jelly%20Moisturizing%20foot%20Mask1.webp',
    '/product%20images/FAYANKOU%20Avocado%20Petroleum%20Jelly%20Moisturizing%20foot%20Mask2.webp',
    '/product%20images/FAYANKOU%20Avocado%20Petroleum%20Jelly%20Moisturizing%20foot%20Mask3.webp'
  ] }),
  makeProduct({ slug: 'sadoer-strawberry-extract-moisture-soften-exfoliation-foot-mask', name: 'Sadoer Strawberry Extract Moisture Soften Exfoliation Foot Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Foot Mask', subcategorySlug: 'foot-mask', sku: 'SADOER-STRAWBERRY-EXFOLIATION-FOOT-MASK', shortDescription: 'A strawberry extract foot mask for moisture and gentle exfoliation.', images: [
    '/product%20images/Sadoer%20Strawberry%20Extract%20Moisture%20Soften%20Exfoliation%20Foot%20Mask3.webp',
    '/product%20images/Sadoer%20Strawberry%20Extract%20Moisture%20Soften%20Exfoliation%20Foot%20Mask1.webp',
    '/product%20images/Sadoer%20Strawberry%20Extract%20Moisture%20Soften%20Exfoliation%20Foot%20Mask2.webp'
  ] }),
  makeProduct({ slug: 'sadoer-whiten-foot-mask', name: 'Sadoer Whiten Foot Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Foot Mask', subcategorySlug: 'foot-mask', sku: 'SADOER-WHITEN-FOOT-MASK', shortDescription: 'A foot mask for softer, brighter-looking feet.', images: [
    '/product%20images/Sadoer%20Whiten%20Foot%20Mask1.webp',
    '/product%20images/Sadoer%20Whiten%20Foot%20Mask2.webp',
    '/product%20images/Sadoer%20Whiten%20Foot%20Mask3.webp'
  ] }),
  makeProduct({ slug: 'sadoer-coconut-extract-nourish-foot-mask', name: 'Sadoer Coconut Extract Nourish Foot Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Foot Mask', subcategorySlug: 'foot-mask', sku: 'SADOER-COCONUT-NOURISH-FOOT-MASK', shortDescription: 'A nourishing coconut extract foot mask for soft feet.', images: [
    '/product%20images/SADOER%20Coconut%20Extract%20Nourish%20Soften%20Exfoliation%20Foot%20Mask1.webp',
    '/product%20images/SADOER%20Coconut%20Extract%20Nourish%20Soften%20Exfoliation%20Foot%20Mask2.webp',
    '/product%20images/SADOER%20Coconut%20Extract%20Nourish%20Soften%20Exfoliation%20Foot%20Mask3.webp'
  ] }),
  makeProduct({ slug: 'sadoer-softening-coconut-oil-foot-mask', name: 'Sadoer Softening Coconut Oil Foot Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Foot Mask', subcategorySlug: 'foot-mask', sku: 'SADOER-SOFTENING-COCONUT-FOOT-MASK', shortDescription: 'A softening coconut oil foot mask for nourished-looking feet.', images: [
    '/product%20images/Sadoer%20Softening%20Coconut%20Oil%20Foot%20Mask-03.webp',
    '/product%20images/Sadoer%20Softening%20Coconut%20Oil%20Foot%20Mask-01.webp',
    '/product%20images/Sadoer%20Softening%20Coconut%20Oil%20Foot%20Mask-02.webp'
  ] }),
  makeProduct({ slug: 'sadoer-lemon-extract-hydrate-foot-mask', name: 'Sadoer Lemon Extract Hydrate Foot Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Foot Mask', subcategorySlug: 'foot-mask', sku: 'SADOER-LEMON-HYDRATE-FOOT-MASK', shortDescription: 'A hydrating lemon extract foot mask for refreshed feet.', images: [
    '/product%20images/Sadoer%20Lemon%20Extract%20Hydrate%20Soften%20Exfoliation%20Foot%20Mask1.webp',
    '/product%20images/Sadoer%20Lemon%20Extract%20Hydrate%20Soften%20Exfoliation%20Foot%20Mask2.webp',
    '/product%20images/Sadoer%20Lemon%20Extract%20Hydrate%20Soften%20Exfoliation%20Foot%20Mask3.webp'
  ] }),
  makeProduct({ slug: 'sadoer-peach-extract-lustrous-soften-exfoliation-foot-mask', name: 'Sadoer Peach Extract Lustrous Soften Exfoliation Foot Mask', price: 350, originalPrice: 450, discountPercent: 22, category: 'Hand & Foot Care', categorySlug: 'hand-and-foot-care', subcategory: 'Foot Mask', subcategorySlug: 'foot-mask', sku: 'SADOER-PEACH-EXFOLIATION-FOOT-MASK', shortDescription: 'A peach extract foot mask for softening and gentle exfoliation.', images: [
    '/product%20images/Sadoer%20Peach%20Extract%20Lustrous%20Soften%20Exfoliation%20Foot%20Mask1.webp',
    '/product%20images/Sadoer%20Peach%20Extract%20Lustrous%20Soften%20Exfoliation%20Foot%20Mask2.webp',
    '/product%20images/Sadoer%20Peach%20Extract%20Lustrous%20Soften%20Exfoliation%20Foot%20Mask3.webp'
  ] }),
  makeProduct({
    slug: 'sadoer-nourishing-coconut-oil-eye-mask',
    name: 'SADOER Nourishing Coconut Oil Eye Mask',
    price: 140,
    originalPrice: 180,
    discountPercent: 22,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Eye Mask',
    subcategorySlug: 'eye-mask',
    sku: 'SADOER-COCONUT-OIL-EYE-MASK',
    shortDescription: 'A nourishing coconut oil eye mask for refreshed-looking under-eyes.',
    fullDescription: 'SADOER Nourishing Coconut Oil Eye Mask provides a refreshing care step for the delicate under-eye area.',
    images: [
      '/product%20images/SADOER%20Nourishing%20Coconut%20Oil%20Eye%20Mask3.webp',
      '/product%20images/SADOER%20Nourishing%20Coconut%20Oil%20Eye%20Mask2.webp',
      '/product%20images/SADOER%20Nourishing%20Coconut%20Oil%20Eye%20Mask1.webp'
    ]
  }),
  makeProduct({
    slug: 'sadoer-pure-natural-active-collagen-anti-aging-eye-mask',
    name: 'SADOER Pure Natural Active Collagen Anti-Aging Eye Mask',
    price: 115,
    originalPrice: 150,
    discountPercent: 23,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Eye Mask',
    subcategorySlug: 'eye-mask',
    sku: 'SADOER-COLLAGEN-ANTI-AGING-EYE-MASK',
    shortDescription: 'A collagen eye mask for a refreshed and smoother-looking eye area.',
    fullDescription: 'SADOER Pure Natural Active Collagen Eye Mask delivers a comfortable anti-aging care step for the under-eye area.',
    images: [
      '/product%20images/SADOER%20Pure%20Natural%20Active%20Collagen%20Anti-Aging%20Eye%20Mask3.webp',
      '/product%20images/SADOER%20Pure%20Natural%20Active%20Collagen%20Anti-Aging%20Eye%20Mask2.webp',
      '/product%20images/SADOER%20Pure%20Natural%20Active%20Collagen%20Anti-Aging%20Eye%20Mask1.webp'
    ]
  }),
  makeProduct({
    slug: 'sadoer-collagen-anti-aging-lip-mask',
    name: 'SADOER Collagen Anti-Aging Lip Mask',
    price: 140,
    originalPrice: 180,
    discountPercent: 22,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Lip Mask',
    subcategorySlug: 'lip-mask',
    sku: 'SADOER-COLLAGEN-ANTI-AGING-LIP-MASK',
    shortDescription: 'A collagen lip mask for soft, nourished-looking lips.',
    fullDescription: 'SADOER Collagen Anti-Aging Lip Mask provides a comfortable conditioning treatment for soft and refreshed-looking lips.',
    images: [
      '/product%20images/SADOER%20Collagen%20Anti-Aging%20Lip%20Mask3.webp',
      '/product%20images/SADOER%20Collagen%20Anti-Aging%20Lip%20Mask2.webp',
      '/product%20images/SADOER%20Collagen%20Anti-Aging%20Lip%20Mask1.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-deep-cleansing-nose-pore-strips-10-pcs',
    name: 'emelie Deep Cleansing Nose Pore Strips 10 Pcs Pack Sachet',
    price: 450,
    originalPrice: 600,
    discountPercent: 25,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Pore Strips',
    subcategorySlug: 'pore-strips',
    sku: 'EMELIE-DEEP-CLEANSING-PORE-STRIPS-10PCS',
    shortDescription: 'A 10-piece nose pore strip pack for a deep-cleansing skincare step.',
    fullDescription: 'emelie Deep Cleansing Nose Pore Strips help lift surface impurities from the nose area for a fresh, clean feel.',
    images: [
      '/product%20images/emelie%20Deep%20Cleansing%20Nose%20Pore%20Strips%2010%20pcs%20pack%20sachet-03.webp',
      '/product%20images/emelie%20Deep%20Cleansing%20Nose%20Pore%20Strips%2010%20pcs%20pack%20sachet-01.webp',
      '/product%20images/emelie%20Deep%20Cleansing%20Nose%20Pore%20Strips%2010%20pcs%20pack%20sachet02.webp'
    ]
  }),
  makeProduct({
    slug: 'woomin-zafrani-6-steps-facial-kit-sachet',
    name: 'Woomin Zafrani 6 Steps Facial Kit Sachet',
    price: 450,
    originalPrice: 600,
    discountPercent: 25,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Facial Kit',
    subcategorySlug: 'facial-kit',
    sku: 'WOOMIN-ZAFRANI-6-STEPS-FACIAL-KIT',
    shortDescription: 'A six-step facial kit sachet for a complete at-home skincare routine.',
    fullDescription: 'Woomin Zafrani 6 Steps Facial Kit Sachet brings together a simple multi-step facial care routine for refreshed-looking skin.',
    images: [
      '/product%20images/Woomin%20Zafrani%206%20Steps%20Facial%20Kit%20Sachet%202.webp',
      '/product%20images/Woomin%20Zafrani%206%20Steps%20Facial%20Kit%20Sachet%203.webp',
      '/product%20images/Woomin%20Zafrani%206%20Steps%20Facial%20Kit%20Sachet%201.webp'
    ]
  }),
  makeProduct({
    slug: 'woomin-hydra-6-steps-facial-kit-sachet',
    name: 'Woomin Hydra 6 Steps Facial Kit Sachet',
    price: 450,
    originalPrice: 600,
    discountPercent: 25,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Facial Kit',
    subcategorySlug: 'facial-kit',
    sku: 'WOOMIN-HYDRA-6-STEPS-FACIAL-KIT',
    shortDescription: 'A six-step hydrating facial kit sachet for an at-home skincare ritual.',
    fullDescription: 'Woomin Hydra 6 Steps Facial Kit Sachet provides a convenient multi-step routine focused on a fresh, hydrated-looking complexion.',
    images: [
      '/product%20images/Woomin%20Hydra%206%20Steps%20Facial%20Kit%20Sachet%202.webp',
      '/product%20images/Woomin%20Hydra%206%20Steps%20Facial%20Kit%20Sachet%201.webp',
      '/product%20images/Woomin%20Hydra%206%20Steps%20Facial%20Kit%20Sachet3.webp'
    ]
  }),
  makeProduct({
    slug: 'gluta-white-hydrating-skin-polish-vol-20',
    name: 'Gluta White Hydrating Skin Polish Vol 20 (6%)',
    price: 700,
    originalPrice: 900,
    discountPercent: 22,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Skin Polish',
    subcategorySlug: 'skin-polish',
    sku: 'GLUTA-WHITE-HYDRATING-SKIN-POLISH',
    shortDescription: 'A hydrating skin polish for a smoother, refreshed-looking complexion.',
    fullDescription: 'Gluta White Hydrating Skin Polish helps refine the feel of skin while supporting a fresh, hydrated-looking finish.',
    images: [
      '/product%20images/Gluta%20White%20Hydrating%20Skin%20Polish%20Vol%2020%20(6_)%203.webp',
      '/product%20images/Gluta%20White%20Hydrating%20Skin%20Polish%20Vol%2020%20(6_)%202.webp',
      '/product%20images/Gluta%20White%20Hydrating%20Skin%20Polish%20Vol%2020%20(6_)%201.webp'
    ]
  }),
  makeProduct({
    slug: 'zafrani-orange-yellow-cream-scrub-500g',
    name: 'Zafrani Orange and Yellow Cream/Scrub Jar 500 Gram',
    price: 2500,
    originalPrice: 3000,
    discountPercent: 17,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Scrub',
    subcategorySlug: 'scrub',
    sku: 'ZAFRANI-ORANGE-YELLOW-CREAM-SCRUB-500G',
    shortDescription: 'A generously sized cream and scrub jar for a polished skincare routine.',
    fullDescription: 'Zafrani Orange and Yellow Cream/Scrub combines cream care with a scrub step for a refreshed, smooth-feeling complexion.',
    images: [
      '/product%20images/Zafrani%20Orange%20and%20Yellow%20Cream%20Scrub%20Jar%20500%20gram%20jar2.webp',
      '/product%20images/Zafrani%20Orange%20and%20Yellow%20Cream%20Scrub%20Jar%20500%20gram%20jar1.webp',
      '/product%20images/Zafrani%20Orange%20and%20Yellow%20Cream%20Scrub%20Jar%20500%20gram%20jar3.webp'
    ]
  }),
  makeProduct({
    slug: 'city-girl-multani-mitti-brightening-glowing-cream-bleach',
    name: 'City Girl Multani Mitti Brightening & Glowing Cream Bleach',
    price: 80,
    originalPrice: 100,
    discountPercent: 20,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Bleach Cream',
    subcategorySlug: 'bleach-cream',
    sku: 'CITY-GIRL-MULTANI-MITTI-CREAM-BLEACH',
    shortDescription: 'A Multani Mitti cream bleach for a bright, refreshed-looking complexion.',
    fullDescription: 'City Girl Multani Mitti Brightening and Glowing Cream Bleach is designed for a simple brightening care step at home.',
    images: [
      '/product%20images/City%20Girl%20Multani%20Mitti%20Brightening%20%26%20Glowing%20Cream%20Bleach-02.webp',
      '/product%20images/City%20Girl%20Multani%20Mitti%20Brightening%20%26%20Glowing%20Cream%20Bleach-03.webp',
      '/product%20images/City%20Girl%20Multani%20Mitti%20Brightening%20%26%20Glowing%20Cream%20Bleach-01.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-4-colors-matte-eyebrow-powder',
    name: 'emelie Paris 4-Colors Matte Eyebrow Powder',
    price: 650,
    originalPrice: 800,
    discountPercent: 19,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Brow',
    subcategorySlug: 'brow',
    sku: 'EMELIE-4-COLOR-MATTE-BROW-POWDER',
    shortDescription: 'A four-colour matte eyebrow powder palette for natural brow definition.',
    fullDescription: 'emelie Paris 4-Colors Matte Eyebrow Powder offers blendable shades for filling, shaping, and defining brows.',
    images: [
      '/product%20images/emelie%20Paris%204-Colors%20Matte%20Eyebrow%20Powder-03.jpg',
      '/product%20images/emelie%20Paris%204-Colors%20Matte%20Eyebrow%20Powder-01.jpg',
      '/product%20images/emelie%20Paris%204-Colors%20Matte%20Eyebrow%20Powder-02.jpg'
    ]
  }),
  makeProduct({
    slug: 'romantic-flower-eyebrow-cake-powder',
    name: 'ROMANTIC FLOWER Eyebrow Cake Powder',
    price: 450,
    originalPrice: 600,
    discountPercent: 25,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Brow',
    subcategorySlug: 'brow',
    sku: 'ROMANTIC-FLOWER-EYEBROW-CAKE',
    shortDescription: 'An eyebrow cake powder for smooth and defined brows.',
    fullDescription: 'ROMANTIC FLOWER Eyebrow Cake Powder helps shape and define brows with smooth, buildable colour.',
    images: [
      '/product%20images/ROMANTIC%20FLOWER%20Eyebrow%20Cake%20Powder3.webp',
      '/product%20images/ROMANTIC%20FLOWER%20Eyebrow%20Cake%20Powder2.webp',
      '/product%20images/ROMANTIC%20FLOWER%20Eyebrow%20Cake%20Powder1.webp'
    ]
  }),
  makeProduct({
    slug: 'sadoer-kojic-acid-mild-oil-control-cleanser-100g',
    name: 'Sadoer Kojic Acid Mild Oil Control Cleanser (100g)',
    price: 550,
    originalPrice: 700,
    discountPercent: 21,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cleanser',
    subcategorySlug: 'cleanser',
    sku: 'SADOER-KOJIC-OIL-CONTROL-CLEANSER',
    shortDescription: 'A mild kojic acid cleanser designed to cleanse and help control excess oil.',
    fullDescription: 'Sadoer Kojic Acid Mild Oil Control Cleanser gently removes daily buildup while helping skin feel fresh and balanced.',
    images: [
      '/product%20images/Sadoer%20Kojic%20Acid%20Mild%20Oil%20Control%20Cleanser%20%28100g%29-02.webp',
      '/product%20images/Sadoer%20Kojic%20Acid%20Mild%20Oil%20Control%20Cleanser%20%28100g%29-03.webp',
      '/product%20images/Sadoer%20Kojic%20Acid%20Mild%20Oil%20Control%20Cleanser%20%28100g%29-01.webp'
    ]
  }),
  makeProduct({
    slug: 'sadoer-tea-tree-acne-oil-control-facial-cleanser',
    name: 'Sadoer Tea Tree Acne Oil Control Facial Cleanser',
    price: 650,
    originalPrice: 650,
    discountPercent: 0,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cleanser',
    subcategorySlug: 'cleanser',
    sku: 'SADOER-TEA-TREE-ACNE-CLEANSER',
    shortDescription: 'A tea tree facial cleanser designed to help cleanse skin and control excess oil.',
    fullDescription: 'Sadoer Tea Tree Acne Oil Control Facial Cleanser helps remove daily buildup and excess oil for a fresh, clean-feeling complexion.',
    images: [
      '/product%20images/sadoer-tea-tree-cleanser-1.webp',
      '/product%20images/sadoer-tea-tree-cleanser-3.webp',
      '/product%20images/sadoer-tea-tree-cleanser-2.webp'
    ]
  }),
  makeProduct({
    slug: 'sadoer-himalayan-pink-salt-purifies-pores-cleanser',
    name: 'Sadoer Himalayan Pink Salt Purifies Pores Cleanser',
    price: 650,
    originalPrice: 800,
    discountPercent: 19,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cleanser',
    subcategorySlug: 'cleanser',
    sku: 'SADOER-HIMALAYAN-PINK-SALT-CLEANSER',
    shortDescription: 'A pore-purifying cleanser with Himalayan pink salt for a refreshed feel.',
    fullDescription: 'Sadoer Himalayan Pink Salt Cleanser helps remove impurities and leaves skin feeling clean and refreshed.',
    images: [
      '/product%20images/Sadoer%20Himalayan%20Pink%20Salt%20Purifies%20Pores%20Cleanser-03.webp',
      '/product%20images/Sadoer%20Himalayan%20Pink%20Salt%20Purifies%20Pores%20Cleanser-01.webp',
      '/product%20images/Sadoer%20Himalayan%20Pink%20Salt%20Purifies%20Pores%20Cleanser-02.webp'
    ]
  }),
  makeProduct({
    slug: 'sadoer-nicotinamide-arbutin-white-facial-cleanser',
    name: 'Sadoer Nicotinamide Arbutin White Facial Cleanser',
    price: 700,
    originalPrice: 700,
    discountPercent: 0,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cleanser',
    subcategorySlug: 'cleanser',
    sku: 'SADOER-NICOTINAMIDE-ARBUTIN-CLEANSER',
    shortDescription: 'A nicotinamide and arbutin facial cleanser for a fresh, clean feel.',
    fullDescription: 'Sadoer Nicotinamide Arbutin White Facial Cleanser helps cleanse away daily impurities while leaving skin feeling refreshed.',
    images: [
      '/product%20images/Sadoer%20Nicotinamide%20Arbutin%20White%20Facial%20Cleanser-02.webp',
      '/product%20images/Sadoer%20Nicotinamide%20Arbutin%20White%20Facial%20Cleanser-03.webp',
      '/product%20images/Sadoer%20Nicotinamide%20Arbutin%20White%20Facial%20Cleanser-01.webp'
    ]
  }),
  makeProduct({
    slug: 'mini-wipes-packet-8-pcs-pack',
    name: 'Mini Wipes Packet 8 pcs pack',
    price: 650,
    originalPrice: 650,
    discountPercent: 0,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Wipes',
    subcategorySlug: 'wipes',
    sku: 'MINI-WIPES-PACKET-8PCS',
    shortDescription: 'A compact eight-piece wipes packet for convenient everyday freshness.',
    fullDescription: 'Mini Wipes Packet includes eight individually convenient wipes for a quick, freshening routine at home or on the go.',
    images: [
      '/product%20images/Mini%20Wipes%20Packet%208%20pcs%20pack3.webp',
      '/product%20images/Mini%20Wipes%20Packet%208%20pcs%20pack2.webp',
      '/product%20images/Mini%20Wipes%20Packet%208%20pcs%20pack1.webp'
    ]
  }),
  makeProduct({
    slug: 'dr-rashel-vitamin-c-brightening-anti-aging-face-serum',
    name: 'Dr. Rashel Vitamin C Brightening & Anti-Aging Face Serum',
    price: 999,
    originalPrice: 1250,
    discountPercent: 20,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Serum',
    subcategorySlug: 'serum',
    sku: 'DR-RASHEL-VITAMIN-C-FACE-SERUM',
    shortDescription: 'A vitamin C face serum for a brighter, smoother-looking complexion.',
    fullDescription: 'Dr. Rashel Vitamin C Brightening and Anti-Aging Face Serum supports a radiant-looking complexion and smooth skin texture.',
    images: [
      '/product%20images/Dr.%20Rashel%20Vitamin%20C%20Brightening%20%26%20Anti-Aging%20Face%20Serum-03.webp',
      '/product%20images/Dr.%20Rashel%20Vitamin%20C%20Brightening%20%26%20Anti-Aging%20Face%20Serum-01.webp',
      '/product%20images/Dr.%20Rashel%20Vitamin%20C%20Brightening%20%26%20Anti-Aging%20Face%20Serum-02.webp'
    ]
  }),
  makeProduct({
    slug: 'dr-rashel-vitamin-c-brightening-anti-aging-night-cream',
    name: 'Dr. Rashel Vitamin C Brightening & Anti-Aging Night Cream',
    price: 1050,
    originalPrice: 1300,
    discountPercent: 19,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cream',
    subcategorySlug: 'cream',
    sku: 'DR-RASHEL-VITAMIN-C-NIGHT-CREAM',
    shortDescription: 'A vitamin C night cream for nourishing and brightening overnight care.',
    fullDescription: 'Dr. Rashel Vitamin C Brightening and Anti-Aging Night Cream provides comfortable overnight care for a fresh, radiant-looking complexion.',
    images: [
      '/product%20images/Dr.%20Rashel%20Vitamin%20C%20Brightening%20%26%20Anti-Aging%20Night%20Cream-02.webp',
      '/product%20images/Dr.%20Rashel%20Vitamin%20C%20Brightening%20%26%20Anti-Aging%20Night%20Cream-03.webp',
      '/product%20images/Dr.%20Rashel%20Vitamin%20C%20Brightening%20%26%20Anti-Aging%20Night%20Cream-01.webp'
    ]
  }),
  makeProduct({
    slug: 'skin-origins-bb-cream-advanced-skin-corrector',
    name: 'Skin Origins BB Cream Advanced Skin Corrector',
    price: 700,
    originalPrice: 900,
    discountPercent: 22,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'BB Cream',
    subcategorySlug: 'bb-cream',
    sku: 'SKIN-ORIGINS-BB-CREAM-CORRECTOR',
    shortDescription: 'An advanced BB cream that helps even the look of skin with lightweight coverage.',
    fullDescription: 'Skin Origins BB Cream Advanced Skin Corrector combines lightweight complexion coverage with a smooth, natural-looking finish.',
    images: [
      '/product%20images/Skin%20Origins%20BB%20Cream%20Advanced%20Skin%20Corrector1.webp',
      '/product%20images/Skin%20Origins%20BB%20Cream%20Advanced%20Skin%20Corrector2.webp',
      '/product%20images/Skin%20Origins%20BB%20Cream%20Advanced%20Skin%20Corrector3.webp'
    ]
  }),
  makeProduct({
    slug: 'yozo-vitamin-a-essence-anti-acne-facial-mask-packet',
    name: 'YOZO Vitamin A Essence Anti-Acne Facial Mask Packet',
    price: 300,
    originalPrice: 400,
    discountPercent: 25,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Sheet Mask',
    subcategorySlug: 'sheet-mask',
    sku: 'YOZO-VITAMIN-A-ANTI-ACNE-MASK',
    shortDescription: 'A vitamin A essence facial mask packet for refreshing skincare care.',
    fullDescription: 'YOZO Vitamin A Essence Anti-Acne Facial Mask helps provide a refreshing, comfortable skincare treatment.',
    images: [
      '/product%20images/YOZO%20Vitamin%20A%20Essence%20Anti-Acne%20Facial%20Mask%20Packet-01.webp',
      '/product%20images/YOZO%20Vitamin%20A%20Essence%20Anti-Acne%20Facial%20Mask%20Packet-02.webp',
      '/product%20images/YOZO%20Vitamin%20A%20Essence%20Anti-Acne%20Facial%20Mask%20Packet-03.webp'
    ]
  }),
  makeProduct({
    slug: 'yozo-vitamin-b5-soothing-sheet-mask',
    name: 'YOZO Vitamin B5 Soothing Sheet Mask',
    price: 300,
    originalPrice: 400,
    discountPercent: 25,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Sheet Mask',
    subcategorySlug: 'sheet-mask',
    sku: 'YOZO-VITAMIN-B5-SOOTHING-MASK',
    shortDescription: 'A soothing vitamin B5 sheet mask for comfortable skin hydration.',
    fullDescription: 'YOZO Vitamin B5 Soothing Sheet Mask delivers a calming, refreshing care step for a comfortable-looking complexion.',
    images: [
      '/product%20images/YOZO%20Vitamin%20B5%20Soothing%20Sheet%20Mask%201.webp',
      '/product%20images/YOZO%20Vitamin%20B5%20Soothing%20Sheet%20Mask%202.webp',
      '/product%20images/YOZO%20Vitamin%20B5%20Soothing%20Sheet%20Mask%203.webp'
    ]
  }),
  makeProduct({
    slug: 'yozo-vitamin-c-sheet-mask',
    name: 'YOZO Vitamin C Sheet Mask',
    price: 300,
    originalPrice: 400,
    discountPercent: 25,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Sheet Mask',
    subcategorySlug: 'sheet-mask',
    sku: 'YOZO-VITAMIN-C-SHEET-MASK',
    shortDescription: 'A vitamin C sheet mask for a fresh and radiant-looking complexion.',
    fullDescription: 'YOZO Vitamin C Sheet Mask provides a refreshing skincare step to help skin look bright and revitalised.',
    images: [
      '/product%20images/YOZO%20Vitamin%20C%20Sheet%20Mask2.webp',
      '/product%20images/YOZO%20Vitamin%20C%20Sheet%20Mask1.webp',
      '/product%20images/YOZO%20Vitamin%20C%20Sheet%20Mask3.webp'
    ]
  }),
  makeProduct({
    slug: 'beauty-naked-easy-to-use-lip-pencil-12-pcs-set',
    name: 'Beauty Naked Easy-to-use Lip Pencil 12 Pcs Set',
    price: 900,
    originalPrice: 1100,
    discountPercent: 18,
    category: 'Lips/Eyes',
    categorySlug: 'lips-eyes',
    subcategory: 'Pencil',
    subcategorySlug: 'pencil',
    sku: 'BEAUTY-NAKED-LIP-PENCIL-12PCS',
    shortDescription: 'A 12-piece lip pencil set for smooth, defined lip looks.',
    fullDescription: 'Beauty Naked Easy-to-use Lip Pencil Set includes 12 versatile shades for defining and shaping the lips.',
    images: [
      '/product%20images/Beauty%20Naked%20Easy-to-use%20Lip%20Pencil%2012%20pcs%20set-01.jpg',
      '/product%20images/Beauty%20Naked%20Easy-to-use%20Lip%20Pencil%2012%20pcs%20set-02.jpg',
      '/product%20images/Beauty%20Naked%20Easy-to-use%20Lip%20Pencil%2012%20pcs%20set-03.jpg'
    ]
  }),
  makeProduct({
    slug: 'magic-your-life-hyaluronic-acid-nutrition-gel-mascara',
    name: 'Magic Your Life Hyaluronic Acid Nutrition Gel Mascara',
    price: 450,
    originalPrice: 600,
    discountPercent: 25,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Mascara',
    subcategorySlug: 'mascara',
    sku: 'MAGIC-YOUR-LIFE-GEL-MASCARA',
    shortDescription: 'A nourishing gel mascara with hyaluronic acid for defined lashes.',
    fullDescription: 'Magic Your Life Hyaluronic Acid Nutrition Gel Mascara gives lashes smooth definition with a comfortable nourishing formula.',
    images: [
      '/product%20images/Magic%20Your%20Life%20Hyaluronic%20Acid%20Nutrition%20Gel%20Mascara3.webp',
      '/product%20images/Magic%20Your%20Life%20Hyaluronic%20Acid%20Nutrition%20Gel%20Mascara2.webp',
      '/product%20images/Magic%20Your%20Life%20Hyaluronic%20Acid%20Nutrition%20Gel%20Mascara1.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-ultra-hd-matte-velvet-skin-face-powder',
    name: 'emelie Paris Ultra HD Matte Velvet Skin Flawless Finish Face Powder',
    price: 880,
    originalPrice: 1100,
    discountPercent: 20,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-ULTRA-HD-MATTE-POWDER',
    shortDescription: 'An ultra HD matte powder for a smooth, flawless-looking finish.',
    fullDescription: 'emelie Paris Ultra HD Matte Velvet Skin Face Powder helps create a smooth matte complexion with a refined finish.',
    images: [
      '/product%20images/emelie%20Paris%20Ultra%20HD%20Matte%20Velvet%20Skin%20Flawless%20Finish%20Face%20Powder%203.webp',
      '/product%20images/emelie%20Paris%20Ultra%20HD%20Matte%20Velvet%20Skin%20Flawless%20Finish%20Face%20Powder%202.webp',
      '/product%20images/emelie%20Paris%20Ultra%20HD%20Matte%20Velvet%20Skin%20Flawless%20Finish%20Face%20Powder%201.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-city-of-lights-long-lasting-pressed-powder',
    name: 'emelie Paris Beauty The City of Lights Paris Long Lasting Pressed Powder',
    price: 880,
    originalPrice: 1100,
    discountPercent: 20,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-CITY-LIGHTS-PRESSED-POWDER',
    shortDescription: 'A long-lasting pressed powder for an even, polished complexion.',
    fullDescription: 'emelie Paris The City of Lights Long Lasting Pressed Powder helps set makeup with a smooth, polished finish.',
    images: [
      '/product%20images/emelie%20Paris%20Beauty%20The%20City%20of%20Lights%20Paris%20Long%20Lasting%20Pressed%20Powder-01.jpg',
      '/product%20images/emelie%20Paris%20Beauty%20The%20City%20of%20Lights%20Paris%20Long%20Lasting%20Pressed%20Powder-02.jpg',
      '/product%20images/emelie%20Paris%20Beauty%20The%20City%20of%20Lights%20Paris%20Long%20Lasting%20Pressed%20Powder-03.jpg'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-super-stay-matte-compact-powder',
    name: 'emelie Paris Super Stay Matte Super-Blendable Waterproof Finish Compact Powder',
    price: 850,
    originalPrice: 1050,
    discountPercent: 19,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-SUPER-STAY-MATTE-POWDER',
    shortDescription: 'A blendable waterproof compact powder with a long-lasting matte finish.',
    fullDescription: 'emelie Paris Super Stay Matte Compact Powder provides blendable coverage with a dependable waterproof matte finish.',
    images: [
      '/product%20images/emelie%20Paris%20Super%20Stay%20Matte%20Super-Blendable%20Waterproof%20Finish%20Compact%20Powder%202.webp',
      '/product%20images/emelie%20Paris%20Super%20Stay%20Matte%20Super-Blendable%20Waterproof%20Finish%20Compact%20Powder%201.webp',
      '/product%20images/emelie%20Paris%20Super%20Stay%20Matte%20Super-Blendable%20Waterproof%20Finish%20Compact%20Powder%203.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-oil-control-matte-face-powder',
    name: 'emelie Paris Oil Control All Day Matte Finish Face Powder',
    price: 880,
    originalPrice: 1100,
    discountPercent: 20,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-OIL-CONTROL-FACE-POWDER',
    shortDescription: 'An oil-control face powder for an all-day matte finish.',
    fullDescription: 'emelie Paris Oil Control Face Powder helps reduce shine and maintain a smooth matte complexion throughout the day.',
    images: [
      '/product%20images/emelie%20Paris%20Oil%20Control%20All%20Day%20Matte%20Finish%20Face%20Powder.jpg',
      '/product%20images/emelie%20Paris%20Oil%20Control%20All%20Day%20Matte%20Finish%20Face%20Powder2.png',
      '/product%20images/emelie%20Paris%20Oil%20Control%20All%20Day%20Matte%20Finish%20Face%20Powder3.png'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-3-in-1-perfect-touch-compact-powder',
    name: 'emelie Paris 3 in 1 Perfect Touch Matte Effect Compact Powder',
    price: 780,
    originalPrice: 980,
    discountPercent: 20,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-3-IN-1-PERFECT-TOUCH-POWDER',
    shortDescription: 'A three-in-one compact powder with a smooth matte effect.',
    fullDescription: 'emelie Paris 3 in 1 Perfect Touch Compact Powder helps even, set, and mattify the complexion in one easy step.',
    images: [
      '/product%20images/emelie%20Paris%203%20in%201%20Perfect%20Touch%20Matte%20Effect%20Compact%20Powder-01.jpg',
      '/product%20images/emelie%20Paris%203%20in%201%20Perfect%20Touch%20Matte%20Effect%20Compact%20Powder-02.jpg',
      '/product%20images/emelie%20Paris%203%20in%201%20Perfect%20Touch%20Matte%20Effect%20Compact%20Powder-03.jpg'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-24k-gold-dual-matte-finish-powder',
    name: 'emelie Paris 24K Gold Dual Matte Finish Powder',
    price: 750,
    originalPrice: 950,
    discountPercent: 21,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-24K-GOLD-DUAL-POWDER',
    shortDescription: 'A dual matte finish powder for smooth, refined complexion coverage.',
    fullDescription: 'emelie Paris 24K Gold Dual Matte Finish Powder offers versatile coverage and a smooth matte finish for a polished look.',
    images: [
      '/product%20images/emelie%20Paris%2024K%20Gold%20Dual%20Matte%20Finish%20Powder-03.jpg',
      '/product%20images/emelie%20Paris%2024K%20Gold%20Dual%20Matte%20Finish%20Powder-01.jpg',
      '/product%20images/emelie%20Paris%2024K%20Gold%20Dual%20Matte%20Finish%20Powder-02.jpg'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-new-matte-maker-finishing-powder',
    name: 'emelie Paris New Matte Maker Finishing Powder',
    price: 1020,
    originalPrice: 1250,
    discountPercent: 18,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Powder',
    subcategorySlug: 'powder',
    sku: 'EMELIE-NEW-MATTE-MAKER-POWDER',
    shortDescription: 'A finishing powder that helps set makeup with a smooth matte effect.',
    fullDescription: 'emelie Paris New Matte Maker Finishing Powder helps refine the appearance of skin and set makeup with a soft matte finish.',
    images: [
      '/product%20images/emelie%20Paris%20New%20Matte%20Maker%20Finishing%20Powder.webp',
      '/product%20images/emelie%20Paris%20New%20Matte%20Maker%20Finishing%20Powder2.webp',
      '/product%20images/emelie%20Paris%20New%20Matte%20Maker%20Finishing%20Powder3.webp'
    ]
  }),
  makeProduct({
    slug: 'iman-of-noble-omg-makeup-kit-palette',
    name: 'IMAN Of Noble OMG Makeup Kit Palette',
    price: 1150,
    originalPrice: 1400,
    discountPercent: 18,
    category: 'Face',
    categorySlug: 'face',
    subcategory: 'Kit/Palette',
    subcategorySlug: 'kit-palette',
    sku: 'IMAN-OMG-MAKEUP-KIT-PALETTE',
    shortDescription: 'A complete makeup kit palette for creating versatile face looks.',
    fullDescription: 'IMAN Of Noble OMG Makeup Kit Palette brings together versatile complexion shades for an easy, polished makeup routine.',
    images: [
      '/product%20images/IMAN%20Of%20Noble%20OMG%20Makeup%20Kit%20Palette1.webp',
      '/product%20images/IMAN%20Of%20Noble%20OMG%20Makeup%20Kit%20Palette2.webp',
      '/product%20images/IMAN%20Of%20Noble%20OMG%20Makeup%20Kit%20Palette3.webp'
    ]
  }),
  makeProduct({
    slug: 'golden-rose-waterproof-marker-eyeliner-3-pcs-set',
    name: 'Golden Rose (GR) Waterproof Marker Eyeliner 3 Pcs Set',
    price: 650,
    originalPrice: 800,
    discountPercent: 19,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Liner',
    subcategorySlug: 'liner',
    sku: 'GR-WATERPROOF-MARKER-LINER-3PCS',
    shortDescription: 'A three-piece waterproof marker eyeliner set for precise eye definition.',
    fullDescription: 'Golden Rose Waterproof Marker Eyeliner set offers three easy-to-use liners for defined, long-lasting eye looks.',
    images: [
      '/product%20images/Golden%20Rose%20(GR)%20Waterproof%20Marker%20Eyeliner%203%20pcs%20Set%202.webp',
      '/product%20images/Golden%20Rose%20(GR)%20Waterproof%20Marker%20Eyeliner%203%20pcs%20Set%201.webp',
      '/product%20images/Golden%20Rose%20(GR)%20Waterproof%20Marker%20Eyeliner%203%20pcs%20Set%203.webp'
    ]
  }),
  makeProduct({
    slug: 'aslan-sky-high-ultra-lasting-eyeliner',
    name: 'ASLAN Sky High Ultra Lasting Eyeliner',
    price: 300,
    originalPrice: 400,
    discountPercent: 25,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Liner',
    subcategorySlug: 'liner',
    sku: 'ASLAN-SKY-HIGH-EYELINER',
    shortDescription: 'An ultra-lasting eyeliner for clean, defined eye looks.',
    fullDescription: 'ASLAN Sky High Ultra Lasting Eyeliner glides on smoothly and helps create lasting definition around the eyes.',
    images: [
      '/product%20images/ASLAN%20Sky%20High%20Ultra%20Lasting%20Eyeliner-03.webp',
      '/product%20images/ASLAN%20Sky%20High%20Ultra%20Lasting%20Eyeliner-01.webp',
      '/product%20images/ASLAN%20Sky%20High%20Ultra%20Lasting%20Eyeliner-02.webp'
    ]
  }),
  makeProduct({
    slug: 'bob-kajal-magique',
    name: 'BOB Kajal Magique',
    price: 250,
    originalPrice: 320,
    discountPercent: 22,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Kajal',
    subcategorySlug: 'kajal',
    sku: 'BOB-KAJAL-MAGIQUE',
    shortDescription: 'A smooth kajal pencil for rich, defined eye looks.',
    fullDescription: 'BOB Kajal Magique provides smooth, rich colour for defining the waterline and creating expressive eye looks.',
    images: [
      '/product%20images/BOB%20Kajal%20Magique-01.jpg',
      '/product%20images/BOB%20Kajal%20Magique-02.jpg',
      '/product%20images/BOB%20Kajal%20Magique-03.jpg'
    ]
  }),
  makeProduct({
    slug: 'rose-lady-contour-better-cheek-palette',
    name: 'Rose Lady Contour Better Cheek Palette',
    price: 700,
    originalPrice: 900,
    discountPercent: 22,
    category: 'Cheeks',
    categorySlug: 'cheeks',
    subcategory: 'Palette',
    subcategorySlug: 'palette',
    sku: 'ROSE-LADY-CONTOUR-CHEEK-PALETTE',
    shortDescription: 'A cheek palette for adding contour, colour, and dimension.',
    fullDescription: 'Rose Lady Contour Better Cheek Palette combines versatile cheek shades for adding shape, warmth, and definition.',
    images: [
      '/product%20images/Rose%20Lady%20Contour%20Better%20Cheek%20Palette2.webp',
      '/product%20images/Rose%20Lady%20Contour%20Better%20Cheek%20Palette3.webp',
      '/product%20images/Rose%20Lady%20Contour%20Better%20Cheek%20Palette1.webp'
    ]
  }),
  makeProduct({
    slug: '3-colors-baked-marble-blush-palette',
    name: '3 Colors Baked Marble Blush Palette',
    price: 600,
    originalPrice: 750,
    discountPercent: 20,
    category: 'Cheeks',
    categorySlug: 'cheeks',
    subcategory: 'Palette',
    subcategorySlug: 'palette',
    sku: '3-COLORS-BAKED-MARBLE-BLUSH',
    shortDescription: 'A three-colour baked marble blush palette for a fresh cheek finish.',
    fullDescription: '3 Colors Baked Marble Blush Palette adds buildable colour and a fresh, polished finish to the cheeks.',
    images: [
      '/product%20images/3%20Colors%20Baked%20Marble%20Blush%20Palette-01.jpg',
      '/product%20images/3%20Colors%20Baked%20Marble%20Blush%20Palette-02.jpg',
      '/product%20images/3%20Colors%20Baked%20Marble%20Blush%20Palette-03.jpg'
    ]
  }),
  makeProduct({
    slug: 'rose-lady-new-fashion-5-color-contour-shading-palette',
    name: 'Rose Lady New Fashion 5 Color Palette Contour & Shading',
    price: 600,
    originalPrice: 800,
    discountPercent: 25,
    category: 'Cheeks',
    categorySlug: 'cheeks',
    subcategory: 'Palette',
    subcategorySlug: 'palette',
    sku: 'ROSE-LADY-5-COLOR-CONTOUR',
    shortDescription: 'A five-colour contour and shading palette for sculpting the face.',
    fullDescription: 'Rose Lady New Fashion Contour and Shading Palette offers five versatile shades for shaping and defining the face.',
    images: [
      '/product%20images/Rose%20Lady%20New%20Fashion%205%20Color%20Palette%20Contour%20%26%20Shading3.webp',
      '/product%20images/Rose%20Lady%20New%20Fashion%205%20Color%20Palette%20Contour%20%26%20Shading1.webp',
      '/product%20images/Rose%20Lady%20New%20Fashion%205%20Color%20Palette%20Contour%20%26%20Shading2.webp'
    ]
  }),
  makeProduct({
    slug: 'frs-eyebrow-eyeliner-pencil-2-in-1-with-brush-and-sharpener',
    name: 'FRS Eyebrow Eyeliner Pencil 2 In 1 with Brush and Sharpener',
    price: 250,
    originalPrice: 300,
    discountPercent: 17,
    category: 'Eyes',
    categorySlug: 'eyes',
    subcategory: 'Brow/Liner',
    subcategorySlug: 'brow-liner',
    sku: 'FRS-BROW-LINER-2IN1',
    shortDescription: 'A two-in-one eyebrow and eyeliner pencil with a brush and sharpener.',
    fullDescription: 'FRS Eyebrow Eyeliner Pencil combines precise definition with a built-in brush and sharpener for an easy everyday eye look.',
    images: [
      '/product%20images/FRS%20Eyebrow%20Eyeliner%20Pencil%202%20In%201%20with%20Brush%20and%20Sharpener1.webp',
      '/product%20images/FRS%20Eyebrow%20Eyeliner%20Pencil%202%20In%201%20with%20Brush%20and%20Sharpener2.webp',
      '/product%20images/FRS%20Eyebrow%20Eyeliner%20Pencil%202%20In%201%20with%20Brush%20and%20Sharpener3.webp'
    ]
  }),
  makeProduct({
    slug: 'ks-one-thanks-for-the-love-lipgloss-set-12-pcs',
    name: 'KS-ONE Thanks For The Love Lipgloss Set (12 Pcs)',
    price: 1300,
    originalPrice: 1600,
    discountPercent: 19,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Set',
    subcategorySlug: 'set',
    sku: 'KSONE-LOVE-LIPGLOSS-12PCS',
    shortDescription: 'A 12-piece lipgloss set for a variety of glossy lip looks.',
    fullDescription: 'KS-ONE Thanks For The Love Lipgloss Set includes 12 shades to create glossy lip looks for everyday wear and special occasions.',
    images: [
      '/product%20images/KS-ONE%20Thanks%20For%20The%20Love%20Lipglosed%20Set%20(12%20Pcs)%203.webp',
      '/product%20images/KS-ONE%20Thanks%20For%20The%20Love%20Lipglosed%20Set%20(12%20Pcs)%202.webp',
      '/product%20images/KS-ONE%20Thanks%20For%20The%20Love%20Lipglosed%20Set%20(12%20Pcs)%201.webp'
    ]
  }),
  makeProduct({
    slug: 'frs-matte-lipstick-pencil-set-12-pcs',
    name: 'FRS Matte Lipstick Pencil Set 12 Pcs',
    price: 900,
    originalPrice: 1100,
    discountPercent: 18,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Set',
    subcategorySlug: 'set',
    sku: 'FRS-MATTE-LIP-PENCIL-12PCS',
    shortDescription: 'A 12-piece matte lipstick pencil set with versatile everyday shades.',
    fullDescription: 'FRS Matte Lipstick Pencil Set offers 12 comfortable matte shades for defining and colouring the lips.',
    images: [
      '/product%20images/FRS%20Matte%20Lipstick%20Pencil%20Set%2012%20pcs%20set%20-01.jpg',
      '/product%20images/FRS%20Matte%20Lipstick%20Pencil%20Set%2012%20pcs%20set%20-02.jpg',
      '/product%20images/FRS%20Matte%20Lipstick%20Pencil%20Set%2012%20pcs%20set%20-03.jpg'
    ]
  }),
  makeProduct({
    slug: 'hudamoji-jelly-tint-4-pcs-set',
    name: 'Hudamoji Jelly Tint 4 Pcs Set',
    price: 1600,
    originalPrice: 2000,
    discountPercent: 20,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Set',
    subcategorySlug: 'set',
    sku: 'HUDAMOJI-JELLY-TINT-4PCS',
    shortDescription: 'A four-piece jelly tint set for fresh, buildable lip colour.',
    fullDescription: 'Hudamoji Jelly Tint Set includes four easy-to-layer tints that leave lips with a fresh and comfortable wash of colour.',
    images: [
      '/product%20images/Hudamoji%20Jelly%20Tint%204%20Pcs%20Set%202.webp',
      '/product%20images/Hudamoji%20Jelly%20Tint%204%20Pcs%20Set%201.webp',
      '/product%20images/Hudamoji%20Jelly%20Tint%204%20Pcs%20Set%203.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-liquid-lipstick-lipgloss-set',
    name: 'emelie Paris Liquid Lipstick & Lipgloss Set',
    price: 1200,
    originalPrice: 1500,
    discountPercent: 20,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Set',
    subcategorySlug: 'set',
    sku: 'EMELIE-LIQUID-LIP-GLOSS-SET',
    shortDescription: 'A liquid lipstick and lipgloss set for a smooth, polished lip finish.',
    fullDescription: 'emelie Paris Liquid Lipstick and Lipgloss Set pairs rich colour with glossy shine for a polished lip look.',
    images: [
      '/product%20images/emelie%20Paris%20Liquid%20Lipstick%20%26%20Lipgloss%20Set2.webp',
      '/product%20images/emelie%20Paris%20Liquid%20Lipstick%20%26%20Lipgloss%20Set.webp',
      '/product%20images/emelie%20Paris%20Liquid%20Lipstick%20%26%20Lipgloss%20Set3.webp'
    ]
  }),
  makeProduct({
    slug: 'emelie-paris-matte-lip-crayon-pencil-set',
    name: 'Emelie Paris Matte Lip Crayon Pencil Set',
    price: 800,
    originalPrice: 1000,
    discountPercent: 20,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Set',
    subcategorySlug: 'set',
    sku: 'EMELIE-MATTE-LIP-CRAYON-SET',
    shortDescription: 'A matte lip crayon pencil set for smooth, defined lip colour.',
    fullDescription: 'Emelie Paris Matte Lip Crayon Pencil Set provides smooth application and comfortable matte colour for a polished lip look.',
    images: [
      '/product%20images/Emelie%20Paris%20Matte%20Lip%20Crayon%20Pencil%20Set.webp',
      '/product%20images/Emelie%20Paris%20Matte%20Lip%20Crayon%20Pencil%20Set2.webp',
      '/product%20images/Emelie%20Paris%20Matte%20Lip%20Crayon%20Pencil%20Set3.webp'
    ]
  }),
  makeProduct({
    slug: 'moc-allure-teddy-bear-matte-lipgloss',
    name: 'Moc Allure Teddy Bear Matte Lipgloss',
    price: 300,
    originalPrice: 400,
    discountPercent: 25,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Gloss',
    subcategorySlug: 'gloss',
    sku: 'MOC-ALLURE-TEDDY-BEAR-MATTE',
    shortDescription: 'A soft matte lipgloss with a smooth, comfortable finish.',
    fullDescription: 'Moc Allure Teddy Bear Matte Lipgloss delivers smooth, wearable colour with a soft matte finish.',
    images: [
      '/product%20images/Moc%20Allure%20Teddy%20Bear%20Matte%20Lipgloss1.webp',
      '/product%20images/Moc%20Allure%20Teddy%20Bear%20Matte%20Lipgloss3.webp',
      '/product%20images/Moc%20Allure%20Teddy%20Bear%20Matte%20Lipgloss2.webp'
    ]
  }),
  makeProduct({
    slug: 'huxia-beauty-shiny-glitter-lipgloss',
    name: 'HUXIA BEAUTY Shiny Glitter Lipgloss 6 Pcs Set',
    price: 1200,
    originalPrice: 1500,
    discountPercent: 20,
    category: 'Lips',
    categorySlug: 'lips',
    subcategory: 'Gloss',
    subcategorySlug: 'gloss',
    sku: 'HUXIA-SHINY-GLITTER-LIPGLOSS',
    shortDescription: 'A six-piece shiny glitter lipgloss set for sparkling glossy looks.',
    fullDescription: 'HUXIA BEAUTY Shiny Glitter Lipgloss 6 Pcs Set includes six sparkling shades for creating glossy, eye-catching lip looks.',
    images: [
      '/product%20images/HUXIA%20BEAUTY%20Shiny%20Glitter%20Lipgloss-02.webp',
      '/product%20images/HUXIA%20BEAUTY%20Shiny%20Glitter%20Lipgloss-03.webp',
      '/product%20images/HUXIA%20BEAUTY%20Shiny%20Glitter%20Lipgloss-01.webp'
    ]
  }),
  makeProduct({
    slug: 'dr-walton-coffee-face-wash',
    name: 'Dr Walton Coffee Face Wash',
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cleanser',
    subcategorySlug: 'cleanser',
    sku: 'DR-WALTON-COFFEE-FACE-WASH',
    shortDescription: 'A refreshing coffee face wash to cleanse and revitalise your skin.',
    fullDescription: 'Dr Walton Coffee Face Wash deeply cleanses the skin, removing impurities and excess oil while leaving a refreshed, glowing complexion.',
    images: [
      '/product%20images/Dr%20Walton%20Coffee%20Face%20Wash-01.webp',
      '/product%20images/Dr%20Walton%20Coffee%20Face%20Wash-03.webp',
      '/product%20images/Dr%20Walton%20Coffee%20Face%20Wash-02.webp'
    ]
  }),
  makeProduct({
    slug: 'dr-walton-arche-face-wash',
    name: 'Dr Walton Arche Face Wash',
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    category: 'Skincare',
    categorySlug: 'skincare',
    subcategory: 'Cleanser',
    subcategorySlug: 'cleanser',
    sku: 'DR-WALTON-ARCHE-FACE-WASH',
    shortDescription: 'A nourishing face wash with Arche extracts for smooth and bright skin.',
    fullDescription: 'Dr Walton Arche Face Wash gently cleanses the face, helping to soothe and nourish the skin for a smooth, healthy-looking texture.',
    images: [
      '/product%20images/Dr%20Walton%20Arche%20Face%20Wash-03.webp',
      '/product%20images/Dr%20Walton%20Arche%20Face%20Wash-02.webp',
      '/product%20images/Dr%20Walton%20Arche%20Face%20Wash-01.webp'
    ]
  })
]

const allowedProductSlugs = new Set([
  'masarrat-misbah-silk-foundation',
  'huda-beauty-the-matte-fixer-setting-spray-160ml',
  'huda-beauty-fauxfilter-luminous-matte-foundation',
  'dermacol-original-make-up-cover-foundation-shade-211',
  'emelie-paris-derma-make-up-cover-24h-matte',
  'emelie-paris-ultra-matte-bb-double-wear-spf15',
  'emelie-paris-vip-hi-silk-foundation',
  'emelie-paris-exemplary-24h-full-coverage-skin-perfector',
  'emelie-paris-master-chrome-professional-makeup-spf15',
  'emelie-paris-full-matte-waterproof-foundation',
  'emelie-paris-comfort-matte-foundation-spf50',
  'emelie-paris-professional-prestige-luminous-serum-foundation-spf15',
  'emelie-paris-professional-prestige-luminous-serum-foundation',
  'emelie-paris-bestskin-ever-outlast-foundation',
  'beauty-nakeed-bn-make-up-hydrating-primer-35ml',
  'sadoer-nourishing-coconut-oil-eye-mask',
  'sadoer-pure-natural-active-collagen-anti-aging-eye-mask',
  'sadoer-collagen-anti-aging-lip-mask',
  'emelie-deep-cleansing-nose-pore-strips-10-pcs',
  'woomin-zafrani-6-steps-facial-kit-sachet',
  'woomin-hydra-6-steps-facial-kit-sachet',
  'gluta-white-hydrating-skin-polish-vol-20',
  'zafrani-orange-yellow-cream-scrub-500g',
  'city-girl-multani-mitti-brightening-glowing-cream-bleach',
  'bob-fashion-color-nail-polish',
  'mode-love-matte-nail-polish',
  'assorted-nail-polish-glamour',
  'cosmee-lemon-fruit-care-nail-polish-remover-wipes',
  'bosuya-long-lasting-hairdressing-wand-black-01',
  'meow-club-10-min-painless-body-wax-powder-orange',
  'emelie-waxing-strips-rose',
  'emelie-waxing-strips-aloe-vera',
  'battery-operated-eyebrow-trimmer-shaver-ladies',
  'ice-roller',
  '5-piece-pink-mini-makeup-brush-set',
  'fashion-nail-press-on-fake-nails-rhinestone-acrylic-set',
  'pink-key-french-manicure-press-on-nails-12-pcs',
  'fashion-nail-silver-swirl-rhinestone-press-on-nails',
  'fashion-nail-pink-star-heart-gem-press-on-nails',
  'fashion-nail-teddy-bear-checkered-press-on-nails',
  'fashion-nail-pink-ombre-floral-star-rhinestone-nails',
  'fashion-nail-pink-plaid-gold-bow-rhinestone-nails',
  'fashion-nail-pink-star-rose-gem-press-on-nails',
  'fashion-nail-cute-cat-moon-gem-press-on-nails',
  'fashion-nail-pink-ombre-heart-pearl-press-on-nails',
  'pink-key-classic-french-tip-press-on-nails-12-pcs',
  'fashion-nail-purple-ombre-silver-charm-press-on-nails',
  'fashion-nail-floral-print-pink-butterfly-gem-press-on-nails',
  'dodo-lady-matte-dark-nude-almond-press-on-nails',
  'dodo-lady-matte-light-nude-almond-press-on-nails',
  'fashion-nail-burgundy-glitter-ombre-moon-gem-press-on-nails',
  'dodo-lady-matte-peach-nude-almond-press-on-nails',
  'dodo-lady-matte-chocolate-brown-almond-press-on-nails',
  'sadoer-whiten-hand-mask',
  'sadoer-coconut-extract-nourish-hand-mask',
  'sadoer-lemon-extract-hydrate-hand-mask',
  'sadoer-strawberry-extract-moisture-hand-mask',
  'sadoer-rejuvenating-coconut-oil-hand-mask',
  'fayankou-avocado-petroleum-jelly-hand-mask',
  'sadoer-strawberry-extract-moisture-soften-exfoliation-foot-mask',
  'sadoer-whiten-foot-mask',
  'sadoer-coconut-extract-nourish-foot-mask',
  'sadoer-softening-coconut-oil-foot-mask',
  'sadoer-lemon-extract-hydrate-foot-mask',
  'sadoer-peach-extract-lustrous-soften-exfoliation-foot-mask',
  'emelie-paris-4-colors-matte-eyebrow-powder',
  'romantic-flower-eyebrow-cake-powder',
  'sadoer-kojic-acid-mild-oil-control-cleanser-100g',
  'sadoer-tea-tree-acne-oil-control-facial-cleanser',
  'sadoer-himalayan-pink-salt-purifies-pores-cleanser',
  'sadoer-nicotinamide-arbutin-white-facial-cleanser',
  'mini-wipes-packet-8-pcs-pack',
  'dr-rashel-vitamin-c-brightening-anti-aging-face-serum',
  'dr-rashel-vitamin-c-brightening-anti-aging-night-cream',
  'skin-origins-bb-cream-advanced-skin-corrector',
  'yozo-vitamin-a-essence-anti-acne-facial-mask-packet',
  'yozo-vitamin-b5-soothing-sheet-mask',
  'yozo-vitamin-c-sheet-mask',
  'beauty-naked-easy-to-use-lip-pencil-12-pcs-set',
  'magic-your-life-hyaluronic-acid-nutrition-gel-mascara',
  'emelie-paris-ultra-hd-matte-velvet-skin-face-powder',
  'emelie-paris-city-of-lights-long-lasting-pressed-powder',
  'emelie-paris-super-stay-matte-compact-powder',
  'emelie-paris-oil-control-matte-face-powder',
  'emelie-paris-3-in-1-perfect-touch-compact-powder',
  'emelie-paris-24k-gold-dual-matte-finish-powder',
  'emelie-paris-new-matte-maker-finishing-powder',
  'iman-of-noble-omg-makeup-kit-palette',
  'golden-rose-waterproof-marker-eyeliner-3-pcs-set',
  'aslan-sky-high-ultra-lasting-eyeliner',
  'bob-kajal-magique',
  'rose-lady-contour-better-cheek-palette',
  '3-colors-baked-marble-blush-palette',
  'rose-lady-new-fashion-5-color-contour-shading-palette',
  'frs-eyebrow-eyeliner-pencil-2-in-1-with-brush-and-sharpener',
  'ks-one-thanks-for-the-love-lipgloss-set-12-pcs',
  'frs-matte-lipstick-pencil-set-12-pcs',
  'hudamoji-jelly-tint-4-pcs-set',
  'emelie-paris-liquid-lipstick-lipgloss-set',
  'emelie-paris-matte-lip-crayon-pencil-set',
  'moc-allure-teddy-bear-matte-lipgloss',
  'huxia-beauty-shiny-glitter-lipgloss',
  'dr-walton-coffee-face-wash',
  'dr-walton-arche-face-wash'
])

const allProducts = [...fallbackProducts, ...foundationProducts, ...settingSprayProducts, ...primerProducts, ...additionalProducts]
  .filter((product) => allowedProductSlugs.has(product.slug))

const normalizeCategorySlug = (value = '') =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-\/]/g, '')
    .replace(/\s*\/\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const createMenuCategories = (entries = []) => {
  const grouped = new Map()

  entries.forEach((entry) => {
    const value = String(entry || '').trim()
    if (!value) return

    const parts = value.includes(' - ') ? value.split(/\s*-\s*/) : [value, '']
    const categoryName = parts[0]?.trim()
    const subcategoryName = parts.length > 1 ? parts[1]?.trim() : ''

    if (!categoryName) return

    if (!grouped.has(categoryName)) {
      grouped.set(categoryName, {
        id: normalizeCategorySlug(categoryName),
        slug: normalizeCategorySlug(categoryName),
        name: categoryName,
        description: `${categoryName} collection`,
        image: null,
        products: [],
        subcategories: []
      })
    }

    if (subcategoryName) {
      const category = grouped.get(categoryName)
      const exists = category.subcategories.some((item) => item.name.toLowerCase() === subcategoryName.toLowerCase())
      if (!exists) {
        category.subcategories.push({
          slug: normalizeCategorySlug(subcategoryName),
          name: subcategoryName,
          image: null,
          contentTitle: `${subcategoryName} Collection`,
          content: `Discover our ${subcategoryName.toLowerCase()} collection, selected to help you create a smooth, polished look with products suited to your everyday routine.`,
          whyTitle: `Why Choose Our ${subcategoryName} Range?`,
          whyContent: `Explore our ${subcategoryName.toLowerCase()} range, selected for quality, comfort, and dependable results in your everyday routine.`,
          products: []
        })
      }
    }
  })

  return Array.from(grouped.values()).map((category) => ({
    ...category,
    subcategories: category.subcategories.sort((a, b) => a.name.localeCompare(b.name))
  }))
}

const customMenuCategories = createMenuCategories([
  'Face - Foundation',
  'Face - Setting Spray',
  'Face - Primer',
  'Face - Foundation',
  'Eyes - Brow/Liner',
  'Face - Foundation',
  'Cheeks - Blush',
  'Lips',
  'Face - Kit/Palette',
  'Eyes - Liner',
  'Lips - Set',
  'Lips - Set',
  'Eyes - Kajal',
  'Cheeks - Palette',
  'Cheeks - Palette',
  'Lips - Gloss',
  'Lips - Set',
  'Lips - Gloss',
  'Lips - Gloss',
  'Face - Foundation',
  'Lips - Gloss',
  'Cheeks - Palette',
  'Face - Foundation',
  'Lips/Eyes - Pencil',
  'Eyes - Mascara',
  'Face - Foundation',
  'Face - Powder',
  'Face - Foundation',
  'Face - Foundation',
  'Face - Powder',
  'Face - Foundation',
  'Face - Foundation',
  'Face - Foundation',
  'Face - Powder',
  'Face - Powder',
  'Face - Foundation',
  'Face - Powder',
  'Face - Foundation',
  'Lips - Set',
  'Eyes - Brow',
  'Face - Powder',
  'Face - Powder',
  'Face - Foundation',
  'Eyes - Brow',
  'Eyes - Liner',
  'Eyes - Mascara',
  'Skincare - Cleanser',
  'Skincare - Serum',
  'Skincare - Cleanser',
  'Skincare - Cleanser',
  'Skincare - Cleanser',
  'Skincare - Cleanser',
  'Skincare - Cream',
  'Face - BB Cream',
  'Skincare - Sheet Mask',
  'Skincare - Sheet Mask',
  'Skincare - Sheet Mask',
  'Skincare - Sheet Mask',
  'Skincare - Eye Mask',
  'Skincare - Eye Mask',
  'Skincare - Eye Mask',
  'Skincare - Lip Mask',
  'Skincare - Pore Strips',
  'Skincare - Facial Kit',
  'Skincare - Facial Kit',
  'Skincare - Skin Polish',
  'Skincare - Scrub',
  'Skincare - Bleach Cream',
  'Skincare - Bleach/Scrub',
  'Hand & Foot Care - Hand Mask',
  'Hand & Foot Care - Hand Mask',
  'Hand & Foot Care - Hand Mask',
  'Hand & Foot Care - Hand Mask',
  'Hand & Foot Care - Hand Mask',
  'Hand & Foot Care - Hand Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Foot Mask',
  'Hand & Foot Care - Hand Mask',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Press',
  'Nails - Polish',
  'Nails - Polish Set',
  'Nails - Polish Set',
  'Nails - Remover Wipes',
  'Hair - Color Wand',
  'Hair - Color Wand',
  'Hair - Color Wand',
  'Hair - Color Wand',
  'Hair Removal - Wax Powder',
  'Hair Removal - Wax Strips',
  'Hair Removal - Wax Strips',
  'Tools - Trimmer',
  'Tools - Ice Roller',
  'Tools - Brush Set',
  'Skincare - Cleanser',
  'Skincare - Cleanser'
])

const fallbackCategories = [
  ...customMenuCategories.map((category) => {
    return {
      ...category,
      products: allProducts.filter((product) => product.categorySlug === category.slug),
      subcategories: category.subcategories.map((subcategory) => ({
        ...subcategory,
        products: allProducts.filter((product) =>
          product.categorySlug === category.slug && product.subcategorySlug === subcategory.slug
        )
      }))
    }
  })
]

const visibleCategories = fallbackCategories.map((category) => ({
  ...category,
  products: category.products.filter((product) => allowedProductSlugs.has(product.slug)),
  subcategories: (category.subcategories || []).map((subcategory) => ({
    ...subcategory,
    products: subcategory.products.filter((product) => allowedProductSlugs.has(product.slug))
  }))
}))

export async function getProducts() {
  return allProducts
}

export async function getProductBySlug(slug) {
  return allProducts.find((product) => product.slug === slug) || null
}

export async function getProductSlugs() {
  return allProducts.map(({ slug }) => ({ slug }))
}

export async function getCategorySlugs() {
  return visibleCategories.map(({ slug }) => ({ slug }))
}

export async function getCategories() {
  return visibleCategories
}

export async function getCategoryBySlug(slug) {
  return visibleCategories.find((category) => category.slug === slug) || null
}

export async function getSubcategoryBySlug(categorySlug, subSlug) {
  const category = visibleCategories.find((item) => item.slug === categorySlug)
  const subcategory = category?.subcategories?.find((item) => item.slug === subSlug)
  if (!subcategory) return null
  return { ...subcategory, category: category.name, categorySlug: category.slug }
}

export async function getCollectionBySlug(slug) {
  for (const category of visibleCategories) {
    const subcategory = category.subcategories?.find((item) => item.slug === slug)
    if (subcategory) {
      return { ...subcategory, category: category.name, categorySlug: category.slug }
    }
  }
  return null
}

export async function getSubcategorySlugs() {
  return visibleCategories.flatMap((category) =>
    (category.subcategories || []).map((subcategory) => ({ category: category.slug, slug: subcategory.slug }))
  )
}

export async function getCollectionSlugs() {
  return visibleCategories.flatMap((category) =>
    (category.subcategories || []).map((subcategory) => ({ slug: subcategory.slug }))
  )
}

export async function getCollections() {
  return visibleCategories.flatMap((category) =>
    (category.subcategories || []).map((subcategory) => ({
      name: subcategory.name,
      slug: subcategory.slug,
      image: subcategory.products?.[0]?.images?.[0]?.url || null,
      hoverImage: subcategory.products?.[0]?.images?.[1]?.url || null,
      productCount: subcategory.products?.length || 0
    }))
  )
}

export function getImageUrl(image) {
  return getSanityImageUrl(image) || imagePaths[0]
}
