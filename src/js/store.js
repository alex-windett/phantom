import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

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

export const store = createStore(
    rootReducer,
    defaultState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)
