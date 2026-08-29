import { Link } from 'react-router-dom'
import type { Destination } from '../../types'
import Card from '../ui/Card'
import { unsplashSrc } from '../../utils/image'

type DestinationCardProps = {
  destination: Destination
}

function DestinationCard({ destination }: DestinationCardProps) {
return (
  <Link to={`/stays?where=${encodeURIComponent(destination.name)}`}>
    <Card className="group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={unsplashSrc(destination.image, 800)}
          alt={destination.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{destination.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{destination.stays} stays</p>
      </div>
    </Card>
  </Link>
)
}

export default DestinationCard