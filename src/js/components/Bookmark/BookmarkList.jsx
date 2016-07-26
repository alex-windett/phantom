import React            from 'react'

import Formsy           from 'formsy-react'
import axios            from 'axios'
import Input            from '../FormElements/Input'

import { passwordLengthMin } from '../../constants/FormConstants'
import { accountURL } from '../../constants/GlobalConstants'
import {
    validateUniqueEmailURL,
    validateReferalCode,
    getQueryFromURL
}  from '../../helpers/functions'

class BookmarkList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: false,
            disabledButton: true
        }

        // this.submitForm         = this.submitForm.bind(this)
        // this.handleInputChange  = this.handleInputChange.bind(this)

    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        }, _ => this.checkButton() )
    }

    checkButton() {
        this.setState({
            disabledButton: this.state.inputValue !== '' ? false : true
        })
    }

    submitForm(event) {
        event.preventDefault()
        this.props.nextStep()
    }


    render () {
        var bookmarks = this.props.store.bookmarks.map( (bookmark, index) => {
            return (
                <li key={index}>
                    <a href={bookmark.url ? bookmark.url : '#'}>
                        {bookmark.name}
                    </a>
                </li>
            )
        })

        return (
            <div className="decoration decoration__plain registration__form">
                <h1>List of all the bookmarks</h1>

                <form refs="addNewBookark" onSubmit={this.submitForm.bind(this)}>
                    <input type="text" placeholder="Add a new bookmark" onChange={this.handleInputChange.bind(this)}/>

                    <button disabled={this.state.disabledButton} className="button button__primary" type="submit" >Add a bookmark</button>
                </form>

                <h2>Check out all the bookmarks</h2>
                <ol>
                    {bookmarks}
                </ol>
            </div>
        );
    }
}

BookmarkList.propTypes = {
    nextStep: React.PropTypes.func.isRequired,
    saveValues: React.PropTypes.func.isRequired,
    fieldValues: React.PropTypes.object
}

export default BookmarkList
