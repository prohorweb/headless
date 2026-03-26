import React from 'react'
import TagChip from './TagChip'

export default {
  title: 'UI/TagChip',
  component: TagChip
}

export const Default = {
  args: { label: 'React' }
}

export const Selected = {
  args: { label: 'GraphQL' },
  render: (args) => (
    <span className="inline-block rounded-[var(--radius-pill)] bg-[color:var(--accent-soft)] p-1">
      <TagChip {...args} />
    </span>
  )
}

export const LongLabel = {
  args: { label: 'Headless WordPress Architecture' }
}

export const Disabled = {
  args: { label: 'Deprecated' },
  render: (args) => (
    <span className="opacity-50">
      <TagChip {...args} />
    </span>
  )
}
