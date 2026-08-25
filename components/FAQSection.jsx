import { useState } from 'react'

const faqs = [
  {
    q: 'Do you deliver across Pakistan?',
    a: 'Yes — we deliver nationwide.'
  },
  {
    q: 'Are your products imported or local?',
    a: 'We stock imported beauty brands and selected local essentials.'
  },
  {
    q: 'Do you offer wholesale or bulk pricing?',
    a: 'Yes — we offer wholesale options for resellers.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept multiple payment methods.'
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'Returns are subject to policy.'
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you will receive tracking details.'
  }
]

// TODO: Add your typical delivery timeframe.
// TODO: Answer honestly and specifically about whether the products are imported or local.
// TODO: Confirm your wholesale policy, minimum order quantity, and how resellers should contact you.
// TODO: Add your actual payment options — e.g. Cash on Delivery, bank transfer, card payments.
// TODO: Add your actual return/exchange policy and timeframe.
// TODO: Add your order tracking process — SMS, WhatsApp, tracking link, etc.

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm text-rose-600 tracking-widest">FAQ's</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border rounded-md overflow-hidden">
              <button onClick={() => toggle(i)} className="w-full text-left px-6 py-4 flex items-center justify-between">
                <span className="text-sm font-medium">{f.q}</span>
                <span className="text-gray-400">{openIndex === i ? '−' : '+'}</span>
              </button>

              <div className={`${openIndex === i ? 'block' : 'hidden'} px-6 pb-4 text-sm text-gray-600`}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
