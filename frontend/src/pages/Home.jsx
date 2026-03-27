import React from 'react'
import { useQuery } from '@apollo/client'
import HeroSection from '../components/section/HeroSection'
import SkillsSection from '../components/section/SkillsSection'
import ExperienceSection from '../components/section/ExperienceSection'
import ProjectsSection from '../components/section/ProjectsSection'
import ContactSection from '../components/section/ContactSection'
import FooterSection from '../components/section/FooterSection'
import { GET_HOME_CONTENT } from '../lib/graphql/queries'

export default function Home() {
  const { data, loading, error } = useQuery(GET_HOME_CONTENT)

  if (loading) return <p className="text-sm text-[color:var(--text-muted)]">Loading posts...</p>
  if (error) return <p className="text-sm text-red-400">Error: {error.message}</p>

  const posts = data?.posts?.nodes || []
  const categories = data?.categories?.nodes || []
  const general = data?.generalSettings || {}
  const featuredPosts = posts.slice(0, 3)

  const skillGroups = [
    { title: 'CMS Topics', tags: categories.slice(0, 4).map((item) => item.name).concat(['WordPress']).slice(0, 4) },
    { title: 'Frontend', tags: ['React', 'Vite', 'Tailwind', 'Apollo'] },
    { title: 'Backend', tags: ['WordPress', 'WPGraphQL', 'REST API', 'Headless CMS'] },
    { title: 'DevOps', tags: ['Docker', 'CI/CD', 'Automation', 'Linux'] },
    { title: 'Architecture', tags: ['System Design', 'Code Review', 'Scalability', 'Performance'] },
    { title: 'Testing', tags: ['Smoke Tests', 'Linting', 'Monitoring', 'Pre-PR Gates'] }
  ]

  return (
    <div className="space-y-10">
      <HeroSection
        name={general.title || 'John Developer'}
        subtitle={general.description || 'Senior Software Engineer crafting reliable products with headless architecture.'}
      />
      <SkillsSection skillGroups={skillGroups} />
      <ExperienceSection />
      <ProjectsSection posts={featuredPosts} />
      <ContactSection email={general.email || 'admin@example.com'} website={general.url || 'http://localhost:8080'} />
      <FooterSection />
    </div>
  )
}
