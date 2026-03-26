import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_SLUG } from '../lib/graphql/queries'

export default function PostDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, { variables: { slug } })

  if (loading) return <p className="text-sm text-slate-500">Loading post...</p>
  if (error) return <p className="text-sm text-red-600">Error: {error.message}</p>

  const post = data?.postBy
  if (!post) return <p className="text-sm text-slate-500">Post not found.</p>

  return (
    <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <Link to="/" className="text-sm font-medium text-indigo-600 hover:underline">
        &larr; Back to posts
      </Link>
      <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'} - {post.slug}
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-slate-900">{post.title || post.slug}</h1>
      <div className="post-content mt-8 space-y-5 leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
