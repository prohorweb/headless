import React from 'react'
import SectionCard from '../ui/SectionCard'
import TagChip from '../ui/TagChip'

const EXPERIENCE_ITEMS = [
  ['Senior Software Engineer', 'Tech Company', '2023 - Present', 'Remote', 'Led headless transformation, improved deployment speed and API consistency across teams.'],
  ['Full Stack Developer', 'Digital Product Studio', '2021 - 2023', 'New York, NY', 'Built high-performance React platforms and CMS integrations for enterprise clients.'],
  ['Software Developer', 'Startup', '2019 - 2021', 'San Francisco, CA', 'Delivered MVPs and scaled architecture from prototype to production.']
]

export default function ExperienceSection() {
  return (
    <SectionCard id="experience">
      <h2 className="text-center text-3xl font-semibold text-slate-900">Professional Experience</h2>
      <div className="mt-6 space-y-4">
        {EXPERIENCE_ITEMS.map(([role, company, period, location, text]) => (
          <article key={role} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{role}</h3>
              <span className="text-xs text-slate-500">{period}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{company} - {location}</p>
            <p className="mt-3 text-sm text-slate-600">{text}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <TagChip label="React" />
              <TagChip label="GraphQL" />
              <TagChip label="WordPress" />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}
