import React                from 'react'

import Formsy               from 'formsy-react'

import Input                from '../FormElements/Input'
import CardDetailsInputs    from '../FormElements/CardDetailsInputs'
import BillingAddressForm from '../FormElements/BillingAddressForm'
import DeliveryAddressForm from '../FormElements/DeliveryAddressForm'

import { stripePublishableKey, accountURL } from '../../constants/GlobalConstants'
Stripe.setPublishableKey(stripePublishableKey)

class BookmarkCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            preventStepBack: false,
            sameDelivery: this.props.fieldValues.sameDelivery,
            submitDisabled: false,
            submitting: false,
            errors: ''
        }
    }

    render () {

        return (
            <div className="decoration decoration__plain registration__form">
                Create a new bookmark
            </div>
        );
    }

}

BookmarkCreate.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired,
    saveValues: React.PropTypes.func.isRequired,
    fieldValues: React.PropTypes.object
}

export default BookmarkCreate
