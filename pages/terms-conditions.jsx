import Head from 'next/head'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'

export default function TermsConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Shelby Cosmetics – Shopping Policies Explained</title>
        <meta 
          name="description" 
          content="Review Shelby Cosmetics' Terms & Conditions to understand our policies on orders, payments, shipping, returns, and website use before you shop with us." 
        />
      </Head>

      <div className="min-h-screen bg-[#fcfbf9] text-neutral-900">
        <Navbar solid />

        <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 lg:px-16 lg:pt-40">
          <header className="mb-12 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c62c52]">Legal & Policy</p>
            <h1 className="font-serif text-4xl md:text-6xl text-neutral-900">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-xs uppercase tracking-widest text-neutral-500">
              Last updated: August 19, 2026
            </p>
          </header>

          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-left">
            <div className="space-y-4 text-base md:text-lg border-b border-neutral-200 pb-8">
              <p>
                Welcome to Shelby Cosmetics. Before you start filling up that cart, we'd like you to know the ground rules we operate on. Nothing here is meant to trip you up — it's just the standard stuff that keeps things fair for everyone who shops with us. By using our website or placing an order, you're agreeing to these terms, so give them a quick read.
              </p>
              <p>
                If you don't agree with something, that's okay too. Just get in touch with us before you check out, and we'll sort it out.
              </p>
            </div>

            {/* Who Can Use Our Site */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Who Can Use Our Site</h2>
              <p>
                You need to be at least 18 years old, or have a parent or guardian's permission, to place an order with Shelby Cosmetics. We also expect you to provide accurate information when creating an account or checking out — fake names and made-up addresses just make the whole shipping process harder for everyone.
              </p>
            </section>

            {/* Products and Pricing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Products and Pricing</h2>
              <p>
                We do our best to display accurate product descriptions, images, and prices. That said, occasional errors happen — a color swatch might look slightly different on your screen than in person, or a price might get mistyped. If we catch a pricing error after you've placed an order, we'll reach out to you before charging anything, and you'll have the option to cancel if you're not happy with the correction.
              </p>
              <p>
                Prices are subject to change without notice, though we won't alter the price of an order you've already placed and paid for.
              </p>
            </section>

            {/* Orders and Payment */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Orders and Payment</h2>
              <p>
                Once you place an order, you'll receive a confirmation email. That confirms we've received your order — it doesn't necessarily mean the item is guaranteed to ship, especially in cases of unexpected stock issues. We reserve the right to cancel or refuse any order for reasons including suspected fraud, pricing errors, or product unavailability.
              </p>
              <p>
                We accept major credit cards, debit cards, and other payment methods listed at checkout. Your payment information is processed securely through trusted third-party providers — we don't store your full card details on our own servers.
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Shipping and Delivery</h2>
              <p>
                We ship to the addresses listed at checkout, and delivery times vary depending on your location and the shipping method you choose. While we work hard to get your order to you on time, delays can happen due to carrier issues, weather, or high demand during sales seasons. We're not responsible for delays caused by circumstances outside our control.
              </p>
              <p>
                Once your package leaves our warehouse, tracking details will be emailed to you so you can follow its journey.
              </p>
            </section>

            {/* Returns and Refunds */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Returns and Refunds</h2>
              <p>
                We want you to love what you buy, but if something isn't right, we've got a return process in place. Unused, unopened products in their original packaging can typically be returned within 30 days of delivery for a refund or exchange. Due to hygiene reasons, certain items — like opened skincare, lip products, or anything that's been used — may not be eligible for return.
              </p>
              <p>
                Refunds are issued to your original payment method once we've received and inspected the returned item. Shipping costs are generally non-refundable unless the return is due to our error, like sending the wrong product.
              </p>
            </section>

            {/* Website Use */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Website Use</h2>
              <p>
                You're welcome to browse, shop, and enjoy our content, but we ask that you don't misuse our site. That means no attempting to hack, disrupt, or overload our systems, no scraping our content without permission, and no using our platform for anything illegal or fraudulent.
              </p>
              <p>
                Any content on this site — product photos, descriptions, logos, graphics, and written material — belongs to Shelby Cosmetics or our licensed partners. You can't reproduce, distribute, or repurpose it without our written consent.
              </p>
            </section>

            {/* Product Use and Disclaimers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Product Use and Disclaimers</h2>
              <p>
                Our products are intended for external cosmetic use only, and results can vary from person to person. We always recommend doing a patch test before trying a new product, especially if you have sensitive skin or known allergies. Shelby Cosmetics isn't liable for allergic reactions or adverse effects resulting from misuse or failure to follow product instructions.
              </p>
              <p>
                None of our products are intended to diagnose, treat, cure, or prevent any medical condition. If you have specific skin concerns, it's always best to check with a dermatologist first.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Shelby Cosmetics isn't liable for any indirect, incidental, or consequential damages arising from your use of our website or products. We work hard to keep everything accurate and running smoothly, but we can't guarantee the site will be error-free or uninterrupted at all times.
              </p>
            </section>

            {/* Changes to These Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Changes to These Terms</h2>
              <p>
                We may update these Terms & Conditions from time to time, whether to reflect changes in our business practices or to comply with legal requirements. When we do, we'll post the revised version here with an updated date. Continuing to use our site after changes take effect means you accept the new terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Governing Law</h2>
              <p>
                These terms are governed by the laws of Pakistan, without regard to conflict of law principles. Any disputes arising from these terms will be handled in the courts located in Karachi, Pakistan.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4 pt-4 border-t border-neutral-200">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Contact Us</h2>
              <p>Questions about these terms? We're happy to clarify anything.</p>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-2">
                <p className="font-semibold text-neutral-900">Shelby Cosmetics</p>
                <p><strong className="text-neutral-900">Email:</strong> <a href="mailto:shelbycosmetics18@gmail.com" className="text-[#c62c52] hover:underline">shelbycosmetics18@gmail.com</a></p>
                <p><strong className="text-neutral-900">Address:</strong> Block 9 Clifton Karachi, Pakistan</p>
                <p><strong className="text-neutral-900">Phone:</strong> <a href="tel:03113041704" className="text-[#c62c52] hover:underline">03113041704</a></p>
              </div>
              <p className="italic text-neutral-600">
                Thanks for shopping with us — we built Shelby Cosmetics to be a brand you can trust, and that starts with being upfront about how we do business.
              </p>
            </section>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}
