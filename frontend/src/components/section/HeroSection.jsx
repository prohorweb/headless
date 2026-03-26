import React from 'react'
import SectionCard from '../ui/SectionCard'

export default function HeroSection() {
  return (
    <SectionCard className="hero-section">
      <div className="grid items-center gap-8 md:grid-cols-[1.2fr,1fr]">
        <div>
          <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-700">
            Available for full-time roles
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-slate-900 md:text-6xl">
            Hello, I&apos;m
            <br />
            John Developer
          </h1>
          <p className="mt-4 max-w-lg text-slate-600">
            Senior Software Engineer crafting digital products with 5+ years of expertise in scalable web systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900">Download CV</a>
            <a href="#projects" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">View My Work</a>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-lg font-semibold text-slate-900">50+</p>
              <p className="text-xs text-slate-500">Projects</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-lg font-semibold text-slate-900">5+</p>
              <p className="text-xs text-slate-500">Years</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-lg font-semibold text-slate-900">100%</p>
              <p className="text-xs text-slate-500">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="h-64 w-64 rounded-full border border-slate-300 bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#f1f5f9_42%,#cbd5e1_75%,#94a3b8_100%)] md:h-72 md:w-72" />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700">
              Available for hire
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
