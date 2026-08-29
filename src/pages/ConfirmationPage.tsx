import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  Calendar,
  Check,
  ChevronDown,
  House,
  Lock,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'
import PropertyCard from '../components/home/PropertyCard'
import { getPropertyById, properties } from '../data'
import {
  createConfirmationNumber,
  formatStayDate,
  getNightCount,
  getPriceBreakdown,
} from '../utils/booking'

function BookingStepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: 'Booking details', short: 'Details' },
    { id: 2, label: 'Review & pay', short: 'Review' },
    { id: 3, label: 'Confirmation', short: 'Confirm' },
  ]

  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isDone = step.id < currentStep
        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-4">
            {index > 0 ? <span className="h-px w-6 bg-slate-200 sm:w-14" /> : null}
            <span className="flex items-center gap-2">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  isActive || isDone ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : step.id}
              </span>
              <span className={`text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                <span className="sm:hidden">{step.short}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function ConfirmationPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const property = getPropertyById(Number(id))
  const checkIn = searchParams.get('checkIn') ?? '2026-08-28'
  const checkOut = searchParams.get('checkOut') ?? '2026-09-02'
  const guests = Number(searchParams.get('guests')) || 2
  const fullName = searchParams.get('name')?.trim() || 'Guest'
  const firstName = fullName.split(' ')[0]
  const email = searchParams.get('email')?.trim() || 'your email'
  const [confirmationNumber] = useState(createConfirmationNumber)
  const [isBookingOpen, setIsBookingOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(false)

  if (!property) {
    return (
      <div className="min-h-screen bg-page">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Property not found</h1>
          <Link to="/stays" className="mt-4 inline-block text-brand">
            Back to stays
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const nights = getNightCount(checkIn, checkOut)
  const price = getPriceBreakdown(property.pricePerNight, nights)
  const suggestions = properties.filter((item) => item.id !== property.id).slice(0, 4)
  const detailsHref = `/stays/${property.id}?${new URLSearchParams({
    checkIn,
    checkOut,
    guests: String(guests),
  }).toString()}`

  const priceRows = (
    <dl className="space-y-2 text-sm text-slate-600">
      <div className="flex justify-between">
        <dt>
          ${property.pricePerNight} x {price.nights} {price.nights === 1 ? 'night' : 'nights'}
        </dt>
        <dd>${price.stayTotal}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Cleaning fee</dt>
        <dd>${price.cleaningFee}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Service fee</dt>
        <dd>${price.serviceFee}</dd>
      </div>
      <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
        <dt>Total (USD)</dt>
        <dd>${price.total}</dd>
      </div>
    </dl>
  )

  const bookingBody = (
    <div>
      <div className="flex gap-3">
        <img
          src={property.image}
          alt={property.name}
          className="h-20 w-24 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{property.name}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            {property.location}
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li className="inline-flex items-center gap-2">
          <Calendar className="h-4 w-4 text-brand" />
          {formatStayDate(checkIn)} – {formatStayDate(checkOut)} ({price.nights}{' '}
          {price.nights === 1 ? 'night' : 'nights'})
        </li>
        <li>
          {property.bedrooms} bedrooms • {property.baths} {property.baths === 1 ? 'bath' : 'baths'} (Up to{' '}
          {property.guests} guests)
        </li>
        <li className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-brand" />
          {guests} {guests === 1 ? 'guest' : 'guests'}
        </li>
      </ul>

      <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <p>
          <span className="block text-xs text-slate-400">Check-in</span>
          {formatStayDate(checkIn)} after 3:00 PM
        </p>
        <p>
          <span className="block text-xs text-slate-400">Check-out</span>
          {formatStayDate(checkOut)} before 11:00 AM
        </p>
        <p>
          <span className="block text-xs text-slate-400">Guests</span>
          {guests} {guests === 1 ? 'guest' : 'guests'}
        </p>
      </div>

      <p className="mt-5 flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <span>
          <span className="font-semibold">What's next?</span>
          <span className="mt-1 block">
            We sent a confirmation email to {email}. You can view or change this stay from{' '}
            <Link to="/stays" className="font-medium text-brand">
              My Bookings
            </Link>
            .
          </span>
        </span>
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <BookingStepper currentStep={3} />

        <section className="mt-8 flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div>
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Your booking is confirmed!
            </h1>
            <p className="mt-2 text-slate-500">
              Thank you, {firstName}! We've sent your booking confirmation to {email}.
            </p>
            <p className="mt-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
              Confirmation number {confirmationNumber}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
             <Link to={detailsHref}>
  <Button className="w-full sm:w-auto">View booking details</Button>
</Link>
              <Link
                to="/stays"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
              >
                Go to my bookings
              </Link>
            </div>
          </div>
          <div className="mt-8 hidden h-28 w-28 items-center justify-center rounded-full bg-blue-50 lg:flex">
            <House className="h-12 w-12 text-brand" />
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section id="booking" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left lg:pointer-events-none"
              onClick={() => setIsBookingOpen((value) => !value)}
            >
              <h2 className="text-lg font-semibold text-slate-900">Your booking</h2>
              <ChevronDown
                className={`h-5 w-5 text-slate-500 lg:hidden ${isBookingOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`mt-4 ${isBookingOpen ? 'block' : 'hidden'} lg:block`}>{bookingBody}</div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left lg:pointer-events-none"
                onClick={() => setIsPriceOpen((value) => !value)}
              >
                <h2 className="text-lg font-semibold text-slate-900">Price summary</h2>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 lg:hidden ${isPriceOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`mt-4 ${isPriceOpen ? 'block' : 'hidden'} lg:block`}>{priceRows}</div>
            </section>

            <p className="flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <span className="font-semibold">Free cancellation</span>
                <span className="mt-1 block">
                  Cancel up to 24 hours before check-in and get a full refund.
                </span>
              </span>
            </p>
            <p className="flex gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>
                <span className="font-semibold">Secure booking</span>
                <span className="mt-1 block text-slate-500">
                  Your payment information is always safe and encrypted.
                </span>
              </span>
            </p>
          </aside>
        </div>

        <section className="mt-12 pb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">You might also like</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {suggestions.map((item) => (
              <div key={item.id} className="w-[260px] shrink-0">
                <PropertyCard property={item} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ConfirmationPage