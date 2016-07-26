import React        from 'react'
import Formsy       from 'formsy-react'

const DropdownSelect = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function(event) {
       var target = event.currentTarget;
       var value;
       if ( this.props.multiple ) {
           value = [];
           for (var i = 0; i < target.length; i++){
               var option = target.options[i];
               if (option.selected) {
                   value.push(option.value);
               }
           }
       } else {
           value = target.value;
       }
       this.setValue(value);
    //    this.props.onChange(this.props.name, value);
   },

    render() {

        return (
            <select
                className={`${this.props.className} dropdown`}
                name={this.props.name}
                value={this.getValue()}
                onChange={this.changeValue} >
                {this.props.children}
            </select>
        )
    }
})

export default DropdownSelect
