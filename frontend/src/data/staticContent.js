/** Static portfolio content (no GraphQL) — replace or wire to CMS later. */

export const STATIC_HERO = {
  name: 'Alex Morgan',
  subtitle:
    'Senior Software Engineer building reliable, scalable web products with modern stacks and pragmatic automation.'
}

export const STATIC_SKILL_GROUPS = [
  { title: 'Frontend', tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
  { title: 'Backend & APIs', tags: ['Node.js', 'GraphQL', 'REST', 'Headless CMS'] },
  { title: 'Platform', tags: ['Docker', 'CI/CD', 'Linux', 'Observability'] },
  { title: 'Architecture', tags: ['System Design', 'Code Review', 'Performance', 'Security'] },
  { title: 'Data', tags: ['PostgreSQL', 'Redis', 'Migrations'] },
  { title: 'Quality', tags: ['Testing', 'Linting', 'Smoke checks'] }
]

/** Featured cards on Home — same shape as previous GraphQL `posts.nodes` slice */
export const STATIC_FEATURED_POSTS = [
  {
    id: 'static-1',
    slug: 'headless-wordpress-platform',
    title: 'Headless WordPress Platform',
    date: '2026-03-01T12:00:00',
    excerpt: '<p>End-to-end migration to GraphQL and a reusable React section model.</p>'
  },
  {
    id: 'static-2',
    slug: 'ci-pipeline-quality-gates',
    title: 'CI Pipeline Quality Gates',
    date: '2026-02-15T12:00:00',
    excerpt: '<p>Lint, build, smoke tests, and branch protection in one flow.</p>'
  },
  {
    id: 'static-3',
    slug: 'design-tokens-at-scale',
    title: 'Design Tokens at Scale',
    date: '2026-01-20T12:00:00',
    excerpt: '<p>Centralizing CSS variables for consistent UI across teams.</p>'
  }
]

export const STATIC_CONTACT = {
  email: 'hello@example.com',
  website: 'https://example.com'
}

/** Full posts for `/post/:slug` route (static) */
export const STATIC_POSTS_BY_SLUG = {
  'headless-wordpress-platform': {
    slug: 'headless-wordpress-platform',
    title: 'Headless WordPress Platform',
    date: '2026-03-01T12:00:00',
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
  'ci-pipeline-quality-gates': {
    slug: 'ci-pipeline-quality-gates',
    title: 'CI Pipeline Quality Gates',
    date: '2026-02-15T12:00:00',
    content: `
      <p>Quality gates keep main branch deployable: lint, tests, and smoke checks run on every change.</p>
      <p>Branch protection enforces squashed merges and required status checks.</p>
    `
  },
  'design-tokens-at-scale': {
    slug: 'design-tokens-at-scale',
    title: 'Design Tokens at Scale',
    date: '2026-01-20T12:00:00',
    content: `
      <p>Tokens live in CSS variables and are consumed by components and Storybook stories.</p>
      <p>When the palette changes, one update propagates across the UI.</p>
    `
  }
}
