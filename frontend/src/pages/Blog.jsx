import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../lib/graphql/queries'
import PostPreviewCard from '../components/ui/PostPreviewCard'

export default function Blog() {
  const { data, loading, error } = useQuery(GET_POSTS)

  if (loading) return <p className="text-sm text-[color:var(--text-muted)]">Loading posts…</p>
  if (error) return <p className="text-sm text-red-600">{error.message}</p>

  const nodes = data?.posts?.nodes || []

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[color:var(--text-primary)]">Blog</h1>
      <p className="mt-2 text-sm text-[color:var(--text-muted)]">All posts from WordPress.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {nodes.map((post) => (
          <PostPreviewCard key={post.id} post={post} linkBase="/post" />
        ))}
      </div>
    </div>
  )
}
