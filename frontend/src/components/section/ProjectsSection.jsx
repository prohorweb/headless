import React from 'react'
import SectionCard from '../ui/SectionCard'
import PostPreviewCard from '../ui/PostPreviewCard'

export default function ProjectsSection({ posts }) {
  return (
    <SectionCard id="projects" className="!border-[color:var(--border-default)] !bg-[color:var(--bg-section-tint)] !shadow-none">
      <h2 className="text-center text-3xl font-medium text-[color:var(--text-primary)] md:text-4xl">Featured Projects</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">Real posts from your WordPress content API.</p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostPreviewCard key={post.id} post={post} />
        ))}
      </div>
    </SectionCard>
  )
}
