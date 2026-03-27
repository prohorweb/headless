import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PROJECT_BY_SLUG } from '../lib/graphql/queries'
import { proxiedMediaSrc } from '../lib/mediaUrl'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_PROJECT_BY_SLUG, { variables: { slug } })

  if (loading) return <p className="px-4 py-8 text-sm text-[color:var(--text-muted)]">Loading project…</p>
  if (error) return <p className="px-4 py-8 text-sm text-red-400">{error.message}</p>

  const project = data?.project
  if (!project) {
    return <p className="px-4 py-8 text-sm text-[color:var(--text-muted)] sm:px-6 lg:px-8">Project not found.</p>
  }

  const hero = project.featuredImage?.node?.sourceUrl
    ? proxiedMediaSrc(project.featuredImage.node.sourceUrl)
    : null

  return (
    <article className="mx-4 my-8 rounded-[var(--radius-xl)] bg-[color:var(--bg-surface)] p-8 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--border-default)] sm:mx-6 lg:mx-8">
      <Link to="/projects" className="text-sm font-medium text-[color:var(--accent-primary)] hover:underline">
        &larr; Back to projects
      </Link>
      {hero ? (
        <img src={hero} alt="" className="mt-6 max-h-72 w-full rounded-[var(--radius-md)] object-cover" />
      ) : null}
      <p className="mt-4 text-xs uppercase tracking-wider text-[color:var(--text-muted)]">
        {project.date ? new Date(project.date).toLocaleDateString() : 'No date'} — {project.slug}
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-[color:var(--text-primary)]">
        {project.title || project.slug}
      </h1>
      {project.excerpt ? (
        <div
          className="mt-4 text-[color:var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: project.excerpt }}
        />
      ) : null}
      <div
        className="post-content mt-8 space-y-5 leading-8 text-[color:var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </article>
  )
}
