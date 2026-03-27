import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_SLUG } from '../lib/graphql/queries'
import { proxiedMediaSrc } from '../lib/mediaUrl'

export default function PostDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, { variables: { slug } })

  if (loading) return <p className="px-4 py-8 text-sm text-[color:var(--text-muted)]">Loading post…</p>
  if (error) return <p className="px-4 py-8 text-sm text-red-400">{error.message}</p>

  const post = data?.post
  if (!post) return <p className="px-4 py-8 text-sm text-[color:var(--text-muted)]">Post not found.</p>

  const hero = post.featuredImage?.node?.sourceUrl
    ? proxiedMediaSrc(post.featuredImage.node.sourceUrl)
    : null

  return (
    <article className="mx-4 my-8 p-8 sm:mx-6 lg:mx-8">
      <Link to="/blog" className="text-sm font-medium text-[color:var(--accent-primary)] hover:underline">
        &larr; Back to posts
      </Link>
      {hero ? (
        <img src={hero} alt="" className="mt-6 max-h-72 w-full rounded-[var(--radius-md)] object-cover" />
      ) : null}
      <p className="mt-4 text-xs uppercase tracking-wider text-[color:var(--text-muted)]">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'} — {post.slug}
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-[color:var(--text-primary)]">
        {post.title || post.slug}
      </h1>
      <div
        className="post-content mt-8 space-y-5 leading-8 text-[color:var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
