import type { PropertyType } from '../../types'

const propertyTypes: PropertyType[] = [
  'Apartment',
  'Villa',
  'House',
  'Boutique hotel',
  'Other',
]

const ratingOptions = [4.5, 4, 3.5, 3]
const amenityOptions = [
  'Wi-Fi',
  'AC',
  'Kitchen',
  'Washing Machine',
  'Free parking',
  'Hot tub',
]

type FiltersPanelProps = {
  minPrice: number
  maxPrice: number
  selectedTypes: string[]
  selectedRatings: number[]
  selectedAmenities: string[]
  instantBookOnly: boolean
  typeCounts: Record<string, number>
  ratingCounts: Record<string, number>
  amenityCounts: Record<string, number>
  onMinPriceChange: (value: number) => void
  onMaxPriceChange: (value: number) => void
  onToggleType: (value: string) => void
  onToggleRating: (value: number) => void
  onToggleAmenity: (value: string) => void
  onInstantBookChange: (value: boolean) => void
  onClear: () => void
}

function FiltersPanel({
  minPrice,
  maxPrice,
  selectedTypes,
  selectedRatings,
  selectedAmenities,
  instantBookOnly,
  typeCounts,
  ratingCounts,
  amenityCounts,
  onMinPriceChange,
  onMaxPriceChange,
  onToggleType,
  onToggleRating,
  onToggleAmenity,
  onInstantBookChange,
  onClear,
}: FiltersPanelProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filter by</h2>
        <button
          type="button"
          className="text-sm font-medium text-brand hover:text-blue-700"
          onClick={onClear}
        >
          Clear all
        </button>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">Price per night</legend>
        <div className="mt-4 space-y-3">
          <label className="block text-sm text-slate-500">
            Min ${minPrice}
            <input
              type="range"
              min={10}
              max={500}
              step={5}
              value={minPrice}
              onChange={(event) =>
                onMinPriceChange(Math.min(Number(event.target.value), maxPrice))
              }
              className="mt-2 w-full accent-blue-600"
            />
          </label>
          <label className="block text-sm text-slate-500">
            Max ${maxPrice >= 500 ? '500+' : maxPrice}
            <input
              type="range"
              min={10}
              max={500}
              step={5}
              value={maxPrice}
              onChange={(event) =>
                onMaxPriceChange(Math.max(Number(event.target.value), minPrice))
              }
              className="mt-2 w-full accent-blue-600"
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">Property type</legend>
        <div className="mt-3 space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center justify-between gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => onToggleType(type)}
                  className="h-4 w-4 accent-blue-600"
                />
                {type}
              </span>
              <span className="text-slate-400">{typeCounts[type] ?? 0}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">Guest rating</legend>
        <div className="mt-3 space-y-2">
          {ratingOptions.map((rating) => (
            <label key={rating} className="flex items-center justify-between gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => onToggleRating(rating)}
                  className="h-4 w-4 accent-blue-600"
                />
                {rating.toFixed(1)}+
              </span>
              <span className="text-slate-400">{ratingCounts[String(rating)] ?? 0}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">Amenities</legend>
        <div className="mt-3 space-y-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex items-center justify-between gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => onToggleAmenity(amenity)}
                  className="h-4 w-4 accent-blue-600"
                />
                {amenity}
              </span>
              <span className="text-slate-400">{amenityCounts[amenity] ?? 0}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center justify-between gap-3 text-sm font-medium text-slate-900">
        Instant Book
        <input
          type="checkbox"
          checked={instantBookOnly}
          onChange={(event) => onInstantBookChange(event.target.checked)}
          className="h-4 w-4 accent-blue-600"
        />
      </label>
    </div>
  )
}

export default FiltersPanel