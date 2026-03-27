import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import ActionButton from '../ui/ActionButton'
import { GET_PORTFOLIO_FOOTER } from '../../lib/graphql/queries'
import { SUBMIT_CONTACT } from '../../lib/graphql/mutations'

export default function FooterSection() {
  const { data } = useQuery(GET_PORTFOLIO_FOOTER)
  const ps = data?.portfolioSettings
  const siteName = ps?.siteName || 'Portfolio'
  const email = ps?.contactEmail || 'hello@example.com'
  const website = ps?.contactWebsite || 'https://example.com'
  const location = ps?.contactLocation || 'Remote / Europe'

  const [name, setName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [message, setMessage] = useState('')

  const [submitContact, { loading, data: mutData, error }] = useMutation(SUBMIT_CONTACT, {
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

  const websiteLabel = typeof website === 'string' ? website.replace(/^https?:\/\//, '') : ''

  return (
    <footer id="contact" className="footer-contact">
      <div className="footer-contact__inner">
        <h2 className="footer-contact__title">Let&apos;s Work Together</h2>
        <p className="footer-contact__subtitle">Reach out to discuss your next product or platform build.</p>

        <div className="footer-contact__grid-wrap">
          <div className="footer-contact__grid">
            <p className="footer-contact__card">
              <span className="footer-contact__label">Email</span>
              <a className="footer-contact__value" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
            <p className="footer-contact__card">
              <span className="footer-contact__label">Website</span>
              <a className="footer-contact__value" href={website} target="_blank" rel="noreferrer">
                {websiteLabel}
              </a>
            </p>
            <p className="footer-contact__card">
              <span className="footer-contact__label">Location</span>
              <span className="footer-contact__value">{location}</span>
            </p>
          </div>
        </div>

        <div className="footer-contact__form-wrap">
          <form className="footer-contact__form" onSubmit={handleSubmit}>
            <label className="footer-contact__input-label">Name</label>
            <input
              required
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="footer-contact__input"
              placeholder="Your name"
            />
            <label className="footer-contact__input-label">Email</label>
            <input
              required
              type="email"
              value={formEmail}
              onChange={(ev) => setFormEmail(ev.target.value)}
              className="footer-contact__input"
              placeholder="you@example.com"
            />
            <label className="footer-contact__input-label">Message</label>
            <textarea
              required
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
              className="footer-contact__input h-24"
              placeholder="Tell me about your project..."
            />
            {error ? <p className="mt-2 text-sm text-red-400">{error.message}</p> : null}
            {mutData?.submitContact?.success && mutData?.submitContact?.message ? (
              <p className="mt-2 text-sm text-green-400">{mutData.submitContact.message}</p>
            ) : null}
            <ActionButton type="submit" disabled={loading} className="footer-contact__button">
              {loading ? 'Sending…' : 'Send Message'}
            </ActionButton>
          </form>
        </div>

        <p className="footer-contact__copyright">
          2026 {siteName}. Built with React and WordPress GraphQL.
        </p>
      </div>
    </footer>
  )
}
