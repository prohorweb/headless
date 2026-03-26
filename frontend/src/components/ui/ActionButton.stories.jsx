import React from 'react'
import ActionButton from './ActionButton'

export default {
  title: 'UI/ActionButton',
  component: ActionButton
}

export const Default = {
  args: { children: 'Primary Action' }
}

export const Hover = {
  args: { children: 'Hover Preview' },
  parameters: { pseudo: { hover: true } }
}

export const Active = {
  args: { children: 'Active Preview' },
  parameters: { pseudo: { active: true } }
}

export const Disabled = {
  args: { children: 'Disabled Preview' },
  render: (args) => <button type="button" disabled className="inline-flex cursor-not-allowed rounded-[var(--radius-pill)] bg-[color:var(--bg-emphasis)] px-4 py-2 text-sm font-semibold text-[color:var(--text-on-emphasis)] opacity-40">{args.children}</button>
}

export const Secondary = {
  args: { children: 'Secondary Action', variant: 'secondary' }
}
