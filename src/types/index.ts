export type Destination = {
  id: number
  name: string
  country: string
  stays: number
  image: string
}

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'House'
  | 'Boutique hotel'
  | 'Other'

export type Property = {
  id: number
  name: string
  location: string
  city: string
  rating: number
  reviews: number
  pricePerNight: number
  currency: string
  image: string
  propertyType: PropertyType
  amenities: string[]
  isInstantBook: boolean
  guests: number
}