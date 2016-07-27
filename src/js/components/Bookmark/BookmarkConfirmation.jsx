import React from 'react'

class BookmarkConfirmation extends React.Component {

    constructor(props) {
        super(props)
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

export default BookmarkConfirmation
