import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

function Card({ children, className = '' }: CardProps) {
  return (
    <article
      className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 ${className}`}
    >
      {children}
    </article>
  )
}

export default Card