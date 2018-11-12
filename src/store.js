import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

export default function configureStore(initialState = {}) {

    const middlewares = [
        thunk
    ]
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
    }

    const enhancers = [
        applyMiddleware(...middlewares)
    ]

    const store = createStore(
        reducers,
        initialState,
        compose(...enhancers)
    )

    // Extensions
    //store.runSaga = sagaMiddleware.run
    store.asyncReducers = {} // Async reducer registry

    return store
}
