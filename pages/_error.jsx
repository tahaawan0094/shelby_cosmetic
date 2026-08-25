import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'

export default function CustomError() {
  return (
    <>
      <Head>
        <title>Page Not Found | Shelby Cosmetics</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Head>
      <div className="min-h-screen bg-[#faf8f5] text-neutral-900">
        <Navbar solid />
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-20 text-center">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#c62c52]">Shelby Cosmetics</p>
            <p className="font-serif text-8xl leading-none text-[#c62c52] md:text-[10rem]">404</p>
            <h1 className="mt-5 text-3xl uppercase tracking-[0.08em] md:text-4xl">Page Not Found</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-600">
              Something went wrong while opening this page. Please return home and try again.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="rounded-full bg-[#c62c52] px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#9f213f]">
                Back Home
              </Link>
              <Link href="/collections/all" className="rounded-full border border-[#c62c52] px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#c62c52] transition hover:bg-[#c62c52] hover:text-white">
                Shop Products
              </Link>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    </>
  )
}
