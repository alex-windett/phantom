import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { save, load } from "redux-localstorage-simple"

// import route reducer
import { rootReducer } from './reducers/index'

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    save() // Saving done here
)(createStore)

export const store = createStoreWithMiddleware(
    rootReducer,
    load(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
