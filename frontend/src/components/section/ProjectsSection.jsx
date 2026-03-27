import React from 'react'
import { Link } from 'react-router-dom'
import SectionCard from '../ui/SectionCard'
import ProjectPreviewCard from '../ui/ProjectPreviewCard'

export default function ProjectsSection({ projects }) {
  return (
    <SectionCard id="projects">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-medium text-[color:var(--text-primary)] md:text-4xl">Featured Projects</h2>
        <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">Selected projects with implementation details and delivery outcomes.</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectPreviewCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-5 py-2.5 text-sm font-medium text-[color:var(--text-primary)] transition hover:bg-[color:var(--bg-muted)]"
          >
            View all projects
          </Link>
        </div>
      </div>
    </SectionCard>
  )
}
