import React, { Component }             from 'react'
import { validateStringAsURL }          from '../../helpers/functions'

class BookmarkItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            editedInput: this.props.name,
        }
    }

    inputChange(event) {
        this.setState({
            editedInput: event.target.value
        })
    }

    toggleEdit() {
        this.setState({
            isEditing: this.state.isEditing ? false : true
        })
    }

    submitEdit() {
        this.props.edit(this.props.index, this.props.id, this.state.editedInput)
        this.setState({
            isEditing: false
        })
    }

    render() {

        return (
            <li className="bookmarklist__item">
                <a target="_blank" href={this.props.name ? this.props.name : '#'}>
                    <strong>{this.props.displayName ? `${this.props.displayName} - ` : undefined }</strong>{this.props.name}
                </a>

                { this.state.isEditing ?
                    <div className="clearfix" className="bookmarklist__item--edit">
                        <input defaultValue={this.props.name} onChange={this.inputChange.bind(this)} type="text"/>
                        <button type="button" className="button button__success" onClick={this.submitEdit.bind(this)}>Update</button>
                    </div> : undefined }

                <footer>
                    <i  className="icon-pencil pointer"
                        onClick={this.toggleEdit.bind(this)}></i>

                    <i
                        className="icon-trash-empty pointer"
                        onClick={ () => this.props.delete(this.props.index)}></i>
                </footer>
            </li>
        )
    }
}

export default BookmarkItem
