import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ChevronDown, Lock, MapPin, ShieldCheck } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'
import { getPropertyById } from '../data'
import { formatStayDate, getNightCount, getPriceBreakdown } from '../utils/booking'

const phoneCodes = [
  { label: '🇹🇷 +90', value: '+90' },
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇩🇪 +49', value: '+49' },
]

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
                {step.id}
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

function CheckoutPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const property = getPropertyById(Number(id))
  const checkIn = searchParams.get('checkIn') ?? '2026-08-28'
  const checkOut = searchParams.get('checkOut') ?? '2026-09-02'


  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneCode, setPhoneCode] = useState('+90')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2)
  const [rooms, setRooms] = useState(1)
  const [requests, setRequests] = useState('')
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
  const propertyId = property.id
  
  const nights = getNightCount(checkIn, checkOut)
  const price = getPriceBreakdown(property.pricePerNight, nights)
  



  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault()
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(rooms),
      name: fullName,
      email,
      phone: `${phoneCode}${phone}`,
      requests,
    })
    navigate(`/stays/${propertyId}/review?${params.toString()}`)
  }

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

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-40 pt-6 sm:px-6 lg:pb-12">
        <BookingStepper currentStep={1} />

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">Complete your booking</h1>
        <p className="mt-2 text-slate-500">Almost there! Please fill in your details to confirm your stay.</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="lg:hidden">
            <article className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/70">
              <img
                src={property.image}
                alt={property.name}
                className="h-20 w-24 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-slate-900">{property.name}</h2>
                <p className="mt-1 truncate text-sm text-slate-500">{property.location}</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  ${property.pricePerNight} / night
                </p>
              </div>
            </article>
          </div>

          <form id="checkout-form" className="space-y-5" onSubmit={handleContinue}>
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="text-lg font-semibold text-slate-900">Your information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-slate-500">
                  Full name
                  <input
                    required
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                  />
                </label>
                <label className="text-xs font-medium text-slate-500">
                  Email address
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                  />
                </label>
              </div>
              <label className="mt-4 block text-xs font-medium text-slate-500">
                Phone number
                <span className="mt-1 flex gap-2">
                  <select
                    value={phoneCode}
                    onChange={(event) => setPhoneCode(event.target.value)}
                    className="h-11 rounded-xl border border-slate-200 px-2 text-sm text-slate-900"
                  >
                    {phoneCodes.map((code) => (
                      <option key={code.value} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                  />
                </span>
              </label>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="text-lg font-semibold text-slate-900">Who's coming?</h2>
              <p className="mt-1 text-sm text-slate-500">We'll use this info for your booking.</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-slate-500">
                  Guests
                  <select
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                  >
                    {Array.from({ length: property.guests }, (_, index) => index + 1).map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                  <span className="mt-1 block text-slate-400">Maximum {property.guests} guests</span>
                </label>
                <label className="text-xs font-medium text-slate-500">
                  Rooms
                  <select
                    value={rooms}
                    onChange={(event) => setRooms(Number(event.target.value))}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                  >
                    {Array.from({ length: property.bedrooms }, (_, index) => index + 1).map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? 'room' : 'rooms'}
                      </option>
                    ))}
                  </select>
                  <span className="mt-1 block text-slate-400">
                    {property.beds} beds • {property.baths} {property.baths === 1 ? 'bath' : 'baths'}
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="text-lg font-semibold text-slate-900">Special requests</h2>
              <p className="mt-1 text-sm text-slate-500">Optional</p>
              <textarea
                maxLength={250}
                value={requests}
                onChange={(event) => setRequests(event.target.value)}
                placeholder="Tell us if you have any special requests"
                className="mt-4 h-28 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
              <p className="mt-1 text-xs text-slate-400">{requests.length}/250</p>
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

            <div className="hidden items-start justify-between gap-4 lg:flex">
              <p className="flex items-start gap-2 text-sm text-slate-500">
                <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                Your information is secure. We use industry-standard encryption to keep your data safe.
              </p>
              <div className="shrink-0 text-right">
                <Button type="submit" className="px-6">
                  Continue to review
                </Button>
                <p className="mt-2 text-xs text-slate-400">You won't be charged yet.</p>
              </div>
            </div>
          </form>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="text-lg font-semibold text-slate-900">Your booking</h2>
              <div className="mt-4 flex gap-3">
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-20 w-24 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-900">{property.name}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {property.location}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="block text-slate-400">Check-in</span>
                  {formatStayDate(checkIn)}
                </p>
                <p>
                  <span className="block text-slate-400">Check-out</span>
                  {formatStayDate(checkOut)}
                </p>
                <p className="col-span-2">
  <span className="block text-slate-400">Guests</span>
  {guests} {guests === 1 ? 'guest' : 'guests'}
</p>
              </div>
              <div className="mt-5">{priceRows}</div>
              <ul className="mt-5 space-y-2 text-sm text-slate-500">
                <li>Best price guarantee</li>
                <li>Secure booking</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-4 lg:hidden">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">Total (USD)</p>
            <p className="text-lg font-bold text-slate-900">${price.total}</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-brand"
            onClick={() => setIsPriceOpen((value) => !value)}
          >
            View price details
            <ChevronDown className={`h-4 w-4 ${isPriceOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        {isPriceOpen ? <div className="mt-3">{priceRows}</div> : null}
        <Button type="submit" form="checkout-form" className="mt-3 w-full">
  Continue to review
</Button>
        <p className="mt-2 text-center text-xs text-slate-400">You won't be charged yet.</p>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  )
}

export default CheckoutPage