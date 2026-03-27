import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const graphqlUri = import.meta.env.VITE_GRAPHQL_URL || '/graphql'

const httpLink = new HttpLink({
  uri: graphqlUri
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client
