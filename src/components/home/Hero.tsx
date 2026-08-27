import SearchBox from './SearchBox'

const heroImage =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80'

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury villa with a pool"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6">
        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Find your next stay
        </h1>
        <p className="mt-3 max-w-lg text-base text-white/90 sm:text-lg">
          Discover unique places to stay and make your next trip unforgettable.
        </p>
        <div className="mt-8 max-w-5xl">
          <SearchBox />
        </div>
      </div>
    </section>
  )
}

export default Hero