import React from 'react'

export default function SectionCard({ id, className = '', children }) {
  const classes = `rounded-3xl border border-slate-200 bg-white p-7 md:p-10 ${className}`.trim()
  return (
    <section id={id} className={classes}>
      {children}
    </section>
  )
}
