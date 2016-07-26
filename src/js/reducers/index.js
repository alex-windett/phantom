import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import bookmarks from './bookmarks' 

export const rootReducer = combineReducers({
    bookmarks
})
