import React from 'react'
import { useQuery } from '@apollo/client'
import PostPreviewCard from '../components/ui/PostPreviewCard'
import { GET_POSTS } from '../lib/graphql/queries'

export default function Blog() {
  const { data, loading, error } = useQuery(GET_POSTS)

  if (loading) {
    return <p className="px-4 py-12 text-sm text-[color:var(--text-muted)]">Loading posts…</p>
  }
  if (error) {
    return <p className="px-4 py-12 text-sm text-red-400">{error.message}</p>
  }

  const nodes = data?.posts?.nodes || []

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl">Blog</h1>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">All posts from WordPress.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {nodes.map((post) => (
            <PostPreviewCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
