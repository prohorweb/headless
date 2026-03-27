import React from 'react'
import { Link } from 'react-router-dom'
import TagChip from './TagChip'
import { proxiedMediaSrc } from '../../lib/mediaUrl'

export default function ProjectPreviewCard({ project }) {
  const img = project.featuredImage?.node?.sourceUrl
    ? proxiedMediaSrc(project.featuredImage.node.sourceUrl)
    : null

  return (
    <article className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-4 transition hover:border-[color:var(--border-strong)]">
      <div className="aspect-video overflow-hidden rounded-[var(--radius-sm)] bg-gradient-to-br from-slate-700 to-slate-950 transition duration-300">
        {img ? (
          <img src={img} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-t from-[color:var(--bg-surface)]/40 to-transparent" />
        )}
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
        {project.date ? new Date(project.date).toLocaleDateString() : 'No date'}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
        <Link to={`/project/${project.slug}`} className="transition hover:text-[color:var(--accent-primary)]">
          {project.title || project.slug}
        </Link>
      </h3>
      <div
        className="mt-2 text-sm text-[color:var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: project.excerpt || '' }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <TagChip label="Project" />
        <TagChip label="Case Study" />
      </div>
      <Link
        to={`/project/${project.slug}`}
        className="mt-3 inline-block rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[color:var(--accent-primary)] transition hover:bg-[color:var(--accent-soft)]"
      >
        View details
      </Link>
    </article>
  )
}
