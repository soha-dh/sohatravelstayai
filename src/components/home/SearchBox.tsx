import { useState } from 'react'
import { destinations } from '../../data'
import { Calendar, MapPin, Minus, Plus, Search, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


type SearchBoxProps = {
  initialWhere?: string
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
  submitLabel?: string
}

function SearchBox({
  initialWhere = 'All',
  initialCheckIn = '2026-08-28',
  initialCheckOut = '2026-09-02',
  initialGuests = 2,
  submitLabel = 'Search',
}: SearchBoxProps) {
  const [where, setWhere] = useState(initialWhere)
  const [checkIn, setCheckIn] = useState(initialCheckIn)
  const [checkOut, setCheckOut] = useState(initialCheckOut)
  const [guests, setGuests] = useState(initialGuests)
  const navigate = useNavigate()
  const [dateError, setDateError] = useState('')

function addOneDay(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`)
  date.setDate(date.getDate() + 1)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

  function handleSubmit(event: { preventDefault: () => void }) {
  event.preventDefault()
  if (checkOut <= checkIn) {
    setDateError('Check-out must be after check-in.')
    return
  }
  setDateError('')
  const params = new URLSearchParams({
    where,
    checkIn,
    checkOut,
    guests: String(guests),
  })
  navigate(`/stays?${params.toString()}`)
}

  const isResultsSearch = submitLabel !== 'Search'

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-3 shadow-lg md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-center md:gap-0 md:p-2"
    >
      <label className="flex items-center gap-3 rounded-xl px-4 py-3 md:border-r md:border-slate-200">
  <MapPin className="h-5 w-5 shrink-0 text-brand" />
  <span className="min-w-0 flex-1">
    <span className="block text-xs font-medium text-slate-500">Where</span>
    <select
      value={where}
      onChange={(event) => setWhere(event.target.value)}
      className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
    >
      <option value="All">All</option>
      {destinations.map((destination) => (
        <option key={destination.id} value={destination.name}>
          {destination.name}
        </option>
      ))}
    </select>
  </span>
</label>

      <label className="flex cursor-text items-center gap-3 rounded-xl px-4 py-3 md:border-r md:border-slate-200">
        <Calendar className="h-5 w-5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-slate-500">Check in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(event) => {
  const value = event.target.value
  setCheckIn(value)
  if (checkOut <= value) {
    setCheckOut(addOneDay(value))
  }
  setDateError('')
}}
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
            min={checkIn}
onChange={(event) => {
  setCheckOut(event.target.value)
  setDateError('')
}}
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
{dateError ? (
  <p className="px-3 text-sm text-red-600 md:col-span-full">{dateError}</p>
) : null}
      <button
        type="submit"
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-medium text-white transition hover:bg-blue-700 ${
          isResultsSearch ? 'md:h-14' : 'md:h-14 md:w-14 md:px-0'
        }`}
        aria-label={submitLabel}
      >
        <Search className="h-5 w-5" />
        <span className={isResultsSearch ? undefined : 'md:hidden'}>{submitLabel}</span>
      </button>
    </form>
  )
}

export default SearchBox