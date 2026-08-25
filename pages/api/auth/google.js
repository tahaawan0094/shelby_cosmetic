import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await dbConnect()

    const { email, name, picture, googleId } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Google Email is required' })
    }

    const cleanEmail = email.toLowerCase().trim()
    const cleanName = name || cleanEmail.split('@')[0]

    let user = await User.findOne({ email: cleanEmail })

    if (user) {
      // Update existing user with latest Google info
      if (googleId) user.googleId = googleId
      if (picture) user.picture = picture
      if (!user.name && cleanName) user.name = cleanName
      await user.save()
    } else {
      // Create new Google User
      user = await User.create({
        name: cleanName,
        email: cleanEmail,
        googleId: googleId || '',
        picture: picture || '',
        cart: [],
        wishlist: [],
      })
    }

    return res.status(200).json({
      message: 'Google authentication successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture || '',
        googleId: user.googleId || '',
        cart: user.cart || [],
        wishlist: user.wishlist || [],
      },
    })
  } catch (error) {
    console.error('Google auth error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
