import React from 'react'

export default function FooterSection({ siteName = 'Portfolio' }) {
  return (
    <footer className="pb-5 pt-1 text-center text-xs text-[color:var(--text-muted)]">
      <p>
        2026 {siteName}. Built with React and WordPress GraphQL.
      </p>
    </footer>
  )
}
