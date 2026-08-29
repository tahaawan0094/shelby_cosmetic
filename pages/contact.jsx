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
      title="Contact Us"
      eyebrow="We are here for you"
      intro="Have a question about a formula, your order, or building a better routine? Send us a note and our team will get back to you as soon as possible."
    >
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-600">Customer care</p>
            <h2 className="mt-3 text-3xl">A thoughtful answer is only a note away.</h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-neutral-600">
            <p>Email: hello@shelbycosmetics.com</p>
            <p>Monday-Friday, 9:00 AM-6:00 PM</p>
            <p>We aim to reply within 1-2 business days.</p>
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
