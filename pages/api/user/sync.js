import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await dbConnect()

    const { email, cart, wishlist } = req.body

    if (!email) {
      return res.status(400).json({ message: 'User email is required for sync' })
    }

    const cleanEmail = email.toLowerCase().trim()
    const updateData = {}
    if (cart !== undefined) updateData.cart = cart
    if (wishlist !== undefined) updateData.wishlist = wishlist

    const user = await User.findOneAndUpdate(
      { email: cleanEmail },
      { $set: updateData },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({
      message: 'User cart & wishlist synced successfully',
      cart: user.cart,
      wishlist: user.wishlist,
    })
  } catch (error) {
    console.error('User data sync error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
