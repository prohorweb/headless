import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import { STATIC_SITE_NAME } from './data/staticContent'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
]

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-page)] text-[color:var(--text-primary)]">
      <header className="sticky top-0 z-10 border-b border-[color:var(--border-default)] bg-[color:var(--bg-page)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)] md:text-xl">
            {STATIC_SITE_NAME}
          </Link>
          <nav className="hidden items-center gap-1 md:flex md:gap-6" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-default)] text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-muted)] hover:text-[color:var(--text-primary)]"
              aria-label="Theme (dark mode active)"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <a
              href="http://localhost:8080/wp-admin"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-muted)] sm:inline-block"
            >
              WP Admin
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
  )
}
