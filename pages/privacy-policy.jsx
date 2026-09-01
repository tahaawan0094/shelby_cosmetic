import Head from 'next/head'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Shelby Cosmetics – How We Protect Your Data</title>
        <meta 
          name="description" 
          content="Read Shelby Cosmetics' Privacy Policy to learn how we collect, use, and protect your personal information when you shop, browse, or connect with us online." 
        />
      </Head>

      <div className="min-h-screen bg-[#fcfbf9] text-neutral-900">
        <Navbar solid />

        <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 lg:px-16 lg:pt-40">
          <header className="mb-12 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c62c52]">Legal & Trust</p>
            <h1 className="font-serif text-4xl md:text-6xl text-neutral-900">
              Privacy Policy
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-left">
            <div className="space-y-4 text-base md:text-lg border-b border-neutral-200 pb-8">
              <p>
                At Shelby Cosmetics, we know trust isn't something you hand over lightly — especially when it comes to your personal information. You share your details with us because you want great skincare and beauty products delivered to your door, not because you want to worry about where that data ends up. This page explains, in plain language, what we collect, why we collect it, and what you can do about it.
              </p>
              <p>
                We've tried to keep the legal jargon to a minimum. If something here doesn't make sense, reach out to us. We'd rather explain it than hide behind fine print.
              </p>
            </div>

            {/* What Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">What Information We Collect</h2>
              <p>When you visit our website, create an account, or place an order, we gather a few different types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-neutral-900">Contact details</strong> — your name, email address, phone number, and shipping/billing address</li>
                <li><strong className="text-neutral-900">Payment information</strong> — processed securely through our payment partners; we don't store your full card details on our servers</li>
                <li><strong className="text-neutral-900">Order history</strong> — what you've bought, when, and how often</li>
                <li><strong className="text-neutral-900">Account preferences</strong> — your saved wish lists, product reviews, and skin type quiz results (if you've taken one)</li>
                <li><strong className="text-neutral-900">Technical data</strong> — your IP address, browser type, and device information, collected automatically when you browse our site</li>
                <li><strong className="text-neutral-900">Marketing preferences</strong> — whether you've opted in to receive emails, texts, or promotional offers from us</li>
              </ul>
              <p>
                We don't collect anything we don't need. If a piece of information doesn't help us serve you better or run our business responsibly, we're not interested in it.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">How We Use Your Information</h2>
              <p>Here's the honest breakdown of what happens once we have your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-neutral-900">To fulfill your orders:</strong> We need your address to ship products and your payment details to process transactions. That's non-negotiable — without it, we can't get your lip gloss to your doorstep.</li>
                <li><strong className="text-neutral-900">To improve your experience:</strong> Your browsing habits and past purchases help us recommend products you might actually like, instead of bombarding you with irrelevant suggestions.</li>
                <li><strong className="text-neutral-900">To communicate with you:</strong> Order confirmations, shipping updates, and — if you've opted in — occasional promotions or product launches. You can unsubscribe from marketing emails anytime; the link's always at the bottom.</li>
                <li><strong className="text-neutral-900">To keep our site secure:</strong> Technical data helps us spot suspicious activity, prevent fraud, and keep the whole platform running smoothly.</li>
                <li><strong className="text-neutral-900">To meet legal obligations:</strong> Sometimes we're required to retain certain records for tax, accounting, or regulatory purposes. We follow the law here, same as any responsible business would.</li>
              </ul>
            </section>

            {/* Who We Share Your Data With */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Who We Share Your Data With</h2>
              <p>
                We're not in the business of selling your information. Full stop. That said, we do work with a handful of trusted third parties who help us run Shelby Cosmetics day to day:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors who handle your transactions securely</li>
                <li>Shipping and logistics partners who get your order to you</li>
                <li>Email and marketing platforms that send our newsletters and promotions</li>
                <li>Analytics providers who help us understand how people use our site</li>
              </ul>
              <p>
                Each of these partners is contractually required to handle your data responsibly and only use it for the purpose we've agreed on. We vet them, and we don't hand out access carelessly.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Cookies and Tracking</h2>
              <p>
                Like most e-commerce sites, we use cookies to remember your cart, keep you logged in, and understand how visitors move through our site. You can adjust your cookie preferences through your browser settings at any time, though disabling certain cookies might affect how well the site functions.
              </p>
            </section>

            {/* Your Rights and Choices */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Your Rights and Choices</h2>
              <p>
                You have real control over your data, not just theoretical rights buried in a policy nobody reads. Depending on where you live, you may be able to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request a copy of the personal information we hold about you</li>
                <li>Ask us to correct inaccurate details</li>
                <li>Request deletion of your data (with some exceptions, like records we're legally required to keep)</li>
                <li>Opt out of marketing communications</li>
                <li>Object to certain types of data processing</li>
              </ul>
              <p>
                To exercise any of these rights, just email us at <a href="mailto:shelbycosmetics18@gmail.com" className="text-[#c62c52] underline">shelbycosmetics18@gmail.com</a> — we'll respond within a reasonable timeframe and walk you through the process.
              </p>
            </section>

            {/* How We Protect Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">How We Protect Your Information</h2>
              <p>
                We use industry-standard security measures — encryption, secure servers, restricted access controls — to keep your information safe. No system is completely bulletproof, and we won't pretend otherwise, but we take security seriously and continuously review our practices to stay ahead of new risks.
              </p>
            </section>

            {/* Data Retention */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Data Retention</h2>
              <p>
                We keep your information only as long as we need it — to fulfill orders, meet legal requirements, or maintain your account if it's active. Once that need passes, we either delete or anonymize the data.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Changes to This Policy</h2>
              <p>
                We may update this policy occasionally, whether because our practices change or because the law requires it. When we do, we'll post the updated version here with a new "last updated" date. If the changes are significant, we'll make sure you know about it — not just bury it in a footer link.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4 pt-4 border-t border-neutral-200">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Contact Us</h2>
              <p>Got questions, concerns, or just want to know more about how we handle your data? Reach out anytime:</p>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-2">
                <p className="font-semibold text-neutral-900">Shelby Cosmetics</p>
                <p><strong className="text-neutral-900">Email:</strong> <a href="mailto:shelbycosmetics18@gmail.com" className="text-[#c62c52] hover:underline">shelbycosmetics18@gmail.com</a></p>
                <p><strong className="text-neutral-900">Address:</strong> Block 9 Clifton Karachi, Pakistan</p>
                <p><strong className="text-neutral-900">Phone:</strong> <a href="tel:03113041704" className="text-[#c62c52] hover:underline">03113041704</a></p>
              </div>
              <p className="italic text-neutral-600">
                We built this brand on real relationships with real people, and that starts with being straight with you about your data.
              </p>
            </section>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}
