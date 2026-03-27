import { gql } from '@apollo/client'

export const GET_HOME_PAGE = gql`
  query GetHomePage {
    portfolioSettings {
      siteName
      heroBadge
      heroHeadlinePrefix
      heroName
      heroSubtitle
      heroImageUrl
      heroImageAlt
      contactEmail
      contactWebsite
      contactLocation
      experienceItems {
        role
        company
        period
        location
        description
        tags
      }
    }
    skillGroups(first: 50) {
      nodes {
        id
        title
        content
      }
    }
    projects(first: 4) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    posts(first: 6) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    generalSettings {
      title
      description
      url
    }
  }
`

export const GET_POSTS = gql`
  query GetPosts {
    posts(first: 24) {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`

export const GET_PROJECTS = gql`
  query GetProjects {
    projects(first: 50) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!) {
    project(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      date
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`
