import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import isServer from 'tool/env'
export default (state = {}) => {
    const middlewares = [
        thunk
    ]
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
    }

    const enhancers = [
        applyMiddleware(...middlewares)
    ]
    let initialState;

    if (!isServer && window.__PRELOADED_STATE__) {
        initialState = window.__PRELOADED_STATE__;
        delete window.__PRELOADED_STATE__;
    }else {
        initialState = state
    }

    const store = createStore(
        reducers,
        initialState,
        compose(...enhancers)
    )

    return store
}