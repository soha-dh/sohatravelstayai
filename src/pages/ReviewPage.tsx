import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'
import { getPropertyById } from '../data'
import { formatStayDate, getNightCount, getPriceBreakdown } from '../utils/booking'
import { unsplashSrc } from '../utils/image'

type PaymentMethod = 'card' | 'paypal' | 'gpay' | 'apple'

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

function ReviewPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const property = getPropertyById(Number(id))
  const checkIn = searchParams.get('checkIn') ?? '2026-08-28'
  const checkOut = searchParams.get('checkOut') ?? '2026-09-02'
  const guests = Number(searchParams.get('guests')) || 2

  const [method, setMethod] = useState<PaymentMethod>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [saveCard, setSaveCard] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [wantsDeals, setWantsDeals] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(true)

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
  const checkoutHref = `/stays/${propertyId}/checkout?${searchParams.toString()}`

  function handlePay(event: { preventDefault: () => void }) {
    event.preventDefault()
    if (!agreed) {
      return
    }
    navigate(`/stays/${propertyId}/confirmation?${searchParams.toString()}`)
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

  const stayFacts = (
    <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-3">
      <p className="inline-flex items-center gap-2">
        <Calendar className="h-4 w-4 text-brand" />
        <span>
          <span className="block text-xs text-slate-400">Check-in</span>
          {formatStayDate(checkIn)} · 3:00 PM
        </span>
      </p>
      <p className="inline-flex items-center gap-2">
        <Calendar className="h-4 w-4 text-brand" />
        <span>
          <span className="block text-xs text-slate-400">Check-out</span>
          {formatStayDate(checkOut)} · 11:00 AM
        </span>
      </p>
      <p className="inline-flex items-center gap-2">
        <Users className="h-4 w-4 text-brand" />
        <span>
          <span className="block text-xs text-slate-400">Guests</span>
          {guests} {guests === 1 ? 'guest' : 'guests'}
        </span>
      </p>
    </div>
  )

  const paymentOptions: { id: PaymentMethod; label: string; logos: string }[] = [
    { id: 'card', label: 'Credit / Debit Card', logos: 'Visa · Mastercard · Amex' },
    { id: 'paypal', label: 'PayPal', logos: 'PayPal' },
    { id: 'gpay', label: 'Google Pay', logos: 'GPay' },
    { id: 'apple', label: 'Apple Pay', logos: 'Apple Pay' },
  ]

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6">
        <BookingStepper currentStep={2} />

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">
          Review your booking & payment
        </h1>
        <p className="mt-2 text-slate-500">Please review your details and complete your payment.</p>

        <form className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]" onSubmit={handlePay}>
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <div className="flex items-center justify-between gap-3">
                <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-white">
                    1
                  </span>
                  Your booking
                </h2>
                <Link to={checkoutHref} className="text-sm font-medium text-brand">
                  Edit
                </Link>
              </div>

              <div className="mt-4 flex gap-3">
                <img
                  src={unsplashSrc(property.image, 240)}
                  alt={property.name}
                  className="h-20 w-24 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{property.name}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {property.location}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Up to {property.guests} guests · {property.bedrooms} bedrooms · {property.beds}{' '}
                    beds · {property.baths} {property.baths === 1 ? 'bath' : 'baths'} · {property.sizeSqm} m²
                  </p>
                </div>
              </div>

              <div className="mt-3 hidden sm:block">{stayFacts}</div>
              <div className="sm:hidden">
                {isBookingOpen ? stayFacts : null}
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-brand"
                  onClick={() => setIsBookingOpen((value) => !value)}
                >
                  {isBookingOpen ? 'Hide details' : 'Show details'}
                  <ChevronDown className={`h-4 w-4 ${isBookingOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-white">
                  2
                </span>
                Payment method
              </h2>

              <div className="mt-4 space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                      method === option.id ? 'border-brand bg-blue-50' : 'border-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={method === option.id}
                        onChange={() => setMethod(option.id)}
                      />
                      <span className="text-sm font-medium text-slate-900">{option.label}</span>
                    </span>
                    <span className="text-xs text-slate-400">{option.logos}</span>
                  </label>
                ))}
              </div>

              {method === 'card' ? (
                <div className="mt-5 space-y-3">
                  <p className="text-sm font-medium text-slate-900">Enter your card details</p>
                  <label className="block text-xs font-medium text-slate-500">
                    Card number
                    <span className="relative mt-1 block">
                      <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        placeholder="1234 1234 1234 1234"
                        className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm text-slate-900"
                      />
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-xs font-medium text-slate-500">
                      Expiry date
                      <input
                        required
                        value={expiry}
                        onChange={(event) => setExpiry(event.target.value)}
                        placeholder="MM / YY"
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                      />
                    </label>
                    <label className="text-xs font-medium text-slate-500">
                      CVC
                      <input
                        required
                        value={cvc}
                        onChange={(event) => setCvc(event.target.value)}
                        placeholder="123"
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                      />
                    </label>
                  </div>
                  <label className="block text-xs font-medium text-slate-500">
                    Name on card
                    <input
                      required
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      placeholder="John Doe"
                      className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(event) => setSaveCard(event.target.checked)}
                    />
                    Save card for faster booking next time
                  </label>
                </div>
              ) : (
                <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
                  This is a demo. No real {method === 'paypal' ? 'PayPal' : method === 'gpay' ? 'Google Pay' : 'Apple Pay'} charge will be made.
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-white">
                  3
                </span>
                Important information
              </h2>
              <label className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                <input
                  required
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  I have read and agree to the{' '}
                  <span className="text-brand">Terms & Conditions</span>,{' '}
                  <span className="text-brand">Privacy Policy</span>, and{' '}
                  <Link to={`/stays/${propertyId}`} className="text-brand">
                    House Rules
                  </Link>
                  .
                </span>
              </label>
              <label className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={wantsDeals}
                  onChange={(event) => setWantsDeals(event.target.checked)}
                  className="mt-1"
                />
                I would like to receive exclusive deals and travel tips.
              </label>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to={checkoutHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to details
              </Link>
              <div className="text-right">
                <Button type="submit" className="w-full sm:w-auto">
                  <Lock className="mr-2 h-4 w-4" />
                  Pay now & confirm booking
                </Button>
                <p className="mt-2 text-xs text-slate-400">You won't be charged yet.</p>
              </div>
            </div>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 lg:hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={() => setIsSummaryOpen((value) => !value)}
              >
                <h2 className="text-lg font-semibold text-slate-900">Your booking summary</h2>
                <ChevronDown className={`h-5 w-5 text-slate-500 ${isSummaryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSummaryOpen ? <div className="mt-4">{priceRows}</div> : null}
            </section>

            <p className="flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 lg:hidden">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <span className="font-semibold">Free cancellation</span>
                <span className="mt-1 block">
                  Cancel up to 24 hours before check-in and get a full refund.
                </span>
              </span>
            </p>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="text-lg font-semibold text-slate-900">Your booking summary</h2>
                <div className="mt-4 flex gap-3">
                  <img
                    src={unsplashSrc(property.image, 240)}
                    alt={property.name}
                    className="h-16 w-20 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{property.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{property.location}</p>
                  </div>
                </div>
                <div className="mt-5">{priceRows}</div>
              </div>

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

              <div className="rounded-2xl bg-white p-5 text-sm shadow-sm ring-1 ring-slate-200/70">
                <h3 className="font-semibold text-slate-900">Need help?</h3>
                <p className="mt-3 inline-flex items-center gap-2 text-slate-600">
                  <Phone className="h-4 w-4 text-brand" />
                  +90 850 123 45 67
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4 text-brand" />
                  support@sohatravelstay.com
                </p>
              </div>
            </div>
          </aside>
        </form>
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  )
}

export default ReviewPage