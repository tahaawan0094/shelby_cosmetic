import { useRef } from 'react'

export default function PrintLabel({ order, isOpen, onClose }) {
  const printRef = useRef()

  if (!isOpen || !order) return null

  const shortId = `ORD-${order._id.slice(-8).toUpperCase()}`
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-PK')
  const shippingFee = Number(order.shippingFee || 0)
  const codAdvancePaid = order.paymentMethod === 'COD' ? shippingFee : 0
  const remainingAmount = order.paymentMethod === 'COD'
    ? Math.max(0, Number(order.total || 0) - codAdvancePaid)
    : Number(order.total || 0)
  const totalLabelText = order.paymentMethod === 'COD' ? 'Remaining Amount' : 'TOTAL AMOUNT'
  const paymentSummaryText = order.paymentMethod === 'COD'
    ? `COD Advance Paid: Rs. ${shippingFee}`
    : 'Full Payment Advance'

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800')
    printWindow.document.write(`
      <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 0;
            margin: 0;
          }
          .label-container {
            width: 8.5in;
            height: 11in;
            padding: 0.4in;
            margin: 0;
            background: white;
            display: flex;
            flex-direction: column;
            border: 1px solid #000;
          }
          .logo-section {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 0.3in;
            margin-bottom: 0.3in;
          }
          .logo-section img {
            height: 0.8in;
            margin-bottom: 0.1in;
          }
          .logo-text {
            font-size: 18px;
            font-weight: 900;
            letter-spacing: 2px;
            color: #000;
          }
          .shipping-label-text {
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #666;
            margin-top: 0.05in;
          }
          .order-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.2in;
            margin-bottom: 0.25in;
            font-size: 11px;
          }
          .order-info-item label {
            font-size: 9px;
            font-weight: 700;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 0.05in;
          }
          .order-info-item .value {
            font-size: 13px;
            font-weight: 900;
            color: #000;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
          }
          .ship-to-section {
            margin-bottom: 0.25in;
          }
          .section-label {
            font-size: 9px;
            font-weight: 700;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.08in;
            display: block;
          }
          .ship-to-box {
            border: 2px solid #000;
            padding: 0.2in;
            background: #f9f9f9;
            line-height: 1.4;
          }
          .customer-name {
            font-size: 14px;
            font-weight: 900;
            color: #000;
            margin-bottom: 0.05in;
          }
          .customer-phone {
            font-size: 11px;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.05in;
          }
          .customer-address {
            font-size: 10px;
            font-weight: 500;
            color: #333;
            margin: 0.05in 0;
          }
          .customer-city {
            font-size: 11px;
            font-weight: 600;
            color: #333;
            margin-top: 0.05in;
          }
          .items-section {
            margin-bottom: 0.2in;
            flex: 1;
          }
          .items-list {
            border: 1px solid #ddd;
            font-size: 10px;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            padding: 0.08in;
            border-bottom: 1px solid #ddd;
          }
          .item-row:last-child {
            border-bottom: none;
          }
          .item-name {
            font-weight: 600;
            flex: 1;
            word-break: break-word;
          }
          .item-qty {
            font-weight: 700;
            margin-left: 0.1in;
            min-width: 0.5in;
            text-align: right;
          }
          .total-section {
            border-top: 2px solid #000;
            padding-top: 0.1in;
            padding-bottom: 0.1in;
            margin-bottom: 0.1in;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.05in;
            font-size: 10px;
          }
          .total-label {
            font-weight: 600;
            color: #555;
          }
          .total-amount {
            font-size: 18px;
            font-weight: 900;
            color: #000;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
          }
          .payment-summary {
            font-size: 9px;
            font-weight: 700;
            color: #444;
            margin-top: 0.08in;
            line-height: 1.5;
          }
          .payment-method {
            font-size: 9px;
            font-weight: 500;
            color: #666;
            margin-top: 0.05in;
          }
          .return-address {
            border: 1px solid #000;
            padding: 0.12in;
            margin-top: 0.15in;
            background: #fafafa;
            line-height: 1.5;
          }
          .return-address-title {
            font-size: 8px;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #666;
            margin-bottom: 0.04in;
          }
          .return-address-text {
            font-size: 10px;
            font-weight: 700;
            color: #000;
          }
          .footer-section {
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 0.1in;
            font-size: 8px;
            color: #666;
            line-height: 1.3;
          }
        </style>
      </head>
      <body>
        <div class="label-container">
          <!-- Logo Section -->
          <div class="logo-section">
            <img src="/logo/shelbycosmetic-logo.png" alt="Shelby Cosmetics" />
            <div class="logo-text">SHELBY COSMETICS</div>
            <div class="shipping-label-text">SHIPPING LABEL</div>
          </div>

          <!-- Order Info -->
          <div class="order-info">
            <div class="order-info-item">
              <label>Order Number</label>
              <div class="value">${shortId}</div>
            </div>
            <div class="order-info-item">
              <label>Order Date</label>
              <div class="value" style="font-family: Arial; font-size: 12px;">${orderDate}</div>
            </div>
          </div>

          <!-- Ship To -->
          <div class="ship-to-section">
            <span class="section-label">SHIP TO:</span>
            <div class="ship-to-box">
              <div class="customer-name">${order.customerDetails.name}</div>
              <div class="customer-phone">${order.customerDetails.phone}</div>
              <div class="customer-address">${order.customerDetails.address}</div>
              <div class="customer-city">${order.customerDetails.city}, Pakistan</div>
            </div>
          </div>

          <!-- Items -->
          <div class="items-section">
            <span class="section-label">Items to Ship (${order.items.length}):</span>
            <div class="items-list">
              ${order.items
                .map(
                  (item) => `
                <div class="item-row">
                  <div style="flex: 1;">
                    <div class="item-name">${item.name}</div>
                    ${
                      item.variant?.name
                        ? `<div style="font-size: 9px; color: #c91f5b; margin-top: 0.02in;">Shade: ${item.variant.name}</div>`
                        : ''
                    }
                  </div>
                  <div class="item-qty">Qty: ${item.quantity}</div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Total -->
          <div class="total-section">
            <div class="total-row">
              <span class="total-label">${totalLabelText}:</span>
              <span class="total-amount">Rs. ${remainingAmount}</span>
            </div>
            <div class="payment-summary">
              ${order.paymentMethod === 'COD'
                ? `COD Advance Paid: Rs. ${shippingFee}<br/>Remaining Amount: Rs. ${remainingAmount}`
                : `Full Payment Advance: Rs. ${order.total}`}
            </div>
            <div class="payment-method">
              Payment Method: ${order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
            </div>
          </div>

          <div class="return-address">
            <div class="return-address-title">Return Address</div>
            <div class="return-address-text">Agra Taj Colony Taj Masjid Road Street G 10<br/>Shelby Cosmetic WareHouse</div>
          </div>

          <!-- Footer -->
          <div class="footer-section">
            <div>For any queries, contact: +92 XXX XXXXX</div>
            <div style="margin-top: 0.05in; font-weight: 600;">Thank you for your order!</div>
          </div>
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
            <div>
              <h2 className="text-lg font-bold text-white">Shipping Label Preview</h2>
              <p className="text-xs text-slate-300 mt-0.5">Order {shortId}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-slate-700/50 rounded-lg p-2 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Print Preview - A4 Sized */}
            <div
              ref={printRef}
              className="bg-white border-2 border-slate-400 rounded-lg overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '850px',
                aspectRatio: '8.5/11',
                padding: '24px',
                boxSizing: 'border-box',
                margin: '0 auto',
              }}
            >
              {/* Logo and Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4 mb-4">
                <img
                  src="/logo/shelbycosmetic-logo.png"
                  alt="Shelby Cosmetics"
                  className="h-16 mx-auto mb-2"
                />
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  SHELBY COSMETICS
                </h1>
                <p className="text-xs text-slate-600 font-semibold tracking-widest mt-1">
                  SHIPPING LABEL
                </p>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Order Number
                  </p>
                  <p className="text-xl font-black text-slate-900 font-mono tracking-wider">
                    {shortId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Order Date
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{orderDate}</p>
                </div>
              </div>

              {/* Ship To Section */}
              <div className="mb-6">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                  SHIP TO:
                </p>
                <div className="border-2 border-slate-900 p-4 rounded bg-slate-50">
                  <p className="text-lg font-black text-slate-900 leading-tight">
                    {order.customerDetails.name}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {order.customerDetails.phone}
                  </p>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed font-medium">
                    {order.customerDetails.address}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {order.customerDetails.city}, Pakistan
                  </p>
                </div>
              </div>

              {/* Items Section */}
              <div className="mb-6">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                  Items to Ship ({order.items.length}):
                </p>
                <div className="border border-slate-300 rounded text-xs">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 flex justify-between items-center ${
                        idx !== order.items.length - 1 ? 'border-b border-slate-300' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        {item.variant?.name && (
                          <p className="text-slate-600 text-xs mt-0.5">
                            Shade: {item.variant.name}
                          </p>
                        )}
                      </div>
                      <p className="font-bold text-slate-900 ml-4 whitespace-nowrap">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Section */}
              <div className="border-t-2 border-slate-900 pt-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold text-slate-700">{totalLabelText}:</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    Rs. {remainingAmount}
                  </span>
                </div>
                <div className="mb-2 space-y-1 text-[11px] text-slate-700 font-semibold">
                  {order.paymentMethod === 'COD' ? (
                    <>
                      <p>COD Advance Paid: Rs. {shippingFee}</p>
                      <p>Remaining Amount: Rs. {remainingAmount}</p>
                    </>
                  ) : (
                    <p>Full Payment Advance: Rs. {order.total}</p>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-semibold">
                  Payment Method: {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
                </p>
              </div>

              <div className="mt-6 border border-slate-900 bg-slate-50 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-600 mb-2">Return Address</p>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  Agra Taj Colony Taj Masjid Road Street G 10<br />
                  Shelby Cosmetic WareHouse
                </p>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-slate-600 mt-6 pt-4 border-t border-slate-300">
                <p className="font-semibold">For any queries, contact: +92 311 3041704</p>
                <p className="mt-1 font-medium">Thank you for your order!</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H9a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2m-6 4h6"
                  />
                </svg>
                Print Label
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
