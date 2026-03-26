import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#05070c]/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white md:text-xl">Engineer Portfolio</Link>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden text-sm text-slate-400 hover:text-white md:inline">Contact</a>
            <a
              href="http://localhost:8080/wp-admin"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-white/40"
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
