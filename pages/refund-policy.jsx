import InfoPage from '../components/InfoPage'

export default function RefundPolicy() {
  return <InfoPage
    title="Refund Policy"
    intro="We want you to feel confident in every Shelby Cosmetics purchase. Here is how returns, replacements, and refunds work."
    sections={[
      { heading: '30-day returns', body: ['You may request a return within 30 days of delivery. Items must be unused, unopened, and in their original packaging. To begin, contact us with your order number and reason for return.'] },
      { heading: 'Refunds', body: ['Once an approved return is received and inspected, we will issue a refund to the original payment method. Shipping charges are non-refundable unless the item arrived damaged or incorrect.'] },
      { heading: 'Damaged or incorrect items', body: ['Please contact us within 7 days of delivery with clear photos of the item and packaging. We will arrange a replacement or full refund for confirmed issues.'] },
      { heading: 'Non-returnable items', body: ['For hygiene and safety, opened skincare products and gift cards cannot be returned unless they arrive damaged or defective.'] }
    ]}
  />
}
