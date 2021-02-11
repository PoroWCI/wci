import React, { useEffect } from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom'

import HomeEntity from '@screens/Home'
import ThemeChanger from '@hooks/useThemeChanger'

const routes = [
	{
		component: HomeEntity,
		path: '/',
		exact: true,
		protectedPath: false,
	},
]

const Router = ({ store }) => {
	const { user } = store.getState()

	return (
		<Provider store={store}>
			<BrowserRouter>
				<ThemeChanger />
				<Switch>
					{routes &&
						routes.map((route, key) => {
							if (!route.protectedPath) {
								return (
									<Route
										key={key}
										component={route.component}
										exact={route.exact}
										path={route.path}
									/>
								)
							}

							if (route.protectedPath && user) {
								return (
									<Route
										key={key}
										component={route.component}
										exact={route.exact}
										path={route.path}
									/>
								)
							}

							return <Redirect to="/" />
						})}
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}

export default Router
