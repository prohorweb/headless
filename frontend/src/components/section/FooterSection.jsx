import React from 'react'
import { STATIC_CONTACT } from '../../data/staticContent'
import ActionButton from '../ui/ActionButton'

export default function FooterSection() {
  return (
    <footer id="contact" className="footer-contact">
      <div className="footer-contact__inner">
        <h2 className="footer-contact__title">Let&apos;s Work Together</h2>
        <p className="footer-contact__subtitle">
          Reach out to discuss your next product or platform build.
        </p>

        <div className="footer-contact__grid-wrap">
          <div className="footer-contact__grid">
            <p className="footer-contact__card">
              <span className="footer-contact__label">Email</span>
              <a className="footer-contact__value" href={`mailto:${STATIC_CONTACT.email}`}>
                {STATIC_CONTACT.email}
              </a>
            </p>
            <p className="footer-contact__card">
              <span className="footer-contact__label">Website</span>
              <a className="footer-contact__value" href={STATIC_CONTACT.website} target="_blank" rel="noreferrer">
                {STATIC_CONTACT.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
            <p className="footer-contact__card">
              <span className="footer-contact__label">Location</span>
              <span className="footer-contact__value">Remote / Europe</span>
            </p>
          </div>
        </div>

        <div className="footer-contact__form-wrap">
          <form className="footer-contact__form">
            <label className="footer-contact__input-label">Name</label>
            <input
              className="footer-contact__input"
              placeholder="Your name"
            />
            <label className="footer-contact__input-label">Email</label>
            <input
              className="footer-contact__input"
              placeholder="you@example.com"
            />
            <label className="footer-contact__input-label">Message</label>
            <textarea
              className="footer-contact__input h-24"
              placeholder="Tell me about your project..."
            />
            <ActionButton className="footer-contact__button">
              Send Message
            </ActionButton>
          </form>
        </div>

        <p className="footer-contact__copyright">2026 Portfolio Template. Built with React and static content.</p>
      </div>
    </footer>
  )
}
