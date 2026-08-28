import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import type { Property } from '../../types'
import { amenityIcons } from './amenityIcons'
import Button from '../ui/Button'

type SectionId = 'about' | 'amenities' | 'reviews' | 'location' | 'rules'

type PropertySectionsProps = {
  property: Property
}

function PropertySections({ property }: PropertySectionsProps) {
  const [openSection, setOpenSection] = useState<SectionId | null>('about')
  const [showMore, setShowMore] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const visibleAmenities = showAllAmenities
    ? property.allAmenities
    : property.allAmenities.slice(0, 9)
  const shortDescription = property.description.slice(0, 160)
  const scores = [
    { label: 'Cleanliness', value: property.reviewBreakdown.cleanliness },
    { label: 'Accuracy', value: property.reviewBreakdown.accuracy },
    { label: 'Communication', value: property.reviewBreakdown.communication },
    { label: 'Location', value: property.reviewBreakdown.location },
    { label: 'Value for money', value: property.reviewBreakdown.value },
  ]

  function scrollTo(id: SectionId) {
    setOpenSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggle(id: SectionId) {
  setOpenSection((current) => (current === id ? null : id))
}

  return (
    <div>
      <nav className="mb-8 hidden gap-6 border-b border-slate-200 lg:flex">
        {[
          { id: 'about', label: 'Overview' },
          { id: 'amenities', label: 'Amenities' },
          { id: 'reviews', label: `Reviews (${property.reviews})` },
          { id: 'location', label: 'Location' },
          { id: 'rules', label: 'House rules' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`border-b-2 pb-3 text-sm font-medium ${
              openSection === tab.id
                ? 'border-brand text-brand'
                : 'border-transparent text-slate-500'
            }`}
            onClick={() => scrollTo(tab.id as SectionId)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <Section
        id="about"
        title="About this place"
        open={openSection === 'about'}
        onToggle={() => toggle('about')}
      >
        <p className="text-slate-600 leading-7">
          {showMore ? property.description : `${shortDescription}... `}
          <button
            type="button"
            className="font-medium text-brand"
            onClick={() => setShowMore((value) => !value)}
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </p>
      </Section>

      <Section
        id="amenities"
        title="What this place offers"
        open={openSection === 'amenities'}
        onToggle={() => toggle('amenities')}
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleAmenities.map((amenity) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
            return (
              <li key={amenity} className="inline-flex items-center gap-2 text-slate-700">
                {Icon ? <Icon className="h-5 w-5 text-brand" /> : null}
                {amenity}
              </li>
            )
          })}
        </ul>
        {property.allAmenities.length > 9 ? (
          <Button
            variant="ghost"
            className="mt-4 border border-slate-200"
            onClick={() => setShowAllAmenities((value) => !value)}
          >
            {showAllAmenities
              ? 'Show less'
              : `Show all ${property.allAmenities.length} amenities`}
          </Button>
        ) : null}
      </Section>

      <Section
        id="reviews"
        title={`Reviews (${property.reviews})`}
        open={openSection === 'reviews'}
        onToggle={() => toggle('reviews')}
      >
        <p className="text-3xl font-bold text-slate-900">
          {property.rating}{' '}
          <span className="text-lg font-semibold text-slate-500">
            {property.rating >= 4.8 ? 'Excellent' : 'Great'}
          </span>
        </p>
        <div className="mt-4 space-y-3">
          {scores.map((score) => (
            <div key={score.label} className="grid grid-cols-[8rem_1fr_2rem] items-center gap-3 text-sm">
              <span className="text-slate-600">{score.label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{ width: `${(score.value / 5) * 100}%` }}
                />
              </span>
              <span className="text-slate-500">{score.value.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="location"
        title="Location"
        open={openSection === 'location'}
        onToggle={() => toggle('location')}
      >
        <p className="inline-flex items-center gap-2 text-slate-700">
          <MapPin className="h-5 w-5 text-brand" />
          {property.location}
        </p>
      </Section>

      <Section
        id="rules"
        title="House rules"
        open={openSection === 'rules'}
        onToggle={() => toggle('rules')}
      >
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          {property.houseRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </Section>

      <article className="mt-8 flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200/70">
        <img
          src={property.host.image}
          alt={property.host.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-slate-900">Hosted by {property.host.name}</h3>
          {property.host.isSuperhost ? (
            <p className="text-sm font-medium text-brand">Superhost</p>
          ) : null}
          <p className="mt-2 text-sm text-slate-500">
            Response rate {property.host.responseRate}% · {property.host.responseTime} ·{' '}
            {property.host.listings} listings
          </p>
          <Button variant="ghost" className="mt-3 border border-slate-200">
            Contact host
          </Button>
        </div>
      </article>
    </div>
  )
}

type SectionProps = {
  id: string
  title: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}

function Section({ id, title, open, onToggle, children }: SectionProps) {
  return (
    <section id={id} className="border-b border-slate-200 py-4 lg:border-0 lg:py-8">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2 text-left text-lg font-semibold text-slate-900 lg:hidden"
        onClick={onToggle}
      >
        {title}
        <ChevronDown className={`h-5 w-5 ${open ? 'rotate-180' : ''}`} />
      </button>
      <h2 className="mb-4 hidden text-xl font-semibold text-slate-900 lg:block">{title}</h2>
      <div className={`${open ? 'block' : 'hidden'} lg:block`}>{children}</div>
    </section>
  )
}

export default PropertySections