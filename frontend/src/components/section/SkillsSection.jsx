import React from 'react'
import SectionCard from '../ui/SectionCard'
import TagChip from '../ui/TagChip'

export default function SkillsSection({ skillGroups }) {
  return (
    <SectionCard>
      <h2 className="text-center text-3xl font-semibold text-slate-900">Technical Skills</h2>
      <p className="mt-2 text-center text-sm text-slate-500">Comprehensive stack for production-grade web products.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}
