import axios from 'axios'
import * as Action from '../constants/ActionConstants'

export function addBookmark(data) {
    return( dispatch ) => {
        dispatch({
            type: Action.CREATE_BOOKMARK,
            data
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

export function deleteBookmark(id) {
    return( dispatch ) => {
        dispatch({
            type: Action.DELETE_BOOKMARK,
            id
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
