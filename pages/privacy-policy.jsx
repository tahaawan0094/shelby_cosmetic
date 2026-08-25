import InfoPage from '../components/InfoPage'

export default function PrivacyPolicy() {
  return <InfoPage
    title="Privacy Policy"
    intro="Your privacy matters to us. This policy explains how Shelby Cosmetics collects, uses, and protects your information when you visit our website or shop with us."
    sections={[
      { heading: 'Information we collect', body: ['We may collect your name, email address, phone number, shipping details, and payment information when you place an order or contact us. We also collect limited usage information, such as pages visited and device type, to improve the shopping experience.'] },
      { heading: 'How we use information', body: ['We use your information to process orders, provide customer support, send service updates, and improve our products and website. Marketing messages are sent only where permitted, and you can unsubscribe at any time.'] },
      { heading: 'Sharing and security', body: ['We share information only with trusted service providers needed to operate our store, such as payment, delivery, and email providers. We use reasonable safeguards to protect your information and never sell personal data.'] },
      { heading: 'Your choices', body: ['You may ask us to access, correct, or delete your personal information by contacting our support team. We may retain limited transaction records where required by law.'] }
    ]}
  />
}
