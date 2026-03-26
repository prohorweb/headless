import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 12) {
      nodes {
        id
        slug
        title
        date
        excerpt
      }
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(GET_POSTS)

  if (loading) return <p className="text-sm text-slate-500">Loading posts...</p>
  if (error) return <p className="text-sm text-red-600">Error: {error.message}</p>

  const posts = data?.posts?.nodes || []
  const featuredPosts = posts.slice(0, 3)

  const skillGroups = [
    { title: 'Programming Languages', tags: ['JavaScript', 'TypeScript', 'PHP', 'SQL'] },
    { title: 'CMS & APIs', tags: ['WordPress', 'WPGraphQL', 'REST API', 'Headless CMS'] },
    { title: 'Frontend', tags: ['React', 'Vite', 'Tailwind', 'Apollo'] },
    { title: 'Cloud & DevOps', tags: ['Docker', 'CI/CD', 'Linux', 'Automation'] },
    { title: 'Architecture', tags: ['System Design', 'Scalability', 'Code Review'] },
    { title: 'Testing', tags: ['Smoke Tests', 'Linting', 'Monitoring'] }
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-10">
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
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-10">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Technical Skills</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Comprehensive stack for production-grade web products.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="rounded-3xl border border-slate-200 bg-white p-7 md:p-10">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Professional Experience</h2>
        <div className="mt-6 space-y-4">
          {[
            ['Senior Software Engineer', 'Tech Company', '2023 - Present', 'Remote', 'Led headless transformation, improved deployment speed and API consistency across teams.'],
            ['Full Stack Developer', 'Digital Product Studio', '2021 - 2023', 'New York, NY', 'Built high-performance React platforms and CMS integrations for enterprise clients.'],
            ['Software Developer', 'Startup', '2019 - 2021', 'San Francisco, CA', 'Delivered MVPs and scaled architecture from prototype to production.']
          ].map(([role, company, period, location, text]) => (
            <article key={role} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">{role}</h3>
                <span className="text-xs text-slate-500">{period}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{company} - {location}</p>
              <p className="mt-3 text-sm text-slate-600">{text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">React</span>
                <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">GraphQL</span>
                <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">WordPress</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="rounded-3xl border border-slate-200 bg-white p-7 md:p-10">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Featured Projects</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Real posts from your WordPress content API.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article key={post.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="h-32 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300" />
              <p className="mt-3 text-xs uppercase text-slate-500">{post.date ? new Date(post.date).toLocaleDateString() : 'No date'}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                <Link to={`/post/${post.slug}`} className="hover:text-indigo-600">{post.title || post.slug}</Link>
              </h3>
              <div className="mt-2 text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">React</span>
                <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-600">GraphQL</span>
              </div>
              <Link to={`/post/${post.slug}`} className="mt-3 inline-block rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-indigo-600">View details</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="rounded-3xl border border-slate-200 bg-white p-7 md:p-10">
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
      </section>

      <footer className="pb-5 pt-1 text-center text-xs text-slate-500">
        <p>2026 Portfolio Template. Built with React and WordPress GraphQL.</p>
      </footer>
    </div>
  )
}
