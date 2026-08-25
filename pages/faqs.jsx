import { useState } from 'react'
import InfoPage from '../components/InfoPage'

const questions = [
  ['How often should I use the serum?', 'For best results, apply the serum twice daily on clean, dry skin.'],
  ['Is it suitable for sensitive skin?', 'Our formula is gentle and tested on sensitive skin types. Patch-test before first use.'],
  ['How long until I see results?', 'Many users report visible improvements within 2-4 weeks of consistent use; individual results vary.'],
  ['Can I use it with other skincare products?', 'Yes. Apply lighter serums first, then moisturizer and SPF in the morning.'],
  ['What are the key ingredients?', 'The formula combines peptides, hyaluronic acid, and antioxidants to hydrate, firm, and brighten.'],
  ['Is Shelby Cosmetics cruelty-free?', 'Yes. Our products are cruelty-free and not tested on animals.']
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)

  return <InfoPage title="Frequently Asked Questions" eyebrow="Need to know" intro="Clear answers for a more confident skincare ritual.">
    <div className="mx-auto max-w-3xl space-y-3">
      {questions.map(([question, answer], index) => (
        <div key={question} className="border border-rose-100 bg-white">
          <button type="button" onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-sm font-medium md:px-6">
            <span>{question}</span><span className="text-xl font-light text-rose-600">{openIndex === index ? '-' : '+'}</span>
          </button>
          {openIndex === index && <p className="px-5 pb-5 text-sm leading-7 text-neutral-600 md:px-6">{answer}</p>}
        </div>
      ))}
    </div>
  </InfoPage>
}
