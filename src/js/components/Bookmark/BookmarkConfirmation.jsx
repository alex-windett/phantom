import React from 'react'
import { getURL } from '../../helpers/functions'
import { ShareCodeDecorator } from '../../helpers/shareCodeDecorator'

class BookmarkConfirmation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            friend_code: '',
            firstName: ''
        }
    }

    render() {

        return (
            <div className="row decoration decoration__tape decoration__tape--left confirmation">
                <h1>You have successfully created a new bookmark</h1>


                    <button>
                        <a href="/">return to home page</a>
                    </button>
            </div>
        )
    }
}

BookmarkConfirmation.propTypes = {
    fieldValues: React.PropTypes.object,
    store: React.PropTypes.object
}

export default BookmarkConfirmation
