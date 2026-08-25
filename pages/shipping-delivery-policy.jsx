import InfoPage from '../components/InfoPage'

export default function ShippingDeliveryPolicy() {
  return <InfoPage
    title="Shipping & Delivery Policy"
    intro="From our studio to your skincare shelf, we pack every order with care. Find the delivery details for your Shelby Cosmetics purchase below."
    sections={[
      { heading: 'Processing time', body: ['Orders are usually prepared within 1-2 business days. Orders placed on weekends or holidays begin processing on the next business day. You will receive tracking details when your order ships.'] },
      { heading: 'Delivery times', body: ['Standard delivery typically arrives within 3-7 business days after dispatch. Delivery windows are estimates and may vary by location, carrier delays, or peak seasons.'] },
      { heading: 'Address changes', body: ['Please contact us as soon as possible if your shipping address is incorrect. We cannot guarantee changes after an order has entered processing.'] },
      { heading: 'Delivery issues', body: ['If your package is delayed, damaged, or marked delivered but cannot be found, contact us with your order number. We will work with the carrier to investigate and help resolve the issue.'] }
    ]}
  />
}
