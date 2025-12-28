import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        slug
        title
      }
    }
  }
`

import { useEffect } from 'react'

export default function Home() {
  const { data, loading, error } = useQuery(GET_POSTS)

  useEffect(() => {
    if (data) console.debug('Home: GraphQL data', data)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const posts = data?.posts?.nodes || []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.id} className="flex flex-col">
            <Link to={`/post/${post.slug}`} className="text-blue-600">
              {post.title || post.slug}
            </Link>
            <small className="text-xs text-gray-500">slug: {post.slug} — id: {post.id}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
