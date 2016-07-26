import React                        from 'react'

import BookmarkList                 from './BookmarkList'
import BookmarkCreate               from './BookmarkCreate'
import BookmarkConfirmation         from './BookmarkConfirmation'

class Bookmark extends React.Component {
    constructor(props) {
        super(props)
        this.nextStep       = this.nextStep.bind(this)
        this.scrollToTopOfWndow  = this.scrollToTopOfWndow.bind(this)

        this.state = {
            // First stage = 0, takes the index of each component
            currentStep: 0,
        }
    }

    getChildContext() {
        return {
            bookmarks: this.props.bookmarks,
            store: this.props
        }
    }

    scrollToTopOfWndow() {
         $(window).scrollTop(0)
    }


    nextStep() {
        this.setState({
            currentStep : this.state.currentStep + 1
        })
    }


    showStep() {
        switch (this.state.currentStep) {
            case 0:
                return {
                    element: <BookmarkList
                        fieldValues={this.state.fieldValues}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        hasSavedValue={this.hasSavedValue}
                        store={this.props}
                        />,
                }
            case 1:
                return {
                    element: <BookmarkCreate
                        scrollTop={this.scrollToTopOfWndow}
                        fieldValues={this.state.fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues}
                        hasSavedValue={this.hasSavedValue}
                        store={this.props} />,
                }
            case 2:
                return {
                    element: <BookmarkConfirmation
                            scrollTop={this.scrollToTopOfWndow}
                            fieldValues={this.state.fieldValues}
                            hasSavedValue={this.hasSavedValue}
                            store={this.props}
                            />,
                }
        }
    }

    render() {

        const currentStep    = this.showStep()

        return (

            <article className="registration__wrapper">
                {currentStep.element}
            </article>
        )
    }
}

Bookmark.childContextTypes = {
  store: React.PropTypes.object,
  bookmarks: React.PropTypes.array || React.PropTypes.object
}

export default Bookmark
