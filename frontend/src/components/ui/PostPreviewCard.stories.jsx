import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import PostPreviewCard from './PostPreviewCard'

const samplePost = {
  id: '1',
  slug: 'headless-wordpress-platform',
  title: 'Headless WordPress Platform',
  date: new Date().toISOString(),
  excerpt: '<p>End-to-end migration with GraphQL and reusable React sections.</p>'
}

export default {
  title: 'UI/PostPreviewCard',
  component: PostPreviewCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[320px]">
          <Story />
        </div>
      </MemoryRouter>
    )
  ]
}

export const Default = {
  args: { post: samplePost }
}

export const LongTitle = {
  args: {
    post: {
      ...samplePost,
      title: 'Senior Software Engineer Portfolio Case Study: Figma to Code in a Headless Stack'
    }
  }
}

export const NoExcerpt = {
  args: {
    post: {
      ...samplePost,
      excerpt: ''
    }
  }
}

export const Mobile = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: { post: samplePost }
}
