import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { STATIC_PROJECTS_BY_SLUG } from '../data/staticContent'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? STATIC_PROJECTS_BY_SLUG[slug] : null

  if (!project) {
    return <p className="px-4 py-8 text-sm text-[color:var(--text-muted)] sm:px-6 lg:px-8">Project not found.</p>
  }

  return (
    <article className="mx-4 my-8 rounded-[var(--radius-xl)] bg-[color:var(--bg-surface)] p-8 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--border-default)] sm:mx-6 lg:mx-8">
      <Link to="/projects" className="text-sm font-medium text-[color:var(--accent-primary)] hover:underline">
        &larr; Back to projects
      </Link>
      <p className="mt-4 text-xs uppercase tracking-wider text-[color:var(--text-muted)]">
        {project.date ? new Date(project.date).toLocaleDateString() : 'No date'} - {project.slug}
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-[color:var(--text-primary)]">{project.title || project.slug}</h1>
      <div className="post-content mt-8 space-y-5 leading-8 text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: project.content }} />
    </article>
  )
}
