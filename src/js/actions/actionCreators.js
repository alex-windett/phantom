import axios from 'axios'
import * as Action from '../constants/ActionConstants'

export function addBookmark() {
    return( dispatch ) => {
        dispatch({
            type: Action.CREATE_BOOKMARK
        })
    }
}

export function editBookmark() {
    return( dispatch ) => {
        dispatch({
            type: Action.EDIT_BOOKMARK
        })
    }
}

export function deleteBookmark() {
    return( dispatch ) => {
        dispatch({
            type: Action.DELETE_BOOKMARK
        })
    }
}
