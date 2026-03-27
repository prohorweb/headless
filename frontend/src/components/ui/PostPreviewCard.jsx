import React from 'react'
import { Link } from 'react-router-dom'
import { proxiedMediaSrc } from '../../lib/mediaUrl'

export default function PostPreviewCard({ post }) {
  const img = post.featuredImage?.node?.sourceUrl
    ? proxiedMediaSrc(post.featuredImage.node.sourceUrl)
    : null

  return (
    <article className="group p-1">
      {img ? (
        <div className="mb-3 aspect-video overflow-hidden rounded-[var(--radius-sm)]">
          <img src={img} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        </div>
      ) : null}
      <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
        <Link to={`/post/${post.slug}`} className="transition hover:text-[color:var(--accent-primary)]">
          {post.title || post.slug}
        </Link>
      </h3>
      <div
        className="mt-2 text-sm text-[color:var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
      />
      <Link
        to={`/post/${post.slug}`}
        className="mt-3 inline-block text-xs font-medium text-[color:var(--accent-primary)] transition hover:text-[color:var(--accent-primary-hover)]"
      >
        View details
      </Link>
    </article>
  )
}
