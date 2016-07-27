import {
    CREATE_BOOKMARK,
    EDIT_BOOKMARK,
    DELETE_BOOKMARK,
    SAVE_FORM_DATA,
} from '../constants/ActionConstants'

function bookmarks(state = [], action ) {
    switch (action.type) {
        case CREATE_BOOKMARK:

            // var newBookmark = {
            //     id: Date.now(),
            //     name: action.name,
            //     displayName: action.displayName
            // }

            // return {
            //     ...state
            // }
            debugger
            return [
                state,
                {
                    id: Date.now(),
                    name: action.name,
                    displayName: action.displayName
                }
            ]

        case EDIT_BOOKMARK:
            return state.map((bookmark, index) => {
                if (index === action.index) {
                    // Copy the object before mutating
                    return Object.assign({}, bookmark, {
                        name: action.newName
                    })
                }
                return bookmark
            })

        case DELETE_BOOKMARK:
            return [
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1)
                ]

        case SAVE_FORM_DATA:
            return {
                ...state,
                savedInputValue: action.input
            }

        default:
            return state
    }
}

export default bookmarks
