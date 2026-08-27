import { BadgeCheck, CalendarCheck, CircleDollarSign } from 'lucide-react'

const items = [
  {
    number: '01',
    title: 'Verified stays',
    description: 'Every property is reviewed and verified.',
    icon: BadgeCheck,
  },
  {
    number: '02',
    title: 'Best prices',
    description: 'Find great places without overpaying.',
    icon: CircleDollarSign,
  },
  {
    number: '03',
    title: 'Easy booking',
    description: 'Simple and secure booking experience.',
    icon: CalendarCheck,
  },
]

function ValueProps() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="max-w-xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Everything you need for a better stay
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.number} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-brand">
                    {item.number}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ValueProps