import { useState } from 'react'
import InfoPage from '../components/InfoPage'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitState.message) {
      setSubmitState({ type: '', message: '' })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitState({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      setSubmitState({
        type: 'success',
        message: 'Your message has been sent successfully. We will contact you soon.',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <InfoPage
      title="Get In Touch!"
      eyebrow="Contact Us"
      intro="We'd love to hear from you - please use the form to send us your message or ideas. Or simply pop in for a cup of fresh tea and a cookie:"
      seoTitle="Contact Us | Shelby Cosmetics – We're Here to Help"
      seoDescription="Get in touch with Shelby Cosmetics for order support, product questions, or feedback. Reach our team by email, phone, or the contact form below."
    >
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <div className="space-y-4 text-sm leading-7 text-neutral-600">
            <p>
              <a href="tel:+923113041704" className="hover:text-rose-600">+92 3113041704</a>
            </p>
            <p>
              <a href="mailto:shelbycosmetic18@gmail.com" className="hover:text-rose-600">
                shelbycosmetic18@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl">Order Tracking</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              <a href="mailto:shelbycosmetic18@gmail.com" className="hover:text-rose-600">
                shelbycosmetic18@gmail.com
              </a>
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Serving customers nationwide from our distribution center in Block 9 Clifton Karachi, Pakistan.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl">Why Reach Out to Us?</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-600">
              <li>
                <strong className="text-neutral-900">Quick Response:</strong> We typically reply to all inquiries within 24 hours.
              </li>
              <li>
                <strong className="text-neutral-900">Expert Advice:</strong> Not sure which skincare product is right for you? Ask our experts!
              </li>
              <li>
                <strong className="text-neutral-900">Order Support:</strong> Real-time updates on your shipping and delivery status.
              </li>
            </ol>
          </div>
        </div>

        <form className="space-y-5 border border-rose-100 bg-white p-6 md:p-8" onSubmit={handleSubmit}>
          <label className="block text-xs uppercase tracking-[0.16em] text-neutral-600">
            Your name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              type="text"
              className="mt-2 w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-rose-500"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.16em] text-neutral-600">
            Email address
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              className="mt-2 w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-rose-500"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.16em] text-neutral-600">
            How can we help?
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="mt-2 w-full resize-none border-b border-neutral-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-rose-500"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>

          {submitState.message && (
            <p className={submitState.type === 'success' ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
              {submitState.message}
            </p>
          )}
        </form>
      </div>
    </InfoPage>
  )
}
