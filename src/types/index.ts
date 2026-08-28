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

export type Host = {
  name: string
  image: string
  isSuperhost: boolean
  responseRate: number
  responseTime: string
  listings: number
}

export type ReviewBreakdown = {
  cleanliness: number
  accuracy: number
  communication: number
  location: number
  value: number
}

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
  images: string[]
  propertyType: PropertyType
  amenities: string[]
  allAmenities: string[]
  isInstantBook: boolean
  guests: number
  bedrooms: number
  beds: number
  baths: number
  sizeSqm: number
  description: string
  host: Host
  reviewBreakdown: ReviewBreakdown
  houseRules: string[]
}