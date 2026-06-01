import React from 'react'

export default function ActionButton({
  href,
  to,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled,
  children
}) {
  const baseClass =
    'inline-flex items-center justify-center rounded-[var(--radius-pill)] text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-page)]'
  const variantClass =
    variant === 'secondary'
      ? 'border border-[color:var(--border-strong)] bg-[color:rgba(255,255,255,0.04)] text-[color:var(--text-primary)] backdrop-blur-sm hover:bg-[color:rgba(255,255,255,0.08)]'
      : 'bg-[color:var(--bg-emphasis)] text-[color:var(--text-on-emphasis)] hover:opacity-90'
  const classes = `${baseClass} ${variantClass} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <a href={to} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
