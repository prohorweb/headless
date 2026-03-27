import React from 'react'
import SectionCard from '../ui/SectionCard'
import PostPreviewCard from '../ui/PostPreviewCard'

export default function ProjectsSection({ projects = [] }) {
  return (
    <SectionCard id="projects">
      <h2 className="text-center text-3xl font-semibold text-[color:var(--text-primary)]">Featured Projects</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">From WordPress project entries (CPT).</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((post) => (
          <PostPreviewCard key={post.id} post={post} linkBase="/project" tagLabels={['WordPress', 'React']} />
        ))}
      </div>
    </SectionCard>
  )
}
