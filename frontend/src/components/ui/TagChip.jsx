import React from 'react'

export default function TagChip({ label }) {
  return (
    <span className="rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-2.5 py-1 text-[11px] text-[color:var(--text-secondary)]">
      {label}
    </span>
  )
}
