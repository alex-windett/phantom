import React                from 'react'
import axios                from 'axios'
import { validateStringAsURL } from '../../helpers/functions'

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
        this.checkButton()
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
        // debuggerm
        this.setState({
            disabledButton: !validateStringAsURL(this.state.inputValue) || this.state.inputValue === ''
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
                    <h2>Page Preview</h2>
                    <p>Is this the page you were after? (problems may occur because of CORS and denying use of webpage in iframe) </p>
                    <iframe src={this.state.inputValue} width="100%" height="500px"></iframe>
                </div>
            )
        } else {
            return (
                <h2>I can't seem to find that page, but if you think it should excist then continue on and its valid.</h2>
            )
        }
    }

    render () {

        return (
            <div>
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

                    <button disabled={this.state.disabledButton} className="button button__success" type="submit" >Confirm</button>
                </form>

                { this.showPagePreview() }
            </div>
        );
    }
}

export default BookmarkCreate
