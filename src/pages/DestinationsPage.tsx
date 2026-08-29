import DestinationCard from '../components/home/DestinationCard'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { destinations } from '../data'

function DestinationsPage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Destinations</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Explore stays across Türkiye. Pick a place to see available properties.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DestinationsPage