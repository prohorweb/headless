import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-page)] text-[color:var(--text-primary)]">
      <header className="sticky top-0 z-10 border-b border-[color:var(--border-default)] bg-[color:var(--bg-surface)]/85 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)] md:text-xl">Engineer Portfolio</Link>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)] md:inline">Contact</a>
            <a
              href="http://localhost:8080/wp-admin"
              target="_blank"
              rel="noreferrer"
              className="rounded-[var(--radius-pill)] bg-[color:var(--bg-emphasis)] px-4 py-2 text-sm font-medium text-[color:var(--text-on-emphasis)] transition hover:bg-[color:var(--accent-primary-hover)]"
            >
              Open WP Admin
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
  )
}
