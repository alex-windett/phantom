import { bindActionCreators }               from 'redux'
import { connect }                          from 'react-redux'
import * as actionCreators                  from '../actions/actionCreators'
import Bookmark                             from './Bookmark/Bookmark'

function mapStateToProps(state) {
    return {
        registrationStatus: state.registrationStatus
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

const BookmarkApp = connect(mapStateToProps, mapDispatchToProps)(Bookmark)

export default BookmarkApp
