import React from 'react'

export default function ActionButton({ href, to, variant = 'primary', className = '', children }) {
  const baseClass = 'inline-flex rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]'
  const variantClass = variant === 'secondary'
    ? 'border border-[color:var(--border-strong)] text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-muted)]'
    : 'bg-[color:var(--bg-emphasis)] text-[color:var(--text-on-emphasis)] hover:bg-[color:var(--accent-primary-hover)]'
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
    <button type="button" className={classes}>
      {children}
    </button>
  )
}
