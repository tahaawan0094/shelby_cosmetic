import Head from 'next/head'
import Navbar from './Navbar'
import FooterSection from './FooterSection'

export default function InfoPage({ title, eyebrow = 'Shelby Cosmetics', intro, sections = [], children, seoTitle, seoDescription }) {
  return (
    <>
      <Head>
        <title>{seoTitle || `${title} | Shelby Cosmetics`}</title>
        <meta name="description" content={seoDescription || intro} />
      </Head>
      <div className="min-h-screen bg-neutral-1 text-neutral-900">
        <Navbar solid />
        <main>
          <header className="border-b border-rose-100 bg-white px-6 py-16 md:px-12 md:py-24">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs uppercase tracking-[0.28em] text-rose-600">{eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">{intro}</p>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-20">
            {children}
            {sections.length > 0 && (
              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.heading} className="max-w-3xl">
                    <h2 className="text-2xl md:text-3xl">{section.heading}</h2>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-600 md:text-base">
                      {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </main>
        <FooterSection />
      </div>
    </>
  )
}