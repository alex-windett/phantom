import Input from './Input'
import React from 'react';

import Modal from 'simple-react-modal'

const CVV = React.createClass({

    // CVV has a modal reveal. There are issues manipulating the DOM with
    // both React and JQuery (as Foundation does), so this is being used
    // instead https://github.com/Legitcode/modal

    getInitialState() {
        return {
            show: ''
        };
    },

    show(){
        this.setState({show: true})
    },

      close(){
        this.setState({show: false})
    },

    render() {
        return (
            <Input
                className="input__right input__right--small input__cvv"
                placeholder="Security code"
                ariaLabel="Security Code"
                autocomplete="cc-csc"
                name="cvv"
                maxlength="4"
                type="number"
                required
                validations={{
                    isExisty: true,
                    isNumeric: true,
                    minLength: 3,
                    maxLength: 4
                }}
                >
                 <a
                    href="#"
                    onClick={this.show}
                    role="link"
                    tabIndex="2"
                    aria-label="Open CVV Information"
                    className="button button__secondary input__cvv--trigger no-link"
                    >?</a>

                 <Modal
                   className="reveal reveal__cvv"
                   containerClassName="reveal__container"
                   closeOnOuterClick={true}
                   show={this.state.show}
                   onClose={this.close}
                   >

                       <span onClick={this.close} aria-label="Close CVV Information" className="button button__primary reveal__close no-link">X</span>
                       <h3>The last three digits on the back of your card</h3>

                   </Modal>
            </Input>
        )
    }
})

export default CVV
