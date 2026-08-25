import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  items: [
    {
      name: { type: String, required: true },
      slug: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, required: true, default: 300 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true, default: 'COD' },
  status: { type: String, required: true, default: 'Pending' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
