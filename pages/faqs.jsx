import { useState } from 'react'
import InfoPage from '../components/InfoPage'

const questions = [
  {
    question: 'What is Shelby Cosmetics?',
    answer: 'Shelby Cosmetics is a beauty and skincare brand that creates honest, effective products for everyday use. The company focuses on quality ingredients and simple routines.'
  },
  {
    question: 'How do I place an order?',
    answer: 'Select the products you want, add them to your cart, and complete checkout with your shipping and payment details.'
  },
  {
    question: 'What are the delivery charges?',
    answer: 'Rs. 300 within Karachi city, and Rs. 350 for delivery all over Pakistan.'
  },
  {
    question: 'How long will it take to receive my order?',
    bullets: [
      'Major Cities (Karachi, Lahore, Islamabad): 2–3 business days.',
      'Rest of Pakistan: 3–5 business days.',
      'Note: Orders are processed within 24 hours of confirmation.'
    ]
  },
  {
    question: 'Can I change my order after it has been placed?',
    answer: 'Yes, order changes are possible if the request is made shortly after checkout. Contact customer support as soon as possible for assistance.'
  },
  {
    question: 'Will I receive confirmation after placing an order?',
    answer: 'Yes. A confirmation email is sent immediately after an order is completed.'
  },
  {
    question: 'What happens if a product I ordered is out of stock?',
    answer: 'If an item becomes unavailable after your order is placed, our team will contact you with alternative options or a refund for that item.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'Major Pakistan local accounts and other payment options listed at checkout are accepted.'
  },
  {
    question: 'How can I track my order?',
    answer: 'A tracking number is emailed once your order has shipped. This number can be used to follow the delivery progress.'
  },
  {
    question: 'What if my address is entered incorrectly?',
    answer: 'Contact support immediately after placing the order. Address corrections may be possible before the package ships.'
  },
  {
    question: 'What is the return window for products?',
    answer: 'Products can typically be returned within the timeframe listed on the Refund Policy page, provided they meet the return conditions.'
  },
  {
    question: 'Can opened products be returned?',
    answer: 'Opened or used cosmetics generally cannot be returned due to hygiene and safety standards, unless the item arrived damaged or defective.'
  },
  {
    question: 'Are shipping fees refundable?',
    answer: 'Original shipping fees are generally non-refundable unless the return results from an error made by Shelby Cosmetics.'
  },
  {
    question: 'Can I exchange a product instead of returning it?',
    answer: 'Exchanges may be arranged for a different shade or product of equal value. Mention this preference when submitting a return request.'
  },
  {
    question: 'Is it safe to shop at Shelby Cosmetic?',
    answer: 'Absolutely. We use secure servers and high-efficiency logistics to ensure your data and your parcels are handled with the utmost care.'
  },
  {
    question: 'Are your skincare products original?',
    answer: 'Yes, we only source authentic products from trusted distributors and are 100% genuine and safe for use.'
  }
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <InfoPage
      title="Frequently Asked Questions"
      eyebrow="Need to know"
      intro="This page answers the most common questions about shopping with Shelby Cosmetics. The answers are organized by topic to help you find information quickly."
      seoDescription="Answers to common questions about shopping with Shelby Cosmetics, including orders, delivery, payments, returns, and product authenticity."
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {questions.map((item, index) => (
          <div key={item.question} className="border border-rose-100 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-sm font-medium md:px-6"
            >
              <span>{index + 1}. {item.question}</span>
              <span className="text-xl font-light text-rose-600">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-sm leading-7 text-neutral-600 md:px-6">
                {item.answer && <p>{item.answer}</p>}
                {item.bullets && (
                  <ul className="list-disc space-y-1 pl-5">
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </InfoPage>
  )
}
