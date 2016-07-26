import React        from 'react'
import axios        from 'axios'
// var naturalSort = require('javascript-natural-sort')
// import { naturalSort } from 'javascript-natural-sort'

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
            chosenAddress: '',
            postcodeError: false,
            deliveryDay: false,
            postcodeSearchDisabled: true
        }
    },

    componentWillReceiveProps() {
        const input = $('.input__postcode--shipping').find('input')
        this.setState({
            postcodeSearchDisabled: isInvalidInput( input )
        })
        this.checkDeliveryDay( input )
    },

    handlePostcode(event) {
        event.preventDefault()
        var postcode = $('.input__postcode--shipping').find('input').val()
            postcode = sanatizePostcode(postcode)

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
                        options.push(`<option value=${index}>${displayAddress}</option>`)
                    })

                    $('.postcodeSelect--shipping').find('option:not(:first)').remove()
                    $('.postcodeSelect--shipping').append(options)
                }
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

    deliveryStatus() {
        if (this.state.deliveryDay) {
            return (
                <p className="text-center clear" dangerouslySetInnerHTML={{__html: this.state.deliveryDay}}  />
            )
        } else {
            return (
                <p className="clear small text-center">Enter your postcode to find out your delivery day</p>
            )
        }
    },

    checkDeliveryDay(input) {
        const val = input.val()
        if ( postcodeRegex.test( val ) ) {
            getDeliveryDay(val, this)
        }
    },

    render() {

        const buttonAdditionalStyle = {
            marginBottom: "16px"
        }

        return (
            <div className="registration__payment--shipping clearfix">
                <Input className="clearfix input__left input__postcode input__postcode--shipping"
                    placeholder="Postcode"
                    ariaLabel="Postcode"
                    autocomplete="shipping postal-code"
                    name="postcode"
                    value={this.props.hasSavedValue('postcode')}
                    required
                    validations={{
                        isExisty: true,
                        matchRegexp: postcodeRegex
                    }}
                    validationErrors={{
                        matchRegexp: `Please enter a valid UK postcode`
                    }}
                    />

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
                        className="postcodeSelect--shipping"
                        onChange={this.handleSelectToggle}
                        value={this.state.chosenShippingAddressValue}>
                            <option>Please select an address...</option>
                        </select>
                    : undefined }

                {this.state.postcodeError ? <p className="error">There was an error with your postcode please try again</p> : undefined}

                <Input className="input__left input__address1"
                    placeholder="Address Line 1"
                    ariaLabel="Address Line 1"
                    autocomplete="shipping address-line1"
                    name="address1Shipping"
                    value={this.state.chosenAddress ? this.state.chosenAddress.address1 : this.props.hasSavedValue('address1Shipping')}
                    required
                    validations={{
                        isExisty: true,
                    }}
                    />
                <Input className="input__right input__address2"
                    placeholder="Address Line 2"
                    ariaLabel="Address Line 2"
                    autocomplete="shipping address-line2"
                    name="address2Shipping"
                    value={this.state.chosenAddress ? this.state.chosenAddress.address2 : this.props.hasSavedValue('address2Shipping')}
                    />

                <div className="clear"></div>

                <Input className="input__left input__town"
                    placeholder="Town or City"
                    ariaLabel="Town or City"
                    autocomplete="shipping address-level2"
                    name="town"
                    value={this.state.chosenAddress ? this.state.chosenAddress.town : this.props.hasSavedValue('town')}
                    required
                    validations={{
                        isExisty: true
                    }} />

                <Input className="input__right"
                    placeholder="Delivery Instructions"
                    ariaLabel="Delivery Instructions"
                    value={this.props.hasSavedValue('deliveryInstructions')}
                    name="deliveryInstructions" />

                { this.deliveryStatus() }
            </div>
        )
    }
})

export default BillingAddressForm
