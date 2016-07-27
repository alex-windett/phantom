import React, { Component }            from 'react'

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
        this.props.edit(this.props.index, this.state.editedInput)
        this.setState({
            isEditing: false
        })
    }

    render() {

        return (
            <li>
                <a href={this.props.url ? this.props.url : '#'}>
                    {this.props.name}
                </a>

                { this.state.isEditing ?
                    <div>
                        <input defaultValue={this.props.name} onChange={this.inputChange.bind(this)}/>
                        <button onClick={this.submitEdit.bind(this)}>Update</button>
                    </div> : undefined }

                <button className="button button__primary" onClick={this.toggleEdit.bind(this)}>Edit</button>
                <button className="button button__primary" onClick={ () => this.props.delete(this.props.index)}>Delete</button>
            </li>
        )
    }
}

class BookmarkList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: false,
            disabledButton: true
        }

    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        }, _ => this.checkButton() )
    }

    checkButton() {
        this.setState({
            disabledButton: this.state.inputValue !== '' ? false : true
        })
    }

    submitForm(event) {
        event.preventDefault()
        this.props.store.savedFormData(this.state.inputValue)
        this.props.nextStep()
    }


    render () {
// debugger
        const items = this.props.store.bookmarks.map( (bookmark, index) => {

            return (
                <BookmarkItem
                    {...bookmark}
                    key={index}
                    edit={this.props.store.editBookmark}
                    delete={this.props.store.deleteBookmark}
                    bookmarks={this.props.store.bookmarks}
                    index={index}
                    />
            )
        })

        return (
            <div className="decoration decoration__plain registration__form">
                <h1>List of all the bookmarks</h1>

                <form refs="addNewBookark" onSubmit={this.submitForm.bind(this)}>
                    <input type="text" placeholder="Add a new bookmark" onChange={this.handleInputChange.bind(this)}/>

                    <button disabled={this.state.disabledButton} className="button button__primary" type="submit" >Add a bookmark</button>
                </form>

                <h2>Check out all the bookmarks</h2>
                <ol>
                    {items}
                </ol>
            </div>
        );
    }
}

// BookmarkList.contextTypes = {
//     bookmarks: React.PropTypes.array || React.PropTypes.object,
//     store: React.PropTypes.object
// };

export default BookmarkList
