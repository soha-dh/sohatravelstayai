import { useState, type FormEvent } from 'react'
import { Calendar, MapPin, Minus, Plus, Search, Users } from 'lucide-react'

function SearchBox() {
  const [where, setWhere] = useState('Istanbul')
  const [checkIn, setCheckIn] = useState('2026-08-28')
  const [checkOut, setCheckOut] = useState('2026-09-02')
  const [guests, setGuests] = useState(2)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-3 shadow-lg md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-center md:gap-0 md:p-2"
    >
      <label className="flex cursor-text items-center gap-3 rounded-xl px-4 py-3 md:border-r md:border-slate-200">
        <MapPin className="h-5 w-5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-slate-500">Where</span>
          <input
            type="text"
            value={where}
            onChange={(event) => setWhere(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
          />
        </span>
      </label>

      <label className="flex cursor-text items-center gap-3 rounded-xl px-4 py-3 md:border-r md:border-slate-200">
        <Calendar className="h-5 w-5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-slate-500">Check in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
          />
        </span>
      </label>

      <label className="flex cursor-text items-center gap-3 rounded-xl px-4 py-3 md:border-r md:border-slate-200">
        <Calendar className="h-5 w-5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-slate-500">Check out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
          />
        </span>
      </label>

      <div className="flex items-center gap-3 rounded-xl px-4 py-3">
        <Users className="h-5 w-5 shrink-0 text-brand" />
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500">Guests</p>
          <div className="mt-1 flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-700"
              aria-label="Decrease guests"
              onClick={() => setGuests((value) => Math.max(1, value - 1))}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-16 text-sm font-medium text-slate-900">
              {guests} {guests === 1 ? 'Guest' : 'Guests'}
            </span>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-700"
              aria-label="Increase guests"
              onClick={() => setGuests((value) => value + 1)}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-medium text-white transition hover:bg-blue-700 md:h-14 md:w-14 md:px-0"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
        <span className="md:hidden">Search</span>
      </button>
    </form>
  )
}

export default SearchBox