import React from 'react'
import PostPreviewCard from '../components/ui/PostPreviewCard'
import { STATIC_BLOG_POSTS } from '../data/staticContent'

export default function Blog() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl">Blog</h1>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">
          All posts from the static demo dataset.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {STATIC_BLOG_POSTS.map((post) => (
            <PostPreviewCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
