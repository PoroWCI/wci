import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { CookiesProvider } from 'react-cookie'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

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

import common_en from '@translations/en/common.json'
import common_fr from '@translations/fr/common.json'

import Loading from '@screens/Loading'

/**
 * Translate
 */

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'fr',
	resources: {
		en: {
			common: common_en,
		},
		fr: {
			common: common_fr,
		},
	},
})

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

ReactGA.initialize('UA-000000-01')

const AppLoader = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 5000)
	})

	if (loading) {
		return <Loading status={loading} />
	}

	return (
		<>
			<ApolloProvider client={client}>
				<I18nextProvider i18n={i18next}>
					<CookiesProvider>
						<Router store={store} />
					</CookiesProvider>
				</I18nextProvider>
			</ApolloProvider>
		</>
	)
}

export default AppLoader
