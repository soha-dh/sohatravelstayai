import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import ValueProps from '../components/home/ValueProps'
import Button from '../components/ui/Button'

function AboutPage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="text-sm font-medium text-brand">About SohaTravelStay</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A simpler way to find and book stays in Türkiye.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-500">
            SohaTravelStay is a frontend portfolio marketplace for browsing destinations,
            comparing stays, and walking through a complete booking flow — from search to
            confirmation — with mock data and no real payments.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/stays">
              <Button>Browse stays</Button>
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
            >
              View destinations
            </Link>
          </div>
        </section>

        <ValueProps />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">How it works</h2>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <p className="text-sm font-semibold text-brand">01</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Search</h3>
              <p className="mt-2 text-sm text-slate-500">
                Choose a destination, dates, and guests to see matching stays.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <p className="text-sm font-semibold text-brand">02</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Compare</h3>
              <p className="mt-2 text-sm text-slate-500">
                Open a property to review photos, amenities, house rules, and price.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <p className="text-sm font-semibold text-brand">03</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Book</h3>
              <p className="mt-2 text-sm text-slate-500">
                Complete checkout and review. Payment is simulated for this demo.
              </p>
            </li>
          </ol>
        </section>

        <section id="contact" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Contact</h2>
            <p className="mt-2 max-w-xl text-slate-500">
              This is a demo product, so messages are not sent. The details below match the
              booking flow.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                +90 850 123 45 67
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                support@sohatravelstay.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage