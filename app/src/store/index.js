import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import loggerMiddleware from './middlewares/logger'
import RootReducer from './reducers/index'

export default function configureStore(preloadedState) {
	const middlewares = [loggerMiddleware, thunkMiddleware]
	const middlewareEnhancer = applyMiddleware(...middlewares)

	const composedEnhancers = compose(middlewareEnhancer)

	return createStore(RootReducer, preloadedState, composedEnhancers)
}
