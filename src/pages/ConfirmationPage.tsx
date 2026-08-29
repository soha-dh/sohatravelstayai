import { Link, useParams, useSearchParams } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

function ConfirmationPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Booking confirmed</h1>
        <p className="mt-2 text-slate-500">This page comes next. No real payment was taken.</p>
        <Link
          to={`/stays/${id}/review?${searchParams.toString()}`}
          className="mt-4 inline-block text-brand"
        >
          Back to review
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default ConfirmationPage