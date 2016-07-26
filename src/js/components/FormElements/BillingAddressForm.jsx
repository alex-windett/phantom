import React        from 'react'
import axios        from 'axios'

import Formsy       from 'formsy-react'
import Input        from './Input'
import DropdownSelect        from './DropdownSelect'

import { AddressDecorator } from '../../helpers/addressDecorator'
import { isInvalidInput, getPostcodes, sanatizePostcode, getDeliveryDay } from '../../helpers/functions'
import { postcodeRegex } from '../../constants/FormConstants'

const BillingAddressForm = React.createClass({

    getInitialState() {
        return {
            addressSelects: false,
            postcodeError: false,
            postcodeSearchDisabled: true
        }
    },

    componentWillReceiveProps() {
        this.setState({
            postcodeSearchDisabled: isInvalidInput( $('.input__postcode--billing').find('input') )
        })
    },

    handlePostcode(event) {
        event.preventDefault()
        var postcode    = $('.input__postcode--billing').find('input').val()
            postcode    = sanatizePostcode(postcode)

        const postcodes = getPostcodes(postcode, data => {
            if ( data.success ) {
                let addresses = data.addresses
                    // addresses = addresses.sort(function(a, b) {
                    //     var numA = a.split(" ")[0]
                    //     var numB = b.split(" ")[0]
                    //     return numA - numB;
                    // })
                if ( addresses ) {
                    this.setState({
                        addressSelects: true,
                        postcodeError: false,
                        searchedPostcodes: addresses
                    })

                    let options = []

                     addresses.forEach( (address, index) => {
                        const address1          = new AddressDecorator(address).addressLineOne()
                        const address2          = new AddressDecorator(address).addressLineTwo()
                        const displayAddress2   = address2 ? `, ${address2}` : ''
                        const displayAddress    = address1 + displayAddress2
                        options.push(`<option class="dynamic" value=${index}>${displayAddress}</option>`)
                    })

                    $('.postcodeSelect--billing').find('.dynamic').remove()
                    $('.postcodeSelect--billing').append(options)
                }
                getDeliveryDay(postcode, this)
            } else {
                this.setState({
                    postcodeError: true,
                    addressSelects: false
                })
            }
        })
    },

    handleSelectToggle(event) {
        const selectedAddress   = parseInt(event.target.value)

        this.setState({
            chosenAddress: selectedAddress,
        }, _ => {

            let userAddress = this.state.searchedPostcodes.filter( (address, index) => {
                if ( selectedAddress === index ) {
                    return address
                }
            })
            userAddress        = userAddress[0]
            const address1     = new AddressDecorator(userAddress).addressLineOne()
            let address2       = new AddressDecorator(userAddress).addressLineTwo()
                address2       = address2 === ' ' ? '' : address2
            const town         = new AddressDecorator(userAddress).town()
            this.setState({
                chosenAddress: {
                    address1,
                    address2,
                    town
                }
            })
        })
    },

    render() {

        const buttonAdditionalStyle = {
            marginBottom: "16px"
        }

        return (
            <div className="registration__payment--billing clearfix">

                <Input type="hidden"
                    name="hasDifferentBillingAddress"
                    value="true"
                    />

                <Input className="clearfix input__left"
                    ariaLabel="First Name"
                    placeholder="First Name"
                    autocomplete="cc-given-name"
                    name="firstNameBilling"
                    value={this.props.hasSavedValue('firstNameBilling')}
                    required
                    validations={{
                        isExisty: true
                    }} >
                </Input>

                <Input className="input__right"
                    placeholder="Last Name"
                    ariaLabel="Last Name"
                    autocomplete="cc-family-name"
                    name="lastNameBilling"
                    value={this.props.hasSavedValue('lastNameBilling')}
                    required
                    validations={{
                        isExisty: true
                    }} />

                <div className="clear"></div>

                <Input className="clearfix input__left input__postcode input__postcode--billing"
                    placeholder="Postcode"
                    ariaLabel="Postcode"
                    autocomplete="billing postal-code"
                    name="postcodeBilling"
                    value={this.props.hasSavedValue('postcodeBilling')}
                    required
                    validations={{
                        isExisty: true,
                        matchRegexp: postcodeRegex
                    }}
                    validationErrors={{
                        matchRegexp: `Please enter a valid UK postcode`
                    }} />

                <button
                    style={buttonAdditionalStyle}
                    onClick={this.handlePostcode}
                    type='button'
                    className="button button__secondary input__right"
                    disabled={this.state.postcodeSearchDisabled}>
                    Find Address
                </button>

                <div className="clear"></div>

                { this.state.addressSelects ?
                    <select
                        className="postcodeSelect--billing"
                        onChange={this.handleSelectToggle}
                        value={this.state.chosenShippingAddressValue}>
                            <option>Please select an address...</option>
                        </select>
                    : undefined }

                {this.state.postcodeError ? <p className="error">Sorry, we don't know of any addresses at that postcode. If it's correct, please enter your address manually.</p> : undefined}

                <Input className="input__left input__address1--billing"
                    placeholder="Address Line 1"
                    ariaLabel="Address Line 1"
                    autocomplete="billing address-line1"
                    name="address1Billing"
                    value={this.state.chosenAddress ? this.state.chosenAddress.address1 : this.props.hasSavedValue('address1Billing') }
                    validations={{
                        isExisty: true
                    }} />

                <Input className="input__right input__address2--billing"
                    placeholder="Address Line 2"
                    ariaLabel="Address Line 2"
                    autocomplete="billing address-line2"
                    name="address2Billing"
                    value={this.state.chosenAddress ? this.state.chosenAddress.address2 : this.props.hasSavedValue('address2Billing') }
                    />

                <div className="clear"></div>

                <Input className="input__left input__town--billing"
                    placeholder="Town or City"
                    ariaLabel="Town or City"
                    autocomplete="billing address-level2"
                    name="townBilling"
                    value={this.state.chosenAddress ? this.state.chosenAddress.town : this.props.hasSavedValue('townBilling')}
                    validations={{
                        isExisty: true
                    }} />
            </div>
        )
    }
})

export default BillingAddressForm
