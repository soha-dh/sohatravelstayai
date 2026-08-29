import { Link, useParams, useSearchParams } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

function ReviewPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Review & pay</h1>
        <p className="mt-2 text-slate-500">This step comes next. No payment yet.</p>
        <Link
          to={`/stays/${id}/checkout?${searchParams.toString()}`}
          className="mt-4 inline-block text-brand"
        >
          Back to checkout
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default ReviewPage