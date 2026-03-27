import React from 'react'
import SectionCard from '../ui/SectionCard'
import ActionButton from '../ui/ActionButton'

export default function HeroSection({ name, subtitle }) {
  return (
    <SectionCard className="hero-section relative min-h-[min(100vh,52rem)] overflow-hidden border-[color:var(--border-default)] bg-gradient-to-br from-[color:var(--bg-page)] via-[color:var(--bg-surface)] to-[color:var(--hero-gradient-end)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-[color:var(--accent-primary)] blur-3xl" />
        <div className="absolute bottom-[20%] right-[5%] h-40 w-40 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      </div>
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr,1fr] lg:gap-x-20">
        <div>
          <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[color:var(--hero-badge-border)] bg-[color:var(--hero-badge-bg)] px-3 py-1 text-xs font-medium text-[color:var(--accent-primary)]">
            Available for full-time roles
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl xl:text-7xl">
            Hello, I&apos;m
            <br />
            {name}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-[color:var(--text-secondary)]">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton href="#contact" className="px-8 py-3">Download CV</ActionButton>
            <ActionButton href="#projects" variant="secondary" className="px-8 py-3">
              View My Work
            </ActionButton>
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
        <div className="flex justify-center lg:justify-end">
          <div className="group relative">
            <div className="h-64 w-64 rounded-full border-4 border-[color:var(--border-strong)] bg-[radial-gradient(circle_at_30%_30%,#27272a_0%,#1e3a5f_42%,#0f172a_78%,#0a0a0b_100%)] shadow-2xl transition duration-300 group-hover:scale-105 md:h-72 md:w-72 lg:h-96 lg:w-96" />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-pill)] border border-[color:var(--border-default)] bg-[color:var(--bg-surface)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
              Available for hire
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
