import React                from 'react'
import axios                from 'axios'

class BookmarkCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: this.props.store.bookmarks.savedInputValue,
            inputNameValue: false,
            disabledButton: false,
            bookmarkData: false,
            isValidURL: false,
        }

    }

    componentWillMount() {
        this.checkURL(this.props.store.bookmarks.savedInputValue)
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

    handleURLInputChange(event) {
        this.setState({
            inputValue: event.target.value
        }, _ => {
            this.checkButton()
            this.checkURL(this.state.inputValue)
        })
    }

    handleNameInputChange(event) {
        this.setState({
            inputNameValue: event.target.value
        })
    }

    checkButton() {
        this.setState({
            disabledButton: this.state.inputValue !== '' ? false : true
        })
    }

    submitForm(event) {
        event.preventDefault()
        this.props.store.addBookmark(this.state.inputValue, this.state.inputNameValue)
        this.props.nextStep()
    }

    showPagePreview() {

        if ( this.state.isValidURL ) {

            return (

                <div>
                    <h3>Page Preview</h3>
                    <p>Is this the page you were after?</p>
                    <iframe src={this.state.inputValue} width="500px" height="500px"></iframe>
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
                        defaultValue={this.props.store.bookmarks.savedInputValue}
                        onChange={this.handleURLInputChange.bind(this)}
                        />
                    <input
                        type="text"
                        placeholder="Create a name for the bookmark (Optional)"
                        onChange={this.handleNameInputChange.bind(this)}
                        />

                    <button disabled={this.state.disabledButton} className="button button__primary" type="submit" >Confirm</button>
                </form>

                { this.showPagePreview() }
            </div>
        );
    }
}

export default BookmarkCreate
