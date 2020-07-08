import React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import NoMatch from '@screens/NoMatch'

interface Routes {
  component: React.ReactElement
  path: string
  exact: boolean
  protectedPath: boolean
}

const routes = [
  {
    component: null,
    path: '/',
    exact: true,
    protectedPath: false,
  },
]

const Router: React.FunctionComponent<{ store: Store }> = ({ store }) => {
  const { user } = store.getState()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {routes &&
            routes.map((route: Routes, key) => {
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
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Router
