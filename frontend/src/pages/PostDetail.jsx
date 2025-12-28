import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      slug
      title
      content
    }
  }
`

export default function PostDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, { variables: { slug } })

  useEffect(() => {
    if (data) console.debug('PostDetail: GraphQL data', data)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const post = data?.postBy
  if (!post) return <p>Post not found</p>

  return (
    <article>
      <div className="text-sm text-gray-500 mb-2">id: {post.id} — slug: {post.slug}</div>
      <h1 className="text-3xl font-bold mb-4">{post.title || post.slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
