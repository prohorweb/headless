import React from 'react'
import SectionCard from '../ui/SectionCard'
import ActionButton from '../ui/ActionButton'

function IconSparkles({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

function IconDownload({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function IconChevronDown({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function SocialIconButton({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[color:rgba(255,255,255,0.04)] text-[color:var(--text-primary)] backdrop-blur-sm transition hover:border-[color:var(--border-strong)] hover:bg-[color:rgba(255,255,255,0.08)]"
    >
      {children}
    </a>
  )
}

export default function HeroSection({ badge, headlinePrefix, name, subtitle }) {
  return (
    <SectionCard
      id="home"
      className="hero-section relative overflow-hidden border-[color:var(--border-default)] bg-gradient-to-br from-[color:var(--bg-page)] via-[color:var(--bg-surface)] to-[color:var(--hero-gradient-end)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-[color:var(--accent-primary)] blur-3xl" />
        <div className="absolute bottom-[20%] right-[5%] h-40 w-40 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      </div>

      {/* Two-column hero: mobile = image first, then copy */}
      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
        <div className="order-2 flex flex-col lg:order-1">
          <span className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--hero-badge-border)] bg-[color:var(--hero-badge-bg)] px-3 py-1.5 text-xs font-medium text-[color:var(--accent-primary)]">
            <IconSparkles />
            {badge}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl xl:text-7xl">
            {headlinePrefix} {name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--bg-emphasis)] px-8 py-3 text-sm font-semibold text-[color:var(--text-on-emphasis)] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-page)]"
            >
              <IconDownload />
              Download Resume
            </a>
            <ActionButton href="#projects" variant="secondary" className="px-8 py-3">
              View My Work
            </ActionButton>
          </div>

          <div className="mt-8 flex gap-3">
            <SocialIconButton href="https://github.com" label="GitHub">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </SocialIconButton>
            <SocialIconButton href="https://linkedin.com" label="LinkedIn">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialIconButton>
            <SocialIconButton href="mailto:hello@example.com" label="Email">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </SocialIconButton>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="group relative">
            <div className="h-72 w-72 rounded-full border-4 border-[color:var(--border-strong)] bg-[radial-gradient(circle_at_30%_30%,#262626_0%,#1e3a5f_38%,#0f172a_72%,#000000_100%)] shadow-2xl transition duration-300 group-hover:scale-[1.02] sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
            <span className="absolute -bottom-1 -right-2 flex max-w-[calc(100%-1rem)] items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-default)] bg-[color:var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-secondary)] shadow-lg sm:-bottom-2 sm:-right-4">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--status-online)]" aria-hidden />
              Available for hire
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue — full width below the two columns */}
      <div className="relative mt-14 flex flex-col items-center sm:mt-16 lg:mt-20">
        <p className="text-sm text-[color:var(--text-muted)]">Scroll to explore</p>
        <IconChevronDown className="mt-2 animate-bounce text-[color:var(--text-muted)]" />
      </div>

      {/* Stats — three columns, separate from hero text */}
      <div className="relative mt-10 grid w-full max-w-3xl grid-cols-3 gap-4 sm:mx-auto sm:gap-8 lg:mt-12">
        <div className="text-center">
          <p className="text-2xl font-bold tabular-nums text-[color:var(--text-primary)] sm:text-3xl md:text-4xl">50+</p>
          <p className="mt-1 text-xs text-[color:var(--text-muted)] sm:text-sm">Projects</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold tabular-nums text-[color:var(--text-primary)] sm:text-3xl md:text-4xl">5+</p>
          <p className="mt-1 text-xs text-[color:var(--text-muted)] sm:text-sm">Years Exp</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold tabular-nums text-[color:var(--text-primary)] sm:text-3xl md:text-4xl">100%</p>
          <p className="mt-1 text-xs text-[color:var(--text-muted)] sm:text-sm">Client Satisfaction</p>
        </div>
      </div>
    </SectionCard>
  )
}
