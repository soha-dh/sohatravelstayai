import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  AirVent,
  Bath,
  Car,
  CookingPot,
  Heart,
  MapPin,
  Star,
  WashingMachine,
  Wifi,
  Zap,
} from 'lucide-react'
import type { Property } from '../../types'
import Card from '../ui/Card'

const amenityIcons = {
  'Wi-Fi': Wifi,
  AC: AirVent,
  Kitchen: CookingPot,
  'Washing Machine': WashingMachine,
  'Free parking': Car,
  'Hot tub': Bath,
}

type ResultCardProps = {
  property: Property
}

function ResultCard({ property }: ResultCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [searchParams] = useSearchParams()

  return (
    <Card className="relative md:flex">
      <Link
        to={{
          pathname: `/stays/${property.id}`,
          search: searchParams.toString() ? `?${searchParams.toString()}` : '',
        }}
        className="flex min-w-0 flex-1 flex-col md:flex-row"
      >
        <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:min-h-full md:w-72 lg:w-80">
  <img
    src={property.image}
    alt={property.name}
    className="absolute inset-0 h-full w-full object-cover"
  />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-medium text-slate-900 shadow-sm md:hidden">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {property.rating}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="text-lg font-semibold text-slate-900">{property.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-brand" />
            {property.location}
          </p>
          <p className="mt-2 hidden items-center gap-1 text-sm text-slate-700 md:flex">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {property.rating} ({property.reviews} reviews)
          </p>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
            {property.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
              return (
                <li key={amenity} className="inline-flex items-center gap-1.5">
                  {Icon ? <Icon className="h-4 w-4 text-brand" /> : null}
                  {amenity}
                </li>
              )
            })}
          </ul>

          <div className="mt-4 flex items-end justify-between gap-3 md:mt-auto">
            {property.isInstantBook ? (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                <Zap className="h-4 w-4" />
                Instant Book
              </span>
            ) : (
              <span />
            )}
            <p className="text-right">
              <span className="text-2xl font-bold text-brand">
                ${property.pricePerNight}
              </span>
              <span className="text-sm text-slate-500"> / night</span>
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
        aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        onClick={(event) => {
          event.preventDefault()
          setIsFavorite((value) => !value)
        }}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>
    </Card>
  )
}

export default ResultCard