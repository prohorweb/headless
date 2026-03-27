import React from 'react'
import { Link } from 'react-router-dom'
import SectionCard from '../ui/SectionCard'
import PostPreviewCard from '../ui/PostPreviewCard'

export default function BlogSection({ posts }) {
  return (
    <SectionCard id="blog">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-medium text-[color:var(--text-primary)] md:text-4xl">Latest Blog Posts</h2>
        <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">
          Notes from engineering practice, delivery, and product thinking.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostPreviewCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-2 py-1 text-sm font-medium text-[color:var(--accent-primary)] transition hover:text-[color:var(--accent-primary-hover)]"
          >
            View all posts
          </Link>
        </div>
      </div>
    </SectionCard>
  )
}
