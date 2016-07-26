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
                List of bookmarks
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
