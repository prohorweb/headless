import React from 'react'
import { useQuery } from '@apollo/client'
import HeroSection from '../components/section/HeroSection'
import SkillsSection from '../components/section/SkillsSection'
import ExperienceSection from '../components/section/ExperienceSection'
import ProjectsSection from '../components/section/ProjectsSection'
import BlogSection from '../components/section/BlogSection'
import ContactSection from '../components/section/ContactSection'
import FooterSection from '../components/section/FooterSection'
import { GET_HOME_PAGE } from '../lib/graphql/queries'
import { parseSkillTagsFromHtml } from '../lib/parseSkillHtml'

export default function Home() {
  const { data, loading, error } = useQuery(GET_HOME_PAGE)

  if (loading) {
    return <p className="text-sm text-[color:var(--text-muted)]">Loading…</p>
  }
  if (error) {
    return <p className="text-sm text-red-600">Error: {error.message}</p>
  }

  const ps = data?.portfolioSettings
  const general = data?.generalSettings || {}
  const skillNodes = data?.skillGroups?.nodes || []
  const skillGroups = skillNodes.map((node) => ({
    title: node.title || '',
    tags: parseSkillTagsFromHtml(node.content || '')
  }))
  const projects = data?.projects?.nodes || []
  const posts = data?.posts?.nodes || []

  const siteName = ps?.siteName || general.title || 'Portfolio'
  const heroName = ps?.heroName || siteName
  const heroSubtitle = ps?.heroSubtitle || general.description || ''

  return (
    <div className="space-y-6">
      <HeroSection
        badge={ps?.heroBadge}
        headlinePrefix={ps?.heroHeadlinePrefix}
        name={heroName}
        subtitle={heroSubtitle}
        imageUrl={ps?.heroImageUrl}
        imageAlt={ps?.heroImageAlt}
      />
      <SkillsSection skillGroups={skillGroups} />
      <ExperienceSection items={ps?.experienceItems || []} />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      <ContactSection
        email={ps?.contactEmail || 'hello@example.com'}
        website={ps?.contactWebsite || general.url || ''}
        location={ps?.contactLocation || 'Remote'}
      />
      <FooterSection siteName={siteName} />
    </div>
  )
}
