import React        from 'react'
import Input        from './Input'
import Formsy       from 'formsy-react'
import CVV          from './CVV'

import { cardNumberRegex, dateLength } from '../../constants/FormConstants'
import { addDividerToExpiryInput, addSpaceToCardInput } from '../../helpers/functions'

class CardDetailsInputs extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        addDividerToExpiryInput( $('.input__ccexpiry input') )
        addSpaceToCardInput( $('.input__cc input') )
    }

    render() {
        return (

            <div className="registration__payment--card clearfix">
                <Input className="clearfix input__cc input__left input__left--large"
                    placeholder="The Long Number"
                    ariaLabel="Card Number"
                    autocomplete="cc-number"
                    name="cardNumber"
                    value={this.props.hasSavedValue('cardNumber')}
                    pattern="[0-9 +]*"
                    maxlength="19"
                    required
                    validations={{
                        isExisty: true,
                        matchRegexp: cardNumberRegex,
                        minLength: 16
                    }} >
                </Input>

                <Input className="input__right input__ccexpiry input__right--small"
                    placeholder="Expiry (MM/YY)"
                    ariaLabel="Expiry (MM/YY)"
                    autocomplete="cc-exp"
                    name="expiry"
                    value={this.props.hasSavedValue('expiry')}
                    maxlength="5"
                    pattern="^[0-9 \/]+$"
                    required
                    validations={{
                        isExisty: true,
                        maxLength: dateLength
                    }} />
                <Input className="input__left input__left--large"
                    placeholder="Cardholder's Name"
                    ariaLabel="Carholder's Name"
                    autocomplete="cc-name"
                    name="cardholder"
                    value={this.props.hasSavedValue('cardholder')}
                    required
                    validations={{
                        isExisty: true,
                        isWords: true
                    }} />

                <CVV />
            </div>
        )
    }
}

export default CardDetailsInputs
