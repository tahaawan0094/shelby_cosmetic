import nodemailer from 'nodemailer'

function getTransporter() {
  const host = (process.env.EMAIL_HOST || '').trim()
  const port = parseInt(process.env.EMAIL_PORT || '465')
  const user = (process.env.EMAIL_USER || '').trim()
  const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '')

  if (!user || !pass) {
    throw new Error(
      'Email SMTP credentials (EMAIL_USER, EMAIL_PASS) are missing or incomplete. Email notification skipped.'
    )
  }

  const isGmail = host.toLowerCase().includes('gmail') || user.toLowerCase().endsWith('@gmail.com')

  const transportConfig = isGmail
    ? {
        service: 'gmail',
        auth: { user, pass },
      }
    : {
        host: host || 'smtp.gmail.com',
        port: port || 465,
        secure: port === 465,
        auth: { user, pass },
      }

  return nodemailer.createTransport(transportConfig)
}

function buildOrderSummaryHtml(order) {
  const rawOrderId = order._id ? order._id.toString() : ''
  const shortId = rawOrderId ? `#ORD-${rawOrderId.slice(-8).toUpperCase()}` : ''
  const itemsList = (order.items || [])
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #eee;"><strong>${item.name}</strong>${item.variant?.name ? `<br><span style="color: #be315b; font-size: 12px;">Shade: ${item.variant.name} (${item.variant.value || 'color saved'})</span>` : ''}</td>
          <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border: 1px solid #eee; text-align: right;">Rs. ${item.price}</td>
          <td style="padding: 10px; border: 1px solid #eee; text-align: right; font-weight: bold;">Rs. ${item.price * item.quantity}</td>
        </tr>`
    )
    .join('')

  return `
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
            <td style="padding: 6px 0; color: #777;">Email:</td>
            <td style="padding: 6px 0; color: #111;">${order.customerDetails?.email || 'N/A'}</td>
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
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shelbycosmetic.com'}/admin/orders" style="background-color: #be315b; color: #ffffff; padding: 13px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; text-transform: uppercase; display: inline-block; letter-spacing: 0.5px;">
          Open Admin Dashboard
        </a>
      </div>
    </div>
  `
}

export async function sendOwnerContactEmail({ name, email, message }) {
  const user = (process.env.EMAIL_USER || '').trim()
  const to = (process.env.EMAIL_TO || user).trim()

  if (!user || !process.env.EMAIL_PASS) {
    throw new Error('Email SMTP credentials are missing or incomplete.')
  }

  if (!to) {
    throw new Error('EMAIL_TO is missing. Set the owner email in Vercel environment variables.')
  }

  const transporter = getTransporter()
  const safeName = String(name || '').trim()
  const safeEmail = String(email || '').trim()
  const plainMessage = String(message || '').trim()

  await transporter.sendMail({
    from: `Shelby Cosmetics <${user}>`,
    to,
    replyTo: safeEmail,
    subject: `New message from ${safeName}`,
    text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${plainMessage}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 12px; color: #be315b;">New contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 12px 16px; background: #f9fafb; border-left: 4px solid #be315b; white-space: pre-wrap;">${plainMessage}</div>
      </div>
    `,
  })
}

export async function sendOrderNotifications(order) {
  const user = (process.env.EMAIL_USER || '').trim()
  const ownerEmail = (process.env.EMAIL_TO || user).trim()
  const customerEmail = String(order?.customerDetails?.email || '').trim()

  if (!user || !process.env.EMAIL_PASS) {
    console.warn('Email SMTP credentials (EMAIL_USER, EMAIL_PASS) are missing or incomplete. Order emails skipped.')
    return
  }

  const transporter = getTransporter()
  const rawOrderId = order._id ? order._id.toString() : ''
  const shortId = rawOrderId ? `#ORD-${rawOrderId.slice(-8).toUpperCase()}` : ''
  const customerName = order.customerDetails?.name || 'Customer'

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; text-align: left; color: #333333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #be315b; margin: 0 0 6px 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Thank You for Your Order</h2>
        <p style="font-size: 14px; color: #666666; margin: 0;">Your order has been received successfully.</p>
      </div>
      <div style="background-color: #fbfbfb; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; font-size: 14px;">
        <p><strong>Order ID:</strong> ${shortId || rawOrderId || 'N/A'}</p>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail || 'N/A'}</p>
        <p><strong>Total:</strong> Rs. ${order.total}</p>
      </div>
      <p style="font-size: 14px; line-height: 1.7; color: #444;">We have received your order and will contact you shortly regarding confirmation and delivery details.</p>
      <p style="font-size: 14px; line-height: 1.7; color: #444;">Thank you for shopping with Shelby Cosmetics.</p>
      <div style="text-align: center; margin-top: 24px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shelbycosmetic.com'}" style="background-color: #be315b; color: #ffffff; padding: 12px 22px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Visit Shelby Cosmetics</a>
      </div>
    </div>
  `

  const ownerHtml = buildOrderSummaryHtml(order)

  const sendTasks = []

  if (customerEmail) {
    sendTasks.push(
      transporter.sendMail({
        from: `Shelby Cosmetics <${user}>`,
        to: customerEmail,
        subject: `Your Shelby Cosmetics order confirmation ${shortId}`,
        html: customerHtml,
      })
    )
  }

  if (ownerEmail) {
    sendTasks.push(
      transporter.sendMail({
        from: `Shelby Cosmetics <${user}>`,
        to: ownerEmail,
        subject: `??? New Order Received! - ${shortId} (Rs. ${order.total})`,
        html: ownerHtml,
      })
    )
  }

  try {
    const results = await Promise.allSettled(sendTasks)
    const failures = results.filter((result) => result.status === 'rejected')

    if (failures.length) {
      console.error('One or more order emails failed to send:', failures)
    } else {
      console.log('Order notifications sent successfully for:', {
        customerEmail,
        ownerEmail,
        orderId: rawOrderId,
      })
    }
  } catch (error) {
    console.error('Failed to send order notification batch:', error)
  }
}

export async function sendEmailNotification(order) {
  await sendOrderNotifications(order)
}
