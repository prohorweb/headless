import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">Engineer Portfolio</Link>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden text-sm text-slate-600 hover:text-slate-900 md:inline">Contact</a>
            <a
              href="http://localhost:8080/wp-admin"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
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
