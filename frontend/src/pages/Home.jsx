import React from 'react'
import HeroSection from '../components/section/HeroSection'
import SkillsSection from '../components/section/SkillsSection'
import ExperienceSection from '../components/section/ExperienceSection'
import ProjectsSection from '../components/section/ProjectsSection'
import ContactSection from '../components/section/ContactSection'
import FooterSection from '../components/section/FooterSection'
import {
  STATIC_HERO,
  STATIC_SKILL_GROUPS,
  STATIC_FEATURED_POSTS,
  STATIC_CONTACT
} from '../data/staticContent'

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection name={STATIC_HERO.name} subtitle={STATIC_HERO.subtitle} />
      <SkillsSection skillGroups={STATIC_SKILL_GROUPS} />
      <ExperienceSection />
      <ProjectsSection posts={STATIC_FEATURED_POSTS} />
      <ContactSection email={STATIC_CONTACT.email} website={STATIC_CONTACT.website} />
      <FooterSection />
    </div>
  )
}
