import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BedDouble, House, Info, LogIn, MapPin, Menu, X } from 'lucide-react'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Stays', to: '/stays', icon: BedDouble },
  { label: 'Destinations', to: '/', icon: MapPin },
  { label: 'About', to: '/', icon: Info },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-slate-900">
            <House className="h-6 w-6 text-brand" />
            <span className="text-lg font-semibold tracking-tight">SohaTravelStay</span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Button variant="ghost">Log in</Button>
            <Button>List your property</Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 xl:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="xl:hidden">
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-slate-900/50"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 z-[70] flex w-80 max-w-[85vw] flex-col bg-white shadow-xl">
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-100 px-4">
              <span className="text-lg font-semibold">Menu</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-3">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-brand" />
                    {link.label}
                  </Link>
                )
              })}
              <button
                type="button"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-slate-50"
              >
                <LogIn className="h-5 w-5 text-brand" />
                Log in
              </button>
            </nav>

            <div className="border-t border-slate-100 p-4">
              <Button className="w-full">List your property</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Navbar