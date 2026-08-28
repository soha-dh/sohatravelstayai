import { useSearchParams } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const where = searchParams.get('where') ?? 'Istanbul'
  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''
  const guests = searchParams.get('guests') ?? '2'

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Stays in {where}</h1>
        <p className="mt-2 text-slate-500">
          {checkIn} — {checkOut} · {guests} guests
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default SearchResultsPage