import nodemailer from 'nodemailer'

export async function sendEmailNotification(order) {
  const host = (process.env.EMAIL_HOST || '').trim()
  const port = parseInt(process.env.EMAIL_PORT || '465')
  const user = (process.env.EMAIL_USER || '').trim()
  // Remove any whitespace from the app password (e.g. "abcd efgh ijkl mnop" -> "abcdefghijklmnop")
  const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
  const to = (process.env.EMAIL_TO || user).trim()

  if (!user || !pass) {
    console.warn(
      'Email SMTP credentials (EMAIL_USER, EMAIL_PASS) are missing or incomplete. Email notification skipped.'
    )
    return
  }

  // Determine transport config (Service: 'gmail' works best on Vercel serverless)
  const isGmail = host.toLowerCase().includes('gmail') || user.toLowerCase().endsWith('@gmail.com')

  const transportConfig = isGmail
    ? {
        service: 'gmail',
        auth: {
          user,
          pass,
        },
      }
    : {
        host: host || 'smtp.gmail.com',
        port: port || 465,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      }

  const transporter = nodemailer.createTransport(transportConfig)

  const rawOrderId = order._id ? order._id.toString() : ''
  const shortId = rawOrderId ? `#ORD-${rawOrderId.slice(-8).toUpperCase()}` : ''

  const itemsList = (order.items || [])
    .map(
      (item) =>
        `<tr>
          <td style="padding: 10px; border: 1px solid #eee;"><strong>${item.name}</strong>${item.variant?.name ? `<br><span style="color: #be315b; font-size: 12px;">Shade: ${item.variant.name} (${item.variant.value || 'color saved'})</span>` : ''}</td>
          <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border: 1px solid #eee; text-align: right;">Rs. ${item.price}</td>
          <td style="padding: 10px; border: 1px solid #eee; text-align: right; font-weight: bold;">Rs. ${item.price * item.quantity}</td>
        </tr>`
    )
    .join('')

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; text-align: left; color: #333333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #be315b; margin: 0 0 6px 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">New Order Received!</h2>
        <p style="font-size: 14px; color: #666666; margin: 0;">A new order has been placed on <strong>Shelby Cosmetics</strong>.</p>
      </div>

      <div style="background-color: #fbfbfb; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #be315b; border-bottom: 1px solid #f0f0f0; padding-bottom: 6px;">Customer & Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; color: #777; width: 35%;">Order Reference:</td>
            <td style="padding: 6px 0; font-weight: bold; font-family: monospace; color: #111;">${shortId} (${rawOrderId})</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Customer Name:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #111;">${order.customerDetails?.name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Phone / WhatsApp:</td>
            <td style="padding: 6px 0; color: #111;">${order.customerDetails?.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Delivery Address:</td>
            <td style="padding: 6px 0; color: #111;">${order.customerDetails?.address || ''}, ${order.customerDetails?.city || ''}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #777;">Payment Method:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #111;">${order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : (order.paymentMethod || 'Online / Advance Payment')}</td>
          </tr>
        </table>
      </div>

      <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #333;">Ordered Products</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
        <thead>
          <tr style="background-color: #f7f7f7;">
            <th style="padding: 8px 10px; border: 1px solid #eee; text-align: left;">Product</th>
            <th style="padding: 8px 10px; border: 1px solid #eee; text-align: center;">Qty</th>
            <th style="padding: 8px 10px; border: 1px solid #eee; text-align: right;">Unit Price</th>
            <th style="padding: 8px 10px; border: 1px solid #eee; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>

      <div style="background-color: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #666;">Subtotal:</span>
          <span style="font-weight: bold;">Rs. ${order.subtotal}</span>
        </div>
        ${
          order.discount > 0
            ? `<div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: #15803d;">
                <span>5% Online Discount:</span>
                <span>- Rs. ${order.discount}</span>
              </div>`
            : ''
        }
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #666;">Shipping Fee:</span>
          <span>Rs. ${order.shippingFee}</span>
        </div>
        <div style="border-top: 1px solid #e5e5e5; padding-top: 8px; display: flex; justify-content: space-between; font-size: 15px; font-weight: bold; color: #111;">
          <span>Grand Total:</span>
          <span style="color: #be315b;">Rs. ${order.total}</span>
        </div>
      </div>

      <div style="text-align: center; margin-top: 28px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/orders" 
           style="background-color: #be315b; color: #ffffff; padding: 13px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; text-transform: uppercase; display: inline-block; letter-spacing: 0.5px;">
           Open Admin Dashboard
        </a>
      </div>
    </div>
  `

  try {
    const info = await transporter.sendMail({
      from: `Shelby Cosmetics <${user}>`,
      to,
      subject: `🛍️ New Order Received! - ${shortId} (Rs. ${order.total})`,
      html: htmlContent,
    })
    console.log('Email notification sent successfully:', info?.messageId)
  } catch (error) {
    console.error('Failed to send email notification:', error)
  }
}
