import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import SectionCard from '../ui/SectionCard'
import ActionButton from '../ui/ActionButton'
import { SUBMIT_CONTACT } from '../../lib/graphql/mutations'

export default function ContactSection({ email, website, location }) {
  const [name, setName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitContact, { loading, data, error }] = useMutation(SUBMIT_CONTACT, {
    onCompleted(res) {
      if (res?.submitContact?.success) {
        setName('')
        setFormEmail('')
        setMessage('')
      }
    }
  })

  async function handleSubmit(e) {
    e.preventDefault()
    await submitContact({
      variables: {
        input: {
          name,
          email: formEmail,
          message
        }
      }
    })
  }

  const feedback = data?.submitContact?.message
  const ok = data?.submitContact?.success

  return (
    <SectionCard id="contact">
      <h2 className="text-center text-3xl font-semibold text-[color:var(--text-primary)]">Let&apos;s Work Together</h2>
      <p className="mt-2 text-center text-sm text-[color:var(--text-muted)]">
        Reach out to discuss your next product or platform build.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-5">
          <p className="text-sm text-[color:var(--text-secondary)]">Email</p>
          <p className="mt-1 text-sm text-[color:var(--text-primary)]">{email}</p>
          <p className="mt-4 text-sm text-[color:var(--text-secondary)]">Website</p>
          <p className="mt-1 text-sm text-[color:var(--text-primary)]">{website}</p>
          <p className="mt-4 text-sm text-[color:var(--text-secondary)]">Location</p>
          <p className="mt-1 text-sm text-[color:var(--text-primary)]">{location}</p>
        </div>
        <form className="rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--bg-muted)] p-5" onSubmit={handleSubmit}>
          <label className="text-xs text-[color:var(--text-muted)]">Name</label>
          <input
            required
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            placeholder="Your name"
          />
          <label className="mt-3 block text-xs text-[color:var(--text-muted)]">Email</label>
          <input
            required
            type="email"
            value={formEmail}
            onChange={(ev) => setFormEmail(ev.target.value)}
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            placeholder="you@example.com"
          />
          <label className="mt-3 block text-xs text-[color:var(--text-muted)]">Message</label>
          <textarea
            required
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            className="mt-1 h-24 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            placeholder="Tell me about your project..."
          />
          {error ? (
            <p className="mt-2 text-sm text-red-600">{error.message}</p>
          ) : null}
          {ok && feedback ? (
            <p className="mt-2 text-sm text-green-700">{feedback}</p>
          ) : null}
          <ActionButton type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Sending…' : 'Send Message'}
          </ActionButton>
        </form>
      </div>
    </SectionCard>
  )
}
