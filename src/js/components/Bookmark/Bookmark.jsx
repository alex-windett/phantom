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
                        nextStep={this.nextStep}
                        store={this.props}
                        />,
                }
            case 1:
                return {
                    element: <BookmarkCreate
                        nextStep={this.nextStep}
                        store={this.props} />,
                }
            case 2:
                return {
                    element: <BookmarkConfirmation
                            store={this.props}
                            />,
                }
        }
    }

    render() {

        const currentStep    = this.showStep()

        return (

            <article className="bookmarks bookmarks__wrapper">
                {currentStep.element}
            </article>
        )
    }
}

export default Bookmark
