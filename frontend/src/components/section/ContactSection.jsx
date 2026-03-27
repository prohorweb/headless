import React from 'react'
import SectionCard from '../ui/SectionCard'
import ActionButton from '../ui/ActionButton'

export default function ContactSection({ email, website }) {
  return (
    <SectionCard id="contact">
      <h2 className="text-center text-3xl font-medium text-[color:var(--text-primary)] md:text-4xl">Let&apos;s Work Together</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">
        Reach out to discuss your next product or platform build.
      </p>
      <div className="mx-auto mt-10 grid max-w-4xl gap-12 lg:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-5">
          <p className="text-sm text-[color:var(--text-secondary)]">Email</p>
          <p className="mt-1 text-sm text-[color:var(--text-primary)]">{email}</p>
          <p className="mt-4 text-sm text-[color:var(--text-secondary)]">Website</p>
          <p className="mt-1 text-sm text-[color:var(--text-primary)]">{website}</p>
          <p className="mt-4 text-sm text-[color:var(--text-secondary)]">Location</p>
          <p className="mt-1 text-sm text-[color:var(--text-primary)]">Remote / Europe</p>
        </div>
        <form className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-5">
          <label className="text-xs text-[color:var(--text-muted)]">Name</label>
          <input
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)] focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            placeholder="Your name"
          />
          <label className="mt-3 block text-xs text-[color:var(--text-muted)]">Email</label>
          <input
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)] focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            placeholder="you@example.com"
          />
          <label className="mt-3 block text-xs text-[color:var(--text-muted)]">Message</label>
          <textarea
            className="mt-1 h-24 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)] focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            placeholder="Tell me about your project..."
          />
          <ActionButton className="mt-4">Send Message</ActionButton>
        </form>
      </div>
    </SectionCard>
  )
}
