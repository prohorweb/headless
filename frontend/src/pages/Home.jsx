import React from 'react'
import { useQuery } from '@apollo/client'
import HeroSection from '../components/section/HeroSection'
import SkillsSection from '../components/section/SkillsSection'
import ExperienceSection from '../components/section/ExperienceSection'
import ProjectsSection from '../components/section/ProjectsSection'
import ContactSection from '../components/section/ContactSection'
import FooterSection from '../components/section/FooterSection'
import { GET_POSTS } from '../lib/graphql/queries'

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
      <HeroSection />
      <SkillsSection skillGroups={skillGroups} />
      <ExperienceSection />
      <ProjectsSection posts={featuredPosts} />
      <ContactSection />
      <FooterSection />
    </div>
  )
}
