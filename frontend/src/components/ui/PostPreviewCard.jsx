import React from 'react'
import { Link } from 'react-router-dom'

export default function PostPreviewCard({ post }) {
  return (
    <article className="group p-1">
      <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
        <Link to={`/post/${post.slug}`} className="transition hover:text-[color:var(--accent-primary)]">
          {post.title || post.slug}
        </Link>
      </h3>
      <div className="mt-2 text-sm text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
      <Link
        to={`/post/${post.slug}`}
        className="mt-3 inline-block text-xs font-medium text-[color:var(--accent-primary)] transition hover:text-[color:var(--accent-primary-hover)]"
      >
        View details
      </Link>
    </article>
  )
}
