import React                        from 'react'

import BookmarkList                 from './BookmarkList'
import BookmarkCreate               from './BookmarkCreate'
import BookmarkConfirmation         from './BookmarkConfirmation'

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.saveValues     = this.saveValues.bind(this)
        this.nextStep       = this.nextStep.bind(this)
        this.previousStep   = this.previousStep.bind(this)
        this.hasSavedValue  = this.hasSavedValue.bind(this)
        this.scrollToTopOfWndow  = this.scrollToTopOfWndow.bind(this)

        this.state = {
            fieldValues: {
                // This is the only attribute that needs to be loaded
                // It hides or displays the different billing
                // address section
                sameDelivery: true
            },
            // First stage = 0, takes the index of each component
            currentStep: 0,
            // Changes to the step name will also need to be changed in the
            // React component in the render method - Sorry!!
            steps: [
                {
                    name: 'About You'
                },
                {
                    name: 'Address & Billing'
                },
                {
                    name: 'Confirmation'
                },
            ]
        }
    }

    scrollToTopOfWndow() {
         $(window).scrollTop(0)
    }

    saveValues(field_value) {
        this.setState({
            fieldValues: {
                ...this.state.fieldValues,
                ...field_value
            }
        })
    }

    nextStep() {
        this.setState({
            currentStep : this.state.currentStep + 1
        })
    }

    previousStep() {
        this.setState({
            currentStep : this.state.currentStep - 1
        })
    }

    hasSavedValue(value = '') {
        if ( this.state.fieldValues[value] ) {
            return this.state.fieldValues[value]
        }
     }

    showStep() {
        switch (this.state.currentStep) {
            case 0:
                return {
                    element: <BookmarkList
                        fieldValues={this.state.fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
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

export default Registration
