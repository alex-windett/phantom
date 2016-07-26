import {
    CREATE_BOOKMARK,
    EDIT_BOOKMARK,
    DELETE_BOOKMARK,
} from '../constants/ActionConstants'

function bookmarks(state = [], action ) {
    switch (action.type) {
        case CREATE_BOOKMARK:

            return {

            }

        case EDIT_BOOKMARK:
            return {

            }

        case DELETE_BOOKMARK:
            return {}

        default:
            return state
    }
}

export default bookmarks
