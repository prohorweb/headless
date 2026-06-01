import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PORTFOLIO_HEADER } from '../../lib/graphql/queries'

const nav = [
  { label: 'Home', href: '/#home', type: 'anchor' },
  { label: 'Skills', href: '/#skills', type: 'anchor' },
  { label: 'Experience', href: '/#experience', type: 'anchor' },
  { label: 'Projects', href: '/#projects', type: 'anchor' },
  { label: 'Blog', href: '/blog', type: 'route' },
  { label: 'Contact', href: '/#contact', type: 'anchor' }
]

function IconMenu({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconClose({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function HeaderSection() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data } = useQuery(GET_PORTFOLIO_HEADER)
  const siteName = data?.portfolioSettings?.siteName || 'Portfolio'

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--border-default)] bg-[color:var(--bg-page)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)] md:text-xl"
          onClick={() => setMobileOpen(false)}
        >
          {siteName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {nav.map((item) =>
            item.type === 'route' ? (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="http://localhost:8080/wp-admin"
            target="_blank"
            rel="noreferrer"
            className="rounded-[var(--radius-pill)] bg-[color:var(--bg-emphasis)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-on-emphasis)] transition hover:opacity-90"
          >
            WP Admin
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-default)] text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-muted)] hover:text-[color:var(--text-primary)] md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="border-t border-[color:var(--border-default)] px-4 py-3 sm:px-6 md:hidden" aria-label="Mobile">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-muted)] hover:text-[color:var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-muted)] hover:text-[color:var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="http://localhost:8080/wp-admin"
              target="_blank"
              rel="noreferrer"
              className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[color:var(--accent-primary)]"
            >
              WP Admin
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
