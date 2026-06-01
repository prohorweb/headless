import React from 'react'

export default function SectionCard({ id, className = '', children }) {
  const classes = `w-full px-4 py-20 sm:px-6 lg:px-8 ${className}`.trim()
  return (
    <section id={id} className={classes}>
      {children}
    </section>
  )
}
