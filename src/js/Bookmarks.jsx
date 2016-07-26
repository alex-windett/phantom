import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

import BookmarkApp from './components/BookmarkApp'

class Bookmarks extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <Provider store={store}>
                <BookmarkApp/>
            </Provider>
        )
    }
}

export default Bookmarks
