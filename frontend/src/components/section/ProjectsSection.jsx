import React from 'react'
import SectionCard from '../ui/SectionCard'
import PostPreviewCard from '../ui/PostPreviewCard'

export default function ProjectsSection({ posts }) {
  return (
    <SectionCard id="projects">
      <h2 className="text-center text-3xl font-semibold text-[color:var(--text-primary)]">Featured Projects</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">Real posts from your WordPress content API.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {posts.map((post) => <PostPreviewCard key={post.id} post={post} />)}
      </div>
    </SectionCard>
  )
}
