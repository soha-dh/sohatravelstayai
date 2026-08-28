import { Link, useSearchParams } from 'react-router-dom'
import SearchBox from '../components/home/SearchBox'
import ResultCard from '../components/search/ResultCard'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { properties } from '../data'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const where = searchParams.get('where') ?? 'Istanbul'
  const checkIn = searchParams.get('checkIn') ?? '2026-08-28'
  const checkOut = searchParams.get('checkOut') ?? '2026-09-02'
  const guests = searchParams.get('guests') ?? '2'
  const guestCount = Number(guests) || 1
  const query = where.trim().toLowerCase()

  const results = properties.filter((property) => {
    const matchesPlace =
      property.city.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query)
    return matchesPlace && property.guests >= guestCount
  })

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <SearchBox
          initialWhere={where}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuests={guestCount}
          submitLabel="Update search"
        />

        <nav className="mt-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span> › </span>
          <span>Stays in {where}</span>
        </nav>

        <div className="mt-3 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Stays in {where}
          </h1>
          <p className="mt-1 text-slate-500">
            {results.length} {results.length === 1 ? 'stay' : 'stays'} found
          </p>
        </div>

        {results.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200/70">
            No stays match this search. Try another city or fewer guests.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {results.map((property) => (
              <ResultCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default SearchResultsPage