import React from 'react'
import SectionCard from '../ui/SectionCard'
import TagChip from '../ui/TagChip'

export default function ExperienceSection({ items = [] }) {
  if (!items.length) {
    return null
  }

  return (
    <SectionCard id="experience">
      <h2 className="text-center text-3xl font-semibold text-[color:var(--text-primary)]">Professional Experience</h2>
      <div className="mt-6 space-y-4">
        {items.map((row) => (
          <article
            key={`${row.role}-${row.period}`}
            className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{row.role}</h3>
              <span className="text-xs text-[color:var(--text-muted)]">{row.period}</span>
            </div>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
              {row.company} - {row.location}
            </p>
            <p className="mt-3 text-sm text-[color:var(--text-secondary)]">{row.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(row.tags || []).map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}
