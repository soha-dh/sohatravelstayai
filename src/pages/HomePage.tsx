import Hero from '../components/home/Hero'
import PopularDestinations from '../components/home/PopularDestinations'
import Navbar from '../components/layout/Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main>
        <Hero />
        <PopularDestinations />
      </main>
    </div>
  )
}

export default HomePage