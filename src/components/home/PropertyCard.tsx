import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '../../types'
import Card from '../ui/Card'
import { unsplashSrc } from '../../utils/image'

type PropertyCardProps = {
  property: Property
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    
  <Link to={`/stays/${property.id}`}>
    <Card className="group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={unsplashSrc(property.image, 800)}
          alt={property.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-medium text-slate-900 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {property.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{property.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{property.location}</p>
        <p className="mt-3 text-sm font-semibold text-slate-900">
          ${property.pricePerNight} / night
        </p>
      </div>
    </Card>
  </Link>
)
  
}

export default PropertyCard