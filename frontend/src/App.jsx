import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Projects from './pages/Projects'
import PostDetail from './pages/PostDetail'
import ProjectDetail from './pages/ProjectDetail'
import HeaderSection from './components/section/HeaderSection'
import FooterSection from './components/section/FooterSection'

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-page)] text-[color:var(--text-primary)]">
      <HeaderSection />
      <main className="mx-auto max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Routes>
      </main>
      <FooterSection />
    </div>
  )
}
