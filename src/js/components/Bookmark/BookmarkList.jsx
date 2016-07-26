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
            canSubmit: false,
            isUniqueEmail: true,
        }
    }


    render () {
        return (
            <div className="decoration decoration__plain registration__form">
                <h1>List of all the bookmarks</h1>

                <form refs="addNewBookark">
                    <input type="text"/>

                    <button type="submit" onClick={this.submitForm}>Add a bookmark</button>
                </form>

                <h2>Check out all the bookmarks</h2>
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
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
