import dbConnect from '../../../lib/mongodb'
import Order from '../../../models/Order'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await dbConnect()

    const { orderId, status } = req.body

    if (!orderId || !status) {
      return res.status(400).json({ message: 'OrderId and status are required' })
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    return res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    })
  } catch (error) {
    console.error('Update status error:', error)
    return res.status(500).json({ message: 'Failed to update order status' })
  }
}
