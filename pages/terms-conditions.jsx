import InfoPage from '../components/InfoPage'

export default function TermsConditions() {
  return <InfoPage
    title="Terms & Conditions"
    intro="These terms keep the Shelby Cosmetics shopping experience clear, fair, and reliable for everyone. By using this website, you agree to the terms below."
    sections={[
      { heading: 'Using our website', body: ['Please use this website lawfully and provide accurate information when placing an order. Product descriptions, availability, and pricing may change without notice.'] },
      { heading: 'Orders and payment', body: ['An order is confirmed after payment has been authorized and you receive an order confirmation. We may cancel or limit an order where an item is unavailable, a pricing error occurs, or fraud is suspected.'] },
      { heading: 'Product care', body: ['Skincare results vary by person. Follow the directions on the product packaging, patch-test new products, and stop use if irritation occurs. Our products are not a substitute for medical advice.'] },
      { heading: 'Intellectual property', body: ['All branding, photography, copy, and website content belong to Shelby Cosmetics or our licensors and may not be reused without written permission.'] }
    ]}
  />
}
