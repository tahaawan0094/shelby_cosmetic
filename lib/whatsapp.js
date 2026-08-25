export async function sendWhatsAppNotification(order) {
  const token = process.env.WHATSAPP_TOKEN
  const instanceId = process.env.WHATSAPP_INSTANCE_ID
  const ownerPhone = process.env.WHATSAPP_OWNER_PHONE

  if (!token || !instanceId || !ownerPhone) {
    console.warn('WhatsApp configuration variables (WHATSAPP_TOKEN, WHATSAPP_INSTANCE_ID, WHATSAPP_OWNER_PHONE) are missing. Notification skipped.')
    return
  }

  // Format phone number to standard international format (e.g. 923001234567)
  let formattedPhone = ownerPhone.replace(/[^0-9]/g, '')
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '92' + formattedPhone.substring(1)
  }

  const rawOrderId = order._id ? order._id.toString() : ''
  const shortId = rawOrderId ? `#ORD-${rawOrderId.slice(-8).toUpperCase()}` : ''

  const itemsList = (order.items || [])
    .map((item) => `• ${item.name} (Qty: ${item.quantity})`)
    .join('\n')

  const message = `🛍️ *Naya Order Aaya Hai!* 🛍️

*Order ID:* ${shortId} (${rawOrderId})
*Client:* ${order.customerDetails?.name || 'N/A'}
*Phone:* ${order.customerDetails?.phone || 'N/A'}
*Address:* ${order.customerDetails?.address || 'N/A'}, ${order.customerDetails?.city || ''}

*Products:*
${itemsList}

*Grand Total:* Rs. ${order.total}
*Payment Method:* ${order.paymentMethod || 'COD'}

Admin Portal: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/orders
`

  try {
    const res = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        to: formattedPhone,
        body: message,
      }),
    })
    const data = await res.json()
    console.log('WhatsApp notification attempt:', data)
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error)
  }
}
