import React from 'react'
import { Link } from 'react-router-dom'
import SectionCard from '../ui/SectionCard'
import TagChip from '../ui/TagChip'

export default function ProjectsSection({ posts }) {
  return (
    <SectionCard id="projects">
      <h2 className="text-center text-3xl font-semibold text-slate-900">Featured Projects</h2>
      <p className="mt-2 text-center text-sm text-slate-500">Real posts from your WordPress content API.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="h-32 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300" />
            <p className="mt-3 text-xs uppercase text-slate-500">{post.date ? new Date(post.date).toLocaleDateString() : 'No date'}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              <Link to={`/post/${post.slug}`} className="hover:text-indigo-600">{post.title || post.slug}</Link>
            </h3>
            <div className="mt-2 text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
            <div className="mt-3 flex flex-wrap gap-2">
              <TagChip label="React" />
              <TagChip label="GraphQL" />
            </div>
            <Link to={`/post/${post.slug}`} className="mt-3 inline-block rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-indigo-600">View details</Link>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}
