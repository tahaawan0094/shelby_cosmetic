import Head from 'next/head'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund Policy | Shelby Cosmetics – Returns & Refunds Made Easy</title>
        <meta 
          name="description" 
          content="Learn how Shelby Cosmetics handles refunds, returns, and exchanges. Simple, transparent policies so you can shop with confidence every time." 
        />
      </Head>

      <div className="min-h-screen bg-[#fcfbf9] text-neutral-900">
        <Navbar solid />

        <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 lg:px-16 lg:pt-40">
          <header className="mb-12 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c62c52]">Customer Service</p>
            <h1 className="font-serif text-4xl md:text-6xl text-neutral-900">
              Refund Policy
            </h1>
            <p className="mt-3 text-xs uppercase tracking-widest text-neutral-500">
              Last updated: August 19, 2026
            </p>
          </header>

          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-left">
            <div className="space-y-4 text-base md:text-lg border-b border-neutral-200 pb-8">
              <p>
                We want you to feel good about every purchase you make with Shelby Cosmetics — not just the product itself, but the whole experience around it. If something doesn't work out, we'd rather make it right than leave you stuck with a product you're not happy with. Here's exactly how our refund process works, no runaround.
              </p>
            </div>

            {/* Our Return Window */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Our Return Window</h2>
              <p>
                You have 2 days from the date of delivery to request a return or exchange. After that window closes, we're generally not able to process a refund, so it's worth checking your order soon after it arrives.
              </p>
              <p>To be eligible, items need to be:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unused and unopened</li>
                <li>In their original packaging, with all seals intact</li>
                <li>Accompanied by your order number or proof of purchase</li>
              </ul>
              <p>
                We get it — makeup and skincare are personal, and you can't always tell if a product's right for you until you've tried it. Unfortunately, for hygiene and safety reasons, we can't accept returns on opened or used cosmetics, unless the item arrived damaged or defective.
              </p>
            </section>

            {/* Items That Can't Be Returned */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Items That Can't Be Returned</h2>
              <p>A few categories are excluded from our standard return policy:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opened or used skincare, makeup, and beauty tools</li>
                <li>Final sale or clearance items (these are marked clearly at checkout)</li>
                <li>Gift cards</li>
                <li>Products purchased from third-party retailers, not directly through our website</li>
              </ul>
              <p>
                If you're ever unsure whether your item qualifies, just drop us a message before sending anything back. It saves everyone time.
              </p>
            </section>

            {/* How to Start a Return */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">How to Start a Return</h2>
              <p>Getting a return going is pretty straightforward:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email us at <a href="mailto:shelbycosmetic18@gmail.com" className="text-[#c62c52] underline">shelbycosmetic18@gmail.com</a> with your order number and the reason for the return</li>
                <li>We'll review your request and send you return instructions, including the address to ship the item back to</li>
                <li>Pack the product securely in its original packaging</li>
                <li>Ship it back using a trackable method — we recommend this so there's no dispute over whether it arrived</li>
              </ol>
              <p>
                Once we receive the item, our team inspects it to confirm it meets the return conditions. This usually takes 2-4 business days.
              </p>
            </section>

            {/* Refunds */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Refunds</h2>
              <p>
                Once your return is approved, we'll process your refund to the original payment method. Depending on your bank or card provider, it can take anywhere from 5 to 10 business days for the funds to actually show up in your account — that part's a little out of our hands.
              </p>
              <p>Here's what to expect refund-wise:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-neutral-900">Product cost:</strong> Refunded in full for eligible returns</li>
                <li><strong className="text-neutral-900">Original shipping fees:</strong> Non-refundable, unless the return is due to our mistake (wrong item, damaged product, etc.)</li>
                <li><strong className="text-neutral-900">Return shipping costs:</strong> Covered by you, unless we sent something incorrect or defective</li>
              </ul>
              <p>
                If your refund is taking longer than expected, check with your bank first. If it's still not showing up after 10 business days, reach out to us and we'll look into it.
              </p>
            </section>

            {/* Damaged or Defective Items */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Damaged or Defective Items</h2>
              <p>
                Mistakes happen, even with careful packing. If your order arrives damaged, defective, or if we've sent you the wrong item entirely, contact us within 2 days of delivery with photos of the issue. We'll cover the cost of return shipping and get a replacement or full refund sent your way — no extra hassle on your end.
              </p>
            </section>

            {/* Exchanges */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Exchanges</h2>
              <p>
                Prefer a swap instead of a refund? We can usually arrange an exchange for a different shade, size, or product of equal value, as long as the original item meets our return conditions. Just mention it when you reach out, and we'll walk you through the process.
              </p>
            </section>

            {/* Late or Missing Refunds */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Late or Missing Refunds</h2>
              <p>Before panicking about a missing refund, here's a quick checklist:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Double-check your bank account or card statement again</li>
                <li>Contact your card issuer — processing times can vary on their end</li>
                <li>Reach out to your bank, since there's sometimes a delay before a refund posts officially</li>
              </ul>
              <p>
                Still no luck? Email us at <a href="mailto:shelbycosmetic18@gmail.com" className="text-[#c62c52] underline">shelbycosmetic18@gmail.com</a> and we'll dig into it on our side.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Changes to This Policy</h2>
              <p>
                We may update this Refund Policy occasionally to reflect changes in how we operate or to stay compliant with regulations. Any updates will be posted here with a revised date, so it's worth a quick check if it's been a while since your last order.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4 pt-4 border-t border-neutral-200">
              <h2 className="text-2xl font-serif text-neutral-900 font-medium">Contact Us</h2>
              <p>Got a return in progress, or just have a question before you buy? We're here to help.</p>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-2">
                <p className="font-semibold text-neutral-900">Shelby Cosmetics</p>
                <p><strong className="text-neutral-900">Email:</strong> <a href="mailto:shelbycosmetic18@gmail.com" className="text-[#c62c52] hover:underline">shelbycosmetic18@gmail.com</a></p>
                <p><strong className="text-neutral-900">Address:</strong> Block 9 Clifton Karachi, Pakistan</p>
                <p><strong className="text-neutral-900">Phone:</strong> <a href="tel:03113041704" className="text-[#c62c52] hover:underline">03113041704</a></p>
              </div>
              <p className="italic text-neutral-600">
                We'd rather solve a problem quickly than make you jump through hoops — that's just how we do business.
              </p>
            </section>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}
