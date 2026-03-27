import React from 'react'
import ProjectPreviewCard from '../components/ui/ProjectPreviewCard'
import { STATIC_PROJECTS } from '../data/staticContent'

export default function Projects() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl">Projects</h1>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">
          Full list of project case studies from the static demo dataset.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {STATIC_PROJECTS.map((project) => (
            <ProjectPreviewCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
