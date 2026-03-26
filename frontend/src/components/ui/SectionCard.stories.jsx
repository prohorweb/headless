import React from 'react'
import SectionCard from './SectionCard'

export default {
  title: 'UI/SectionCard',
  component: SectionCard
}

export const Default = {
  args: {
    children: (
      <div className="w-[320px]">
        <h3 className="text-lg font-semibold">Card title</h3>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Default state for reusable section wrapper.</p>
      </div>
    )
  }
}

export const WithTitle = {
  args: {
    children: (
      <div className="w-[380px]">
        <p className="text-xs uppercase text-[color:var(--text-muted)]">Overview</p>
        <h3 className="mt-2 text-2xl font-semibold">Section heading</h3>
      </div>
    )
  }
}

export const Mobile = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    children: <p className="w-[240px] text-sm text-[color:var(--text-secondary)]">Mobile card spacing preview.</p>
  }
}
