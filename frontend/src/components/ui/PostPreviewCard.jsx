import React from 'react'
import { Link } from 'react-router-dom'
import TagChip from './TagChip'

export default function PostPreviewCard({ post }) {
  return (
    <article className="group rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-4 transition hover:border-[color:var(--border-strong)]">
      <div className="aspect-video overflow-hidden rounded-[var(--radius-sm)] bg-gradient-to-br from-slate-800 to-slate-950 transition duration-300 group-hover:scale-[1.02]">
        <div className="h-full w-full bg-gradient-to-t from-[color:var(--bg-surface)]/40 to-transparent" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
        {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
        <Link to={`/post/${post.slug}`} className="transition hover:text-[color:var(--accent-primary)]">
          {post.title || post.slug}
        </Link>
      </h3>
      <div className="mt-2 text-sm text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
      <div className="mt-3 flex flex-wrap gap-2">
        <TagChip label="React" />
        <TagChip label="GraphQL" />
      </div>
      <Link
        to={`/post/${post.slug}`}
        className="mt-3 inline-block rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[color:var(--accent-primary)] transition hover:bg-[color:var(--accent-soft)]"
      >
        View details
      </Link>
    </article>
  )
}
