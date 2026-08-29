import dbConnect from '../../../lib/mongodb'
import Order from '../../../models/Order'
import { sendOrderNotifications } from '../../../lib/email'
import { sendWhatsAppNotification } from '../../../lib/whatsapp'

export default async function handler(req, res) {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { customerDetails, items, subtotal, shippingFee, total, paymentMethod, discount } = req.body

      if (!customerDetails || !items || !items.length || !subtotal || !total) {
        return res.status(400).json({ message: 'Missing order details' })
      }

      const order = await Order.create({
        customerDetails,
        items,
        subtotal,
        shippingFee: shippingFee || 150,
        discount: discount || 0,
        total,
        paymentMethod,
      })

      try {
        await sendOrderNotifications(order)
      } catch (err) {
        console.error('Failed to send order email alert:', err)
      }

      try {
        await sendWhatsAppNotification(order)
      } catch (err) {
        console.error('Failed to send WhatsApp alert:', err)
      }

      return res.status(201).json({
        message: 'Order created successfully',
        orderId: order._id,
        order,
      })
    }

    if (req.method === 'GET') {
      const { id } = req.query

      if (id) {
        const order = await Order.findById(id)
        if (!order) {
          return res.status(404).json({ message: 'Order not found' })
        }

        return res.status(200).json({ order })
      }

      const orders = await Order.find({}).sort({ createdAt: -1 })
      return res.status(200).json({ orders })
    }

    if (req.method === 'DELETE') {
      const { id, all } = req.query
      const isDeleteAll = all === 'true' || req.body?.deleteAll === true

      if (isDeleteAll) {
        const result = await Order.deleteMany({})
        return res.status(200).json({
          message: 'All orders deleted successfully',
          deletedCount: result.deletedCount,
        })
      }

      if (!id) {
        return res.status(400).json({ message: 'Order ID is required to delete' })
      }

      const deletedOrder = await Order.findByIdAndDelete(id)
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' })
      }

      return res.status(200).json({
        message: 'Order deleted successfully',
        orderId: deletedOrder._id,
      })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Orders API error:', error)
    return res.status(500).json({ message: error.message || 'Internal server error' })
  }
}
