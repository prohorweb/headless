import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Projects from './pages/Projects'
import PostDetail from './pages/PostDetail'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-page)] text-[color:var(--text-primary)]">
      <header className="sticky top-0 z-10 border-b border-[color:var(--border-default)] bg-[color:var(--bg-surface)]/85 backdrop-blur">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)] md:text-xl">
            Engineer Portfolio
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link to="/projects" className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]">
              Projects
            </Link>
            <Link to="/blog" className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]">
              Blog
            </Link>
            <a
              href="#contact"
              className="hidden text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)] md:inline"
            >
              Contact
            </a>
            <a
              href="http://localhost:8080/wp-admin"
              target="_blank"
              rel="noreferrer"
              className="rounded-[var(--radius-pill)] bg-[color:var(--bg-emphasis)] px-4 py-2 font-medium text-[color:var(--text-on-emphasis)] transition hover:bg-[color:var(--accent-primary-hover)]"
            >
              WP Admin
            </a>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  )
}
