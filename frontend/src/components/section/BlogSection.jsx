import React from 'react'
import SectionCard from '../ui/SectionCard'
import PostPreviewCard from '../ui/PostPreviewCard'

export default function BlogSection({ posts = [] }) {
  return (
    <SectionCard id="blog">
      <h2 className="text-center text-3xl font-semibold text-[color:var(--text-primary)]">Latest from the blog</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">WordPress posts via GraphQL.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <PostPreviewCard key={post.id} post={post} linkBase="/post" />
        ))}
      </div>
    </SectionCard>
  )
}
