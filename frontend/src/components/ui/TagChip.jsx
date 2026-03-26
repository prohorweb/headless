import React from 'react'

export default function TagChip({ label }) {
  return (
    <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">
      {label}
    </span>
  )
}
