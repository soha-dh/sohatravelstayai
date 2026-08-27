import Hero from '../components/home/Hero'
import Navbar from '../components/layout/Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default HomePage