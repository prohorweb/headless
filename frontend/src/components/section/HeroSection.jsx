import React from 'react'
import SectionCard from '../ui/SectionCard'
import ActionButton from '../ui/ActionButton'

export default function HeroSection({ name, subtitle }) {
  return (
    <SectionCard className="hero-section">
      <div className="grid items-center gap-8 md:grid-cols-[1.2fr,1fr]">
        <div>
          <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--bg-muted)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
            Available for full-time roles
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-[color:var(--text-primary)] md:text-6xl">
            Hello, I&apos;m
            <br />
            {name}
          </h1>
          <p className="mt-4 max-w-lg text-[color:var(--text-secondary)]">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton href="#contact" className="px-5 py-2.5">Download CV</ActionButton>
            <ActionButton href="#projects" variant="secondary" className="px-5 py-2.5">View My Work</ActionButton>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-3">
            <div className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-3">
              <p className="text-lg font-semibold text-[color:var(--text-primary)]">50+</p>
              <p className="text-xs text-[color:var(--text-muted)]">Projects</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-3">
              <p className="text-lg font-semibold text-[color:var(--text-primary)]">5+</p>
              <p className="text-xs text-[color:var(--text-muted)]">Years</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-3">
              <p className="text-lg font-semibold text-[color:var(--text-primary)]">100%</p>
              <p className="text-xs text-[color:var(--text-muted)]">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="h-64 w-64 rounded-full border border-[color:var(--border-strong)] bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#eff6ff_42%,#bfdbfe_75%,#93c5fd_100%)] md:h-72 md:w-72" />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
              Available for hire
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
