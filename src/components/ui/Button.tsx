import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  form?: string
  onClick?: () => void
}

function Button({
  children,
  variant = 'primary',
  className = '',
    type = 'button',
  form,
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition'
  const variants = {
    primary: 'bg-brand text-white hover:bg-blue-700',
    ghost: 'text-slate-600 hover:text-slate-900',
  }

  return (
    <button
  type={type}
  form={form}
  onClick={onClick}
  className={`${base} ${variants[variant]} ${className}`}
>
      {children}
    </button>
  )
}

export default Button