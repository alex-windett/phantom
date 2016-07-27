import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { save, load } from "redux-localstorage-simple"

// import route reducer
import { rootReducer } from './reducers/index'

const bookmarks = [
    {
        id: 1,
        name: 'bookmark 1',
    },
    {
        id: 2,
        name: 'bookmark 2',
    },
    {
        id: 3,
        name: 'bookmark 3',
    },
    {
        id: 4,
        name: 'bookmark 4',
    },
    {
        id: 5,
        name: 'bookmark 5',
    },
]

const defaultState = {
    bookmarks
}

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    save() // Saving done here
)(createStore)

export const store = createStoreWithMiddleware(
    rootReducer,
    load(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
