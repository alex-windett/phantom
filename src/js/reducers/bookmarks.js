import {
    CREATE_BOOKMARK,
    EDIT_BOOKMARK,
    DELETE_BOOKMARK,
    SAVE_FORM_DATA,
} from '../constants/ActionConstants'

const bookmark = (state = [], action) => {
    switch (action.type) {
        case CREATE_BOOKMARK:
            return {
                id: Date.now(),
                name: action.name,
                displayName: action.displayName
            }
        default:
            return state
    }
}

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

            // There are already items in the store, get them and add the new one
            if ( state.items ) {
                return {
                    // ...state,
                    items: [
                        ...state.items,
                        bookmark(undefined, action)
                    ]
                }
            } else {
                return {
                    items: [
                        bookmark(undefined, action)
                    ]
                }
            }

        case EDIT_BOOKMARK:
            return state.items.map((bookmark, index) => {
                if (index === action.index) {
                    // Copy the object before mutating
                    return Object.assign({}, bookmark, {
                        name: action.newName
                    })
                }
                return bookmark
            })

        case DELETE_BOOKMARK:
        debugger
            return [
                    ...state.items.slice(0, action.index),
                    ...state.items.slice(action.index + 1)
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
