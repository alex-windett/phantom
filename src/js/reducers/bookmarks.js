import {
    CREATE_BOOKMARK,
    EDIT_BOOKMARK,
    DELETE_BOOKMARK,
    SAVE_FORM_DATA,
} from '../constants/ActionConstants'

function bookmarks(state = [], action ) {
    switch (action.type) {
        case CREATE_BOOKMARK:
        debugger
            return [
                ...state.bookmarks,
                {
                    id: Date.now(),
                    name: action.name,
                    displayName: action.displayName
                }
            ]

        case EDIT_BOOKMARK:
            return {

            }

        case DELETE_BOOKMARK:
            let id = action.data
            // debugger
            return {
                // state.filter(c => c.id !== id)
            }

        case SAVE_FORM_DATA:
            return {
                savedInputValue: action.input
            }

        default:
            return state
    }
}

export default bookmarks
