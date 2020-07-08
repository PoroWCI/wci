import React from 'react'

import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'

import Router from '@navigation/Router'
import configureStore from './store'

/**
 * Store Redux
 */

const store = configureStore()

/**
 * GraphQL & Apollo Client
 */

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: cache,
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

const AppLoader = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Router store={store} />
      </ApolloProvider>
    </>
  )
}

export default AppLoader
