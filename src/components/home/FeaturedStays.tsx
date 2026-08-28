import { useNavigate } from 'react-router-dom'
import { properties } from '../../data'
import PropertyCard from './PropertyCard'

function FeaturedStays() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Featured stays
          </h2>
          <p className="mt-2 text-slate-500">
            Handpicked places for your next adventure.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-brand hover:bg-blue-50 hover:text-blue-700"
          onClick={() => navigate('/stays')}
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedStays