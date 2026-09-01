import Head from 'next/head'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'

export default function ShippingDeliveryPolicy() {
  return (
    <>
      <Head>
        <title>Shipping & Delivery Policy | Shelby Cosmetics Order Info</title>
        <meta 
          name="description" 
          content="Find out how Shelby Cosmetics ships your order, including delivery times, shipping costs, tracking details, and what to do if something goes wrong." 
        />
      </Head>

      <div className="min-h-screen bg-[#fcfbf9] text-neutral-900">
        <Navbar solid />

        <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 lg:px-16 lg:pt-40">
          <header className="mb-12 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c62c52]">Orders & Delivery</p>
            <h1 className="font-serif text-4xl md:text-6xl text-neutral-900">
              Shipping & Delivery Policy
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-left">
            <div className="space-y-4 text-base md:text-lg border-b border-neutral-200 pb-8">
              <p>
                So you've placed your order — now what? This page walks you through everything that happens between checkout and your package landing on your doorstep. We've tried to make our shipping process as painless as possible, but here's the full picture so there are no surprises along the way.
              </p>
            </div>

            {/* Processing Time */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Processing Time</h2>
              <p>
                Once your order comes through, our team gets to work pulling, packing, and prepping it for shipment. Most orders are processed within 1-2 business days, not including weekends or holidays. During sales events or product launches, processing can take a little longer — we'll always let you know if there's an expected delay.
              </p>
              <p>
                You'll get a confirmation email the moment your order is placed, and a separate shipping notification once it's actually on its way.
              </p>
            </section>

            {/* Shipping Methods and Costs */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Shipping Methods and Costs</h2>
              <p>We offer a few different shipping options at checkout, so you can pick what works best for your timeline and budget:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-white p-5 rounded-xl border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 text-lg mb-1">All Over Pakistan Shipping</h3>
                  <p className="text-sm text-neutral-600">2-4 Working Days</p>
                  <p className="text-lg font-bold text-[#c62c52] mt-2">Rs. 350</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 text-lg mb-1">Karachi City Shipping</h3>
                  <p className="text-sm text-neutral-600">2 Working Days</p>
                  <p className="text-lg font-bold text-[#c62c52] mt-2">Rs. 300</p>
                </div>
              </div>
              <p>
                Exact costs and delivery windows are calculated at checkout based on your location and the size of your order, so what you see there is the final word.
              </p>
            </section>

            {/* Delivery Times */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Delivery Times</h2>
              <p>
                Delivery estimates start counting from the day your order ships, not the day you place it. Keep in mind these are estimates, not guarantees — carriers can run into delays we simply don't control, especially around holidays or severe weather.
              </p>
              <p>
                Domestic orders typically arrive within 2-4 working days. If you've selected international shipping, delivery can take longer depending on customs processing in your country.
              </p>
            </section>

            {/* Order Tracking */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Order Tracking</h2>
              <p>
                Once your order ships, you'll receive a tracking number by email so you can follow its progress in real time. If a few hours pass and tracking isn't updating, don't worry — it can take a little time for carriers to scan packages into their system after pickup.
              </p>
              <p>
                Lost your tracking email? Check your spam folder first, then reach out to us and we'll resend it.
              </p>
            </section>

            {/* Shipping Delays */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Shipping Delays</h2>
              <p>
                We know waiting on a package you're excited about is no fun, especially when it's running behind. While we do everything on our end to ship orders promptly, delays can happen because of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Severe weather or natural events</li>
                <li>Carrier service disruptions</li>
                <li>High order volume during sales or holidays</li>
                <li>Incorrect or incomplete shipping addresses</li>
              </ul>
              <p>
                If your order is taking noticeably longer than the estimated delivery window, reach out to us and we'll track it down.
              </p>
            </section>

            {/* Incorrect Shipping Addresses */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Incorrect Shipping Addresses</h2>
              <p>
                Double-checking your shipping address before hitting "place order" saves everyone a headache. If you notice an error right after checkout, email us immediately at <a href="mailto:shelbycosmetics18@gmail.com" className="text-[#c62c52] underline">shelbycosmetics18@gmail.com</a> — we may be able to correct it before the order ships. Once a package is out the door, we're not able to redirect it, and we can't be held responsible for orders delivered to an address entered incorrectly at checkout.
              </p>
            </section>

            {/* Lost or Stolen Packages */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Lost or Stolen Packages</h2>
              <p>
                If tracking shows your package as delivered but you can't find it, first check around your property, with neighbors, or with anyone else who might have accepted it on your behalf. If it's genuinely missing after 24-48 hours, contact us and we'll help sort out next steps with the carrier.
              </p>
              <p>
                For packages that are confirmed lost in transit (not marked as delivered), we'll work with you on a replacement or refund once the carrier's investigation is complete.
              </p>
            </section>

            {/* Damaged Packages */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Damaged Packages</h2>
              <p>
                If your order arrives visibly damaged, don't toss the packaging — take a few photos and email us at <a href="mailto:shelbycosmetic18@gmail.com" className="text-[#c62c52] underline">shelbycosmetic18@gmail.com</a> within 2 days of delivery. We'll get a replacement or refund moving quickly once we've reviewed the details.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Changes to This Policy</h2>
              <p>
                We may update this Shipping & Delivery Policy from time to time as our shipping partners, rates, or processes change. Any updates will be posted here with a new date, so it's worth a glance if you haven't ordered with us in a while.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4 pt-4 border-t border-neutral-200">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Contact Us</h2>
              <p>Questions about your shipment, or an order that's not behaving the way it should? We're here to help sort it out.</p>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-2">
                <p className="font-semibold text-neutral-900">Shelby Cosmetics</p>
                <p><strong className="text-neutral-900">Email:</strong> <a href="mailto:shelbycosmetics18@gmail.com" className="text-[#c62c52] hover:underline">shelbycosmetics18@gmail.com</a></p>
                <p><strong className="text-neutral-900">Address:</strong> Block 9 Clifton Karachi, Pakistan</p>
                <p><strong className="text-neutral-900">Phone:</strong> <a href="tel:03113041704" className="text-[#c62c52] hover:underline">03113041704</a></p>
              </div>
              <p className="italic text-neutral-600">
                We know getting your order right matters just as much as what's inside the box — that's why we keep this process as transparent as we can.
              </p>
            </section>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}
