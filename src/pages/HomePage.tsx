import { House } from 'lucide-react'
import { destinations, properties } from '../data'

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-page">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-brand">
        <House />
        SohaTravelStay
      </h1>
      <p className="text-slate-500">
        {destinations.length} destinations · {properties.length} stays
      </p>
    </div>
  )
}

export default HomePage