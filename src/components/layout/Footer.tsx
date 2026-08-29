import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { House } from 'lucide-react'
import Button from '../ui/Button'

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/about' },
  { label: 'Contact', to: '/about#contact' },
]

const exploreLinks = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Stays', to: '/stays' },
  { label: 'Travel guide', to: '/destinations' },
]

const supportLinks = [
  { label: 'Help center', to: '/' },
  { label: 'Cancellation', to: '/' },
  { label: 'Privacy', to: '/' },
]

function Footer() {
  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <House className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">SohaTravelStay</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6">
            Your journey starts here.
          </p>
          
          <div className="mt-5 flex items-center gap-3">
  <a href="#" className="rounded-full p-2 hover:bg-white/10 hover:text-white" aria-label="Facebook">
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  </a>
  <a href="#" className="rounded-full p-2 hover:bg-white/10 hover:text-white" aria-label="Twitter">
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M19.4 7.5c.6-.4 1.1-1 1.4-1.6-.6.3-1.2.5-1.9.6A3.1 3.1 0 0 0 13 9.6 8.8 8.8 0 0 1 6 6.2a3.1 3.1 0 0 0 1 4.2 3 3 0 0 1-1.4-.4v.1a3.1 3.1 0 0 0 2.5 3 3.1 3.1 0 0 1-1.4.1 3.1 3.1 0 0 0 2.9 2.2A6.2 6.2 0 0 1 5 16.6 8.8 8.8 0 0 0 9.8 18c5.7 0 8.9-4.8 8.9-8.9v-.4c.6-.4 1.1-1 1.5-1.6-.6.3-1.2.5-1.8.6Z" />
    </svg>
  </a>
  <a href="#" className="rounded-full p-2 hover:bg-white/10 hover:text-white" aria-label="Instagram">
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm8 1.5H8A2.5 2.5 0 0 0 5.5 8v8A2.5 2.5 0 0 0 8 18.5h8a2.5 2.5 0 0 0 2.5-2.5V8A2.5 2.5 0 0 0 16 5.5ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5-1.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z" />
    </svg>
  </a>
</div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Support</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              New stays and travel ideas, once a week.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Email address"
              className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 SohaTravelStay. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-white">Terms</Link>
            <Link to="/" className="hover:text-white">Privacy</Link>
            <Link to="/" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer