import React from 'react'
import { useQuery } from '@apollo/client'
import ProjectPreviewCard from '../components/ui/ProjectPreviewCard'
import { GET_PROJECTS } from '../lib/graphql/queries'

export default function Projects() {
  const { data, loading, error } = useQuery(GET_PROJECTS)

  if (loading) {
    return <p className="px-4 py-12 text-sm text-[color:var(--text-muted)]">Loading projects…</p>
  }
  if (error) {
    return <p className="px-4 py-12 text-sm text-red-400">{error.message}</p>
  }

  const nodes = data?.projects?.nodes || []

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl">Projects</h1>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">Portfolio entries from WordPress (CPT project).</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {nodes.map((project) => (
            <ProjectPreviewCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
