import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import SearchBox from '../components/home/SearchBox'
import FiltersPanel from '../components/search/FiltersPanel'
import ResultCard from '../components/search/ResultCard'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'
import { properties } from '../data'
import type { Property } from '../types'

type SortBy = 'recommended' | 'price-asc' | 'price-desc' | 'rating'

function toggleString(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function toggleNumber(list: number[], value: number) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const where = searchParams.get('where') ?? 'All'
  const checkIn = searchParams.get('checkIn') ?? '2026-08-28'
  const checkOut = searchParams.get('checkOut') ?? '2026-09-02'
  const guests = searchParams.get('guests') ?? '2'
  const guestCount = Number(guests) || 1
  const query = where.trim().toLowerCase()

  const [minPrice, setMinPrice] = useState(10)
  const [maxPrice, setMaxPrice] = useState(500)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [instantBookOnly, setInstantBookOnly] = useState(false)
  const [sortBy, setSortBy] = useState<SortBy>('recommended')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isFiltersOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFiltersOpen])

const isAllPlaces = query === '' || query === 'all'
const baseResults = properties.filter((property) => {
  const matchesPlace =
    isAllPlaces ||
    property.city.toLowerCase().includes(query) ||
    property.location.toLowerCase().includes(query)
  return matchesPlace && property.guests >= guestCount
})

  const typeCounts = Object.fromEntries(
    ['Apartment', 'Villa', 'House', 'Boutique hotel', 'Other'].map((type) => [
      type,
      baseResults.filter((property) => property.propertyType === type).length,
    ]),
  )
  const ratingCounts = Object.fromEntries(
    [4.5, 4, 3.5, 3].map((rating) => [
      String(rating),
      baseResults.filter((property) => property.rating >= rating).length,
    ]),
  )
  const amenityCounts = Object.fromEntries(
    ['Wi-Fi', 'AC', 'Kitchen', 'Washing Machine', 'Free parking', 'Hot tub'].map(
      (amenity) => [
        amenity,
        baseResults.filter((property) => property.amenities.includes(amenity)).length,
      ],
    ),
  )

  const filteredResults = baseResults.filter((property) => {
    const matchesPrice =
      property.pricePerNight >= minPrice &&
      (maxPrice >= 500 || property.pricePerNight <= maxPrice)
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(property.propertyType)
    const matchesRating =
      selectedRatings.length === 0 ||
      property.rating >= Math.min(...selectedRatings)
    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => property.amenities.includes(amenity))
    const matchesInstant = !instantBookOnly || property.isInstantBook

    return (
      matchesPrice &&
      matchesType &&
      matchesRating &&
      matchesAmenities &&
      matchesInstant
    )
  })

  const results = [...filteredResults].sort((a: Property, b: Property) => {
    if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight
    if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight
    if (sortBy === 'rating') return b.rating - a.rating
    return a.id - b.id
  })

  function clearFilters() {
    setMinPrice(10)
    setMaxPrice(500)
    setSelectedTypes([])
    setSelectedRatings([])
    setSelectedAmenities([])
    setInstantBookOnly(false)
  }

  const filterProps = {
    minPrice,
    maxPrice,
    selectedTypes,
    selectedRatings,
    selectedAmenities,
    instantBookOnly,
    typeCounts,
    ratingCounts,
    amenityCounts,
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,
    onToggleType: (value: string) => setSelectedTypes((list) => toggleString(list, value)),
    onToggleRating: (value: number) => setSelectedRatings((list) => toggleNumber(list, value)),
    onToggleAmenity: (value: string) =>
      setSelectedAmenities((list) => toggleString(list, value)),
    onInstantBookChange: setInstantBookOnly,
    onClear: clearFilters,
  }

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
       <SearchBox
  key={`${where}-${checkIn}-${checkOut}-${guests}`}
  initialWhere={where}
  initialCheckIn={checkIn}
  initialCheckOut={checkOut}
  initialGuests={guestCount}
  submitLabel="Update search"
/>

        <nav className="mt-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span> › </span>
          <span>{isAllPlaces ? 'All stays' : `Stays in ${where}`}</span>
        </nav>

        <div className="mt-3 mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isAllPlaces ? 'All stays' : `Stays in ${where}`}
            </h1>
            <p className="mt-1 text-slate-500">
              {results.length} {results.length === 1 ? 'stay' : 'stays'} found
            </p>
          </div>
          <label className="hidden text-sm text-slate-600 xl:block">
            Sort by{' '}
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Guest rating</option>
            </select>
          </label>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 xl:hidden">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800"
            onClick={() => setIsFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          <label className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="h-full w-full rounded-xl bg-transparent px-3"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price-asc">Sort: Price low</option>
              <option value="price-desc">Sort: Price high</option>
              <option value="rating">Sort: Rating</option>
            </select>
          </label>
        </div>

        <div className="xl:grid xl:grid-cols-[280px_1fr] xl:items-start xl:gap-8">
          <aside className="hidden rounded-2xl bg-white p-5 ring-1 ring-slate-200/70 xl:block">
            <FiltersPanel {...filterProps} />
          </aside>

          {results.length === 0 ? (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200/70">
              No stays match this search. Try clearing filters or another city.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {results.map((property) => (
                <ResultCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {isFiltersOpen ? (
        <div className="xl:hidden">
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-slate-900/50"
            aria-label="Close filters"
            onClick={() => setIsFiltersOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700"
                aria-label="Close filters"
                onClick={() => setIsFiltersOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-5">
              <FiltersPanel {...filterProps} />
            </div>
            <div className="border-t border-slate-100 p-4">
              <Button className="w-full" onClick={() => setIsFiltersOpen(false)}>
                Show {results.length} {results.length === 1 ? 'result' : 'results'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SearchResultsPage