import FeaturedStays from '../components/home/FeaturedStays'
import Hero from '../components/home/Hero'
import PopularDestinations from '../components/home/PopularDestinations'
import ValueProps from '../components/home/ValueProps'
import Navbar from '../components/layout/Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main>
        <Hero />
        <PopularDestinations />
        <FeaturedStays />
        <ValueProps />
      </main>
    </div>
  )
}

export default HomePage