import { sendOwnerContactEmail } from '../../lib/email'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill out your name, email, and message.' })
  }

  const cleanName = String(name).trim()
  const cleanEmail = String(email).trim()
  const cleanMessage = String(message).trim()

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ message: 'Please fill out your name, email, and message.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  try {
    await sendOwnerContactEmail({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    })

    return res.status(200).json({ message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Failed to send contact email:', error)
    return res.status(500).json({
      message: error.message || 'Something went wrong while sending your message. Please try again.',
    })
  }
}
