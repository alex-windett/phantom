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

export function editBookmark(index, id, newName) {
    return( dispatch ) => {
        dispatch({
            type: Action.EDIT_BOOKMARK,
            index,
            id,
            newName
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

export function addDefaultLocalStorage() {
    return( dispatch ) => {
        dispatch({
            type: Action.ADD_DEFAULT_LOCAL_STORAGE,
        })
    }
}
