import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// import route reducer
import { rootReducer } from './reducers/index'

const defaultState = {}

export const store = createStore(
    rootReducer,
    defaultState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)
