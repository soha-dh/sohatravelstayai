import { destinations } from '../../data'
import DestinationCard from './DestinationCard'

function PopularDestinations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Popular destinations
        </h2>
        <p className="mt-2 text-slate-500">
          Explore the places travelers love most.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}

export default PopularDestinations