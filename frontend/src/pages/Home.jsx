import React from 'react'
import HeroSection from '../components/section/HeroSection'
import SkillsSection from '../components/section/SkillsSection'
import ExperienceSection from '../components/section/ExperienceSection'
import ProjectsSection from '../components/section/ProjectsSection'
import BlogSection from '../components/section/BlogSection'
import {
  STATIC_HERO,
  STATIC_SKILL_GROUPS,
  STATIC_FEATURED_PROJECTS,
  STATIC_FEATURED_POSTS
} from '../data/staticContent'

export default function Home() {
  return (
    <div>
      <HeroSection
        badge={STATIC_HERO.badge}
        headlinePrefix={STATIC_HERO.headlinePrefix}
        name={STATIC_HERO.name}
        subtitle={STATIC_HERO.subtitle}
      />
      <SkillsSection skillGroups={STATIC_SKILL_GROUPS} />
      <ExperienceSection />
      <ProjectsSection projects={STATIC_FEATURED_PROJECTS} />
      <BlogSection posts={STATIC_FEATURED_POSTS} />
    </div>
  )
}
