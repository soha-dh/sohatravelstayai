import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BedDouble, Heart, MapPin, Ruler, Share2, Star, Users, Zap } from 'lucide-react'
import BookingCard from '../components/property/BookingCard'
import PropertyGallery from '../components/property/PropertyGallery'
import PropertySections from '../components/property/PropertySections'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { getPropertyById } from '../data'

function PropertyDetailsPage() {
  const { id } = useParams()
  const property = getPropertyById(Number(id))
  const [isSaved, setIsSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!property) {
    return (
      <div className="min-h-screen bg-page">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Property not found</h1>
          <Link to="/stays" className="mt-4 inline-block text-brand">
            Back to stays
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <nav className="text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span> › </span>
          <Link to={`/stays?where=${property.city}`} className="hover:text-slate-900">
            Stays in {property.city}
          </Link>
          <span> › </span>
          <span>{property.name}</span>
        </nav>

        {property.isInstantBook ? (
          <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
            <Zap className="h-4 w-4" />
            Instant Book
          </p>
        ) : null}

        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{property.name}</h1>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              onClick={() => setIsSaved((value) => !value)}
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              Save
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-brand" />
            {property.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {property.rating} ({property.reviews} reviews)
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <p className="rounded-2xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-200/70">
            <Users className="mb-2 h-5 w-5 text-brand" />
            Up to {property.guests} guests
            <span className="mt-1 block text-slate-500">Entire {property.propertyType.toLowerCase()}</span>
          </p>
          <p className="rounded-2xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-200/70">
            <BedDouble className="mb-2 h-5 w-5 text-brand" />
            {property.bedrooms} bedrooms
            <span className="mt-1 block text-slate-500">
              {property.beds} beds • {property.baths} bath
            </span>
          </p>
          <p className="rounded-2xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-200/70">
            <Ruler className="mb-2 h-5 w-5 text-brand" />
            {property.sizeSqm} m²
            <span className="mt-1 block text-slate-500">Size</span>
          </p>
        </div>

        <div className="mt-6">
          <PropertyGallery name={property.name} images={property.images} />
        </div>

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
  <div className="xl:col-start-2 xl:row-start-1">
    <BookingCard property={property} />
  </div>
  <div className="xl:col-start-1 xl:row-start-1">
    <PropertySections property={property} />
  </div>
</div>
      </main>
      <Footer />
    </div>
  )
}

export default PropertyDetailsPage