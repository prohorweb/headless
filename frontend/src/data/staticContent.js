/** Static portfolio content (no GraphQL) — replace or wire to CMS later. */

export const STATIC_SITE_NAME = 'John Developer'

export const STATIC_HERO = {
  name: 'John Developer',
  badge: 'Available for Work',
  headlinePrefix: "Hello, I'm",
  subtitle:
    'Senior Software Engineer crafting digital experiences with 5+ years of expertise. Specializing in full-stack development, DevOps practices, and scalable solutions that drive business growth.'
}

export const STATIC_SKILL_GROUPS = [
  { title: 'Frontend', tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
  { title: 'Backend & APIs', tags: ['Node.js', 'GraphQL', 'REST', 'Headless CMS'] },
  { title: 'Platform', tags: ['Docker', 'CI/CD', 'Linux', 'Observability'] },
  { title: 'Architecture', tags: ['System Design', 'Code Review', 'Performance', 'Security'] },
  { title: 'Data', tags: ['PostgreSQL', 'Redis', 'Migrations'] },
  { title: 'Quality', tags: ['Testing', 'Linting', 'Smoke checks'] }
]

/** Project list */
export const STATIC_PROJECTS = [
  {
    id: 'project-1',
    slug: 'portfolio-redesign-system',
    title: 'Portfolio Redesign System',
    date: '2026-03-18T12:00:00',
    excerpt: '<p>Token-driven redesign with reusable section architecture and responsive behavior.</p>',
    content: `
      <p>This project reworked the portfolio into a section-based architecture with consistent spacing and typography rules.</p>
      <p>The main goal was design fidelity with maintainable code: one token source, reusable primitives, and predictable breakpoints.</p>
    `
  },
  {
    id: 'project-2',
    slug: 'headless-wordpress-stack',
    title: 'Headless WordPress Stack',
    date: '2026-03-09T12:00:00',
    excerpt: '<p>WordPress as a content backend and React as a decoupled frontend experience.</p>',
    content: `
      <p>Built a stable headless stack with Dockerized services, CMS workflows, and frontend deployment flow.</p>
      <p>Focused on reliability, environment parity, and straightforward contributor onboarding.</p>
    `
  },
  {
    id: 'project-3',
    slug: 'automation-make-workflow',
    title: 'Automation Make Workflow',
    date: '2026-02-27T12:00:00',
    excerpt: '<p>Single-command developer workflow for setup, checks, smoke tests, and CI parity.</p>',
    content: `
      <p>Implemented make targets for bootstrap, checks, smoke tests, and release readiness.</p>
      <p>This reduced manual errors and aligned local verification with CI expectations.</p>
    `
  },
  {
    id: 'project-4',
    slug: 'storybook-component-lab',
    title: 'Storybook Component Lab',
    date: '2026-02-14T12:00:00',
    excerpt: '<p>Interactive showcase for UI primitives, states, and regression-friendly review.</p>',
    content: `
      <p>Added Storybook as a visual contract for components used across portfolio sections.</p>
      <p>Stories capture edge states and improve confidence during UI refactors.</p>
    `
  },
  {
    id: 'project-5',
    slug: 'graphql-contract-layer',
    title: 'GraphQL Contract Layer',
    date: '2026-01-31T12:00:00',
    excerpt: '<p>Structured query layer that decouples view rendering from backend schema shifts.</p>',
    content: `
      <p>This project organized query usage around page-level contracts and shared data transforms.</p>
      <p>It made API integration easier to reason about and safer to evolve.</p>
    `
  },
  {
    id: 'project-6',
    slug: 'release-quality-gates',
    title: 'Release Quality Gates',
    date: '2026-01-19T12:00:00',
    excerpt: '<p>CI checks and branch policies designed to keep main stable and deployable.</p>',
    content: `
      <p>Configured release checks that run lint, build, and smoke steps on every pull request.</p>
      <p>The result is a cleaner merge pipeline with fewer regressions on production branches.</p>
    `
  }
]

export const STATIC_FEATURED_PROJECTS = STATIC_PROJECTS.slice(0, 4)

export const STATIC_PROJECTS_BY_SLUG = Object.fromEntries(
  STATIC_PROJECTS.map((project) => [project.slug, project])
)

/** Full blog list (8 posts) */
export const STATIC_BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'headless-wordpress-platform',
    title: 'Headless WordPress Platform',
    date: '2026-03-20T12:00:00',
    excerpt: '<p>How we moved to a clean CMS API boundary with predictable frontend delivery.</p>',
    content: `
      <p>This article describes a pragmatic headless setup: WordPress as the content source, WPGraphQL for the API, and a React SPA for the experience.</p>
      <p>Key outcomes: faster iteration on the frontend, clear separation of concerns, and room to grow into multiple channels later.</p>
      <ul>
        <li>Stable GraphQL schema</li>
        <li>Preview-friendly content model</li>
        <li>Operational backups and restore drills</li>
      </ul>
    `
  },
  {
    id: 'blog-2',
    slug: 'ci-pipeline-quality-gates',
    title: 'CI Pipeline Quality Gates',
    date: '2026-03-14T12:00:00',
    excerpt: '<p>Shipping confidence with lint, build, smoke checks, and protected branches.</p>',
    content: `
      <p>Quality gates keep the main branch deployable: lint, tests, and smoke checks run on every change.</p>
      <p>Branch protection enforces status checks and team standards before merge.</p>
    `
  },
  {
    id: 'blog-3',
    slug: 'design-tokens-at-scale',
    title: 'Design Tokens at Scale',
    date: '2026-03-02T12:00:00',
    excerpt: '<p>A token-first styling system for consistency across pages and components.</p>',
    content: `
      <p>Tokens live in CSS variables and are consumed by components and Storybook stories.</p>
      <p>When the palette changes, one update propagates across the UI.</p>
    `
  },
  {
    id: 'blog-4',
    slug: 'storybook-as-ui-contract',
    title: 'Storybook as UI Contract',
    date: '2026-02-22T12:00:00',
    excerpt: '<p>Using stories to align design, engineering, and QA before merge.</p>',
    content: `
      <p>Storybook helps validate component states in isolation: default, hover, loading, and edge cases.</p>
      <p>It becomes a shared contract between design handoff and production code.</p>
    `
  },
  {
    id: 'blog-5',
    slug: 'frontend-performance-basics',
    title: 'Frontend Performance Basics',
    date: '2026-02-10T12:00:00',
    excerpt: '<p>Simple improvements that keep UX fast from first paint to interactions.</p>',
    content: `
      <p>We focused on bundle hygiene, route-level splitting, and predictable rendering paths.</p>
      <p>Small wins in many places compound into a visibly faster application.</p>
    `
  },
  {
    id: 'blog-6',
    slug: 'reliable-local-environment',
    title: 'Reliable Local Environment',
    date: '2026-01-28T12:00:00',
    excerpt: '<p>One-command setup for repeatable onboarding and fewer environment surprises.</p>',
    content: `
      <p>Automated bootstrap scripts remove most manual setup steps for new contributors.</p>
      <p>The same commands are reused in CI to minimize drift.</p>
    `
  },
  {
    id: 'blog-7',
    slug: 'api-contracts-for-teams',
    title: 'API Contracts for Teams',
    date: '2026-01-16T12:00:00',
    excerpt: '<p>Versioned query contracts that help frontend and backend move independently.</p>',
    content: `
      <p>We document expected fields and states for each page-level query.</p>
      <p>Contract discipline reduces regressions and accelerates feature planning.</p>
    `
  },
  {
    id: 'blog-8',
    slug: 'release-checklist-that-works',
    title: 'Release Checklist That Works',
    date: '2026-01-05T12:00:00',
    excerpt: '<p>A practical release checklist with smoke tests and rollback readiness.</p>',
    content: `
      <p>Reliable releases come from repeatable checks, clear ownership, and rollback drills.</p>
      <p>Keep the checklist short, explicit, and enforced by automation where possible.</p>
    `
  }
]

/** Featured blog cards on Home */
export const STATIC_FEATURED_POSTS = STATIC_BLOG_POSTS.slice(0, 4)

export const STATIC_CONTACT = {
  email: 'hello@example.com',
  website: 'https://example.com'
}

/** Full posts map for `/post/:slug` route (static) */
export const STATIC_POSTS_BY_SLUG = Object.fromEntries(
  STATIC_BLOG_POSTS.map((post) => [post.slug, post])
)
