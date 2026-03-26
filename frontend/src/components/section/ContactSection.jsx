import React from 'react'
import SectionCard from '../ui/SectionCard'

export default function ContactSection() {
  return (
    <SectionCard id="contact">
      <h2 className="text-center text-3xl font-semibold text-slate-900">Let&apos;s Work Together</h2>
      <p className="mt-2 text-center text-sm text-slate-500">Reach out to discuss your next product or platform build.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-600">Email</p>
          <p className="mt-1 text-sm text-slate-900">admin@example.com</p>
          <p className="mt-4 text-sm text-slate-600">Phone</p>
          <p className="mt-1 text-sm text-slate-900">+1 (555) 123-4567</p>
          <p className="mt-4 text-sm text-slate-600">Location</p>
          <p className="mt-1 text-sm text-slate-900">Remote / Europe</p>
        </div>
        <form className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <label className="text-xs text-slate-500">Name</label>
          <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none" placeholder="Your name" />
          <label className="mt-3 block text-xs text-slate-500">Email</label>
          <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none" placeholder="you@example.com" />
          <label className="mt-3 block text-xs text-slate-500">Message</label>
          <textarea className="mt-1 h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none" placeholder="Tell me about your project..." />
          <button type="button" className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Send Message</button>
        </form>
      </div>
    </SectionCard>
  )
}
