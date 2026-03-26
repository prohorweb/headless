import React from 'react'

export default function SectionCard({ id, className = '', children }) {
  const classes = `rounded-[var(--radius-xl)] border border-[color:var(--border-default)] bg-[color:var(--bg-surface)] p-[var(--section-pad-mobile)] shadow-[var(--shadow-card)] md:p-[var(--section-pad-desktop)] ${className}`.trim()
  return (
    <section id={id} className={classes}>
      {children}
    </section>
  )
}
