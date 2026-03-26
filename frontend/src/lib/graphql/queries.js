import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts {
    posts(first: 12) {
      nodes {
        id
        slug
        title
        date
        excerpt
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      slug
      title
      content
      date
    }
  }
`
