import React from 'react'
import SectionCard from '../ui/SectionCard'
import TagChip from '../ui/TagChip'

export default function SkillsSection({ skillGroups }) {
  return (
    <SectionCard className="!border-[color:var(--border-default)] !bg-[color:var(--bg-section-tint)] !shadow-none">
      <h2 className="text-center text-3xl font-medium text-[color:var(--text-primary)] md:text-4xl">Technical Skills</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">
        Comprehensive stack for production-grade web products.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-surface)] p-4"
          >
            <h3 className="text-sm font-medium text-[color:var(--text-primary)]">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.tags.filter(Boolean).map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}
