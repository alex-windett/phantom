import React                from 'react'
import axios                from 'axios'

class BookmarkCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: false,
            disabledButton: true,
            bookmarkData: false,
            isValidURL: false,
            url: this.context.bookmarks.savedInputValue
        }

    }

    componentWillMount() {
        this.checkURL(this.context.bookmarks.savedInputValue)
    }

    checkURL(url) {
        axios.get(url)
        .then( response => {
            this.setState({
                isValidURL: true
            })
        })
        .catch( error => {
            this.setState({
                isValidURL: false
            })
        })
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        }, _ => {
            this.checkButton()
            this.checkURL(this.state.inputValue)
        })
    }

    checkButton() {
        this.setState({
            disabledButton: this.state.inputValue !== '' ? false : true
        })
    }

    submitForm(event) {
        event.preventDefault()
        this.context.store.addBookmark(this.state.bookmarkData)
    }

    showPagePreview() {

        if ( this.state.isValidURL ) {

            return (

                <div>
                    <h3>Page Preview</h3>
                    <p>Is this the page you were after?</p>
                    <iframe src={this.state.url} width="500px" height="500px"></iframe>
                </div>
            )
        } else {
            return (
                <h3>It looks like that isn't a page</h3>
            )
        }
    }

    render () {

        return (
            <div className="decoration decoration__plain registration__form">
                <form refs="addNewBookark" onSubmit={this.submitForm.bind(this)}>
                    <input
                        type="text"
                        defaultValue={this.context.bookmarks.savedInputValue}
                        onChange={this.handleInputChange.bind(this)}
                        />

                    <button disabled={this.state.disabledButton} className="button button__primary" type="submit" >Confirm</button>
                </form>

                { this.showPagePreview() }
            </div>
        );
    }
}

BookmarkCreate.contextTypes = {
    bookmarks: React.PropTypes.array || React.PropTypes.object,
    store: React.PropTypes.object
};

export default BookmarkCreate
