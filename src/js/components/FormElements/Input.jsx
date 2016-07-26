import React    from 'react'

import Formsy   from 'formsy-react'

var Input = React.createClass({

    getInitialState() {
        return {
            inputVal: ''
        }
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },

    render() {

        const additionalClasses = this.props.className || ''
        const children          = this.props.children || null
        const type              = this.props.type ? this.props.type : 'text'
        const isValidClassName  = this.isValid() ? 'input__valid' : ''
        const errorMessage      = this.getErrorMessage()
        var validationClassName = this.showRequired() ? 'input__required' : this.showError() ? 'input__error' : ''
            validationClassName = this.isPristine() ? '' : validationClassName + isValidClassName

        var errorStyle = {
            marginBottom: '16px'
        }

        return (
            <div
                className={`input ${additionalClasses}`}
                >
                <input
                    style={errorMessage ? { marginBottom: 0 } : null}
                    className={validationClassName}
                    aria-labelledby={this.props.ariaLabel}
                    type={type}
                    maxLength={this.props.maxlength || null}
                    placeholder={this.props.placeholder}
                    pattern={this.props.pattern || null}
                    onChange={this.changeValue}
                    defaultValue={this.props.value}
                    value={this.getValue()}
                    autoComplete={this.props.autocomplete}
                    />

                { errorMessage ? <p className="error" style={errorStyle}>{ errorMessage }</p> : null }

                {children}
            </div>
        );
    }
})

export default Input
