import { useState } from 'react'
import { Star, Zap } from 'lucide-react'
import type { Property } from '../../types'
import Button from '../ui/Button'

type BookingCardProps = {
  property: Property
}

function BookingCard({ property }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState('2026-08-28')
  const [checkOut, setCheckOut] = useState('2026-09-02')
  const [guests, setGuests] = useState(Math.min(2, property.guests))
  const [message, setMessage] = useState('')

  function handleSubmit(event: { preventDefault: () => void }, instant: boolean) {
    event.preventDefault()
    setMessage(
      instant
        ? `Instant booking confirmed for ${property.name}.`
        : `Booking request sent for ${property.name}.`,
    )
  }

  return (
    <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 xl:sticky xl:top-24">
      <div className="flex items-end justify-between gap-3">
        <p>
          <span className="text-2xl font-bold text-slate-900">
            ${property.pricePerNight}
          </span>
          <span className="text-sm text-slate-500"> / night</span>
        </p>
        <p className="inline-flex items-center gap-1 text-sm text-slate-600">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {property.rating} ({property.reviews} reviews)
        </p>
      </div>

      <form className="mt-4 space-y-3" onSubmit={(event) => handleSubmit(event, false)}>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-slate-500">
            Check-in
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
            />
          </label>
          <label className="text-xs font-medium text-slate-500">
            Check-out
            <input
              type="date"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900"
            />
          </label>
        </div>
        <label className="block text-xs font-medium text-slate-500">
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
        </label>
        <Button type="submit" className="w-full">
          Book now
        </Button>
        {property.isInstantBook ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full border border-brand text-brand hover:bg-blue-50"
            onClick={(event) => handleSubmit(event, true)}
          >
            <Zap className="mr-1 h-4 w-4" />
            Instant Book
          </Button>
        ) : null}
      </form>

      {message ? <p className="mt-3 text-sm text-green-700">{message}</p> : null}

      <ul className="mt-5 space-y-2 text-sm text-slate-500">
        <li>Free cancellation</li>
        <li>Best price guarantee</li>
        <li>Secure booking</li>
      </ul>
    </aside>
  )
}

export default BookingCard