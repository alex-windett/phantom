import axios from 'axios'
import * as Action from '../constants/ActionConstants'

export function addBookmark(name, displayName) {
    return( dispatch ) => {
        dispatch({
            type: Action.CREATE_BOOKMARK,
            name,
            displayName
        })
    }
}

export function editBookmark(data) {
    return( dispatch ) => {
        dispatch({
            type: Action.EDIT_BOOKMARK,
            data
        })
    }
}

export function deleteBookmark(index) {
    return( dispatch ) => {
        dispatch({
            type: Action.DELETE_BOOKMARK,
            index
        })
    }
}

export function savedFormData(input) {
    return( dispatch ) => {
        dispatch({
            type: Action.SAVE_FORM_DATA,
            input
        })
    }
}
