import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_SLUG } from '../lib/graphql/queries'

export default function PostDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, { variables: { slug } })

  if (loading) return <p className="text-sm text-[color:var(--text-muted)]">Loading post...</p>
  if (error) return <p className="text-sm text-red-600">Error: {error.message}</p>

  const post = data?.postBy
  if (!post) return <p className="text-sm text-[color:var(--text-muted)]">Post not found.</p>

  return (
    <article className="rounded-[var(--radius-xl)] bg-[color:var(--bg-surface)] p-8 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--border-default)]">
      <Link to="/" className="text-sm font-medium text-[color:var(--accent-primary)] hover:underline">
        &larr; Back to posts
      </Link>
      <p className="mt-4 text-xs uppercase tracking-wider text-[color:var(--text-muted)]">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'} - {post.slug}
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-[color:var(--text-primary)]">{post.title || post.slug}</h1>
      <div className="post-content mt-8 space-y-5 leading-8 text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
