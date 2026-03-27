import React from 'react'
import { Link } from 'react-router-dom'
import TagChip from './TagChip'
import { proxiedMediaSrc } from '../../lib/mediaUrl'

export default function PostPreviewCard({ post, linkBase = '/post', tagLabels = ['React', 'GraphQL'] }) {
  const img = post.featuredImage?.node?.sourceUrl
    ? proxiedMediaSrc(post.featuredImage.node.sourceUrl)
    : post.imageUrl
      ? proxiedMediaSrc(post.imageUrl)
      : null
  const alt = post.featuredImage?.node?.altText || post.title || ''

  return (
    <article className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-4">
      {img ? (
        <img src={img} alt={alt} className="h-32 w-full rounded-[var(--radius-sm)] object-cover" />
      ) : (
        <div className="h-32 rounded-[var(--radius-sm)] bg-gradient-to-br from-blue-100 to-slate-200" />
      )}
      <p className="mt-3 text-xs uppercase text-[color:var(--text-muted)]">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
        <Link
          to={`${linkBase}/${post.slug}`}
          className="transition hover:text-[color:var(--accent-primary)]"
        >
          {post.title || post.slug}
        </Link>
      </h3>
      <div
        className="mt-2 text-sm text-[color:var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {tagLabels.map((label, i) => (
          <TagChip key={`${label}-${i}`} label={label} />
        ))}
      </div>
      <Link
        to={`${linkBase}/${post.slug}`}
        className="mt-3 inline-block rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[color:var(--accent-primary)] transition hover:bg-[color:var(--accent-soft)]"
      >
        View details
      </Link>
    </article>
  )
}
