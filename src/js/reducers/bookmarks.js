import {
    CREATE_BOOKMARK,
    EDIT_BOOKMARK,
    DELETE_BOOKMARK,
    SAVE_FORM_DATA,
    ADD_DEFAULT_LOCAL_STORAGE,
} from '../constants/ActionConstants'

import { defaultLocalData } from '../lib/data'

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
            return {

                items: [
                    ...state.items.slice(0, action.index),
                    {
                        id: action.id,
                        name: action.newName
                    },
                    ...state.items.slice(action.index + 1)
                ]
            }

        case DELETE_BOOKMARK:

            return {

                items: [
                    ...state.items.slice(0, action.index),
                    ...state.items.slice(action.index + 1)
                ]
            }

        case ADD_DEFAULT_LOCAL_STORAGE:

            return {

                items: defaultLocalData
            }
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
