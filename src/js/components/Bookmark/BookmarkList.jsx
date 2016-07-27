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
        this.props.edit(this.props.index, this.props.id, this.state.editedInput)
        this.setState({
            isEditing: false
        })
    }

    render() {

        return (
            <li className="bookmarklist__item">
                <a href={this.props.url ? this.props.url : '#'}>
                    {this.props.name}
                </a>

                { this.state.isEditing ?
                    <div className="clearfix">
                        <input defaultValue={this.props.name} onChange={this.inputChange.bind(this)}/>
                        <button onClick={this.submitEdit.bind(this)}>Update</button>
                    </div> : undefined }

                <footer className="clearfix">
                    <button className="button button__success" onClick={this.toggleEdit.bind(this)}>Edit</button>
                    <button className="button button__warning" onClick={ () => this.props.delete(this.props.index)}>Delete</button>
                </footer>
            </li>
        )
    }
}

class BookmarkList extends Component {

    constructor(props) {
        super(props)
        this.items          = this.props.store.bookmarks.items
        this.itemsLength    = this.items ? this.items.length : 0,
        this.itemsPerPage   = 3

        this.state = {
            inputValue: false,
            disabledButton: true,
            itemsLength: this.itemsLength,
            itemsPerPage: this.itemsPerPage,
            currentPage: 0,
            numberOfPages: Math.ceil(this.itemsLength / this.itemsPerPage),
            showEarlier: false,
            showLater: true,
            earliest: 0,
            latest: this.itemsPerPage - 1,
        }
    }

    calculatePaginateVisablity(action) {
        const   deliveriesCount   = this.state.itemsLength
        var     pageCount         = this.state.numberOfPages

        switch (action) {
            case this.increase:
                this.state.currentPage += 1
                this.setState({showEarlier: true})
                this.state.currentPage >= pageCount ? this.setState({showLater: false}) : null
                break

            case this.decrease:
                this.state.currentPage -= 1
                this.setState({showLater: true})
                this.state.currentPage <= 1 ? this.setState({showEarlier: false}) : null
                break

            default:
                return
        }
    }

    laterDeliveries(event) {
        event.preventDefault()
        this.setState({
            earliest: this.state.earliest + (this.state.itemsPerPage - 1),
            latest: this.state.latest + (this.state.itemsPerPage - 1)
        }, _ => this.calculatePaginateVisablity(this.increase) )
    }

    earlierDeliveries(event) {
        event.preventDefault()
        this.setState({
            earliest: this.state.earliest - (this.state.itemsPerPage - 1),
            latest: this.state.latest - (this.state.itemsPerPage - 1)
        }, _ => this.calculatePaginateVisablity(this.decrease) )
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

    showPagination() {
        for (let i = 0; i <= this.state.numberOfPages; i++) {
            return (
                <span>{i}</span>
            )
        }
    }

    render () {
        var earliest                = this.state.earliest
        var latest                  = this.state.latest

        if ( this.props.store.bookmarks && this.props.store.bookmarks.items ) {

            var items = this.props.store.bookmarks.items.map( (bookmark, index) => {

                if ( index >= earliest && index <= latest ) {

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
                }
            })
        } else {
            var items = 'You currently have no bookmarks'
        }

        return (
            <div>
                <h1 className="text-center">My Fabulous bookmark manager</h1>

                <form refs="addNewBookark" onSubmit={this.submitForm.bind(this)} className="form form__create">
                    <input type="text" placeholder="Add a new bookmark" onChange={this.handleInputChange.bind(this)}/>

                    <button disabled={this.state.disabledButton} className="button button__primary" type="submit" >Add a bookmark</button>
                </form>

                <h2>Check out all the bookmarks</h2>
                <ol clasName="bookmarklist">
                    {items}
                </ol>

                <footer className="clearfix">
                    { this.state.showEarlier ? <a
                        href="#"
                        onClick={this.earlierDeliveries.bind(this)}
                        className='no-link deliveries__more deliveries__more--earlier'>
                        Earlier Deliveries
                    </a> : undefined }

                    { this.state.showLater ? <a
                        href="#"
                        onClick={this.laterDeliveries.bind(this)}
                        className='no-link deliveries__more deliveries__more--later'>
                        Later Deliveries
                    </a> : undefined }
                </footer>
            </div>
        );
    }
}

// BookmarkList.contextTypes = {
//     bookmarks: React.PropTypes.array || React.PropTypes.object,
//     store: React.PropTypes.object
// };

export default BookmarkList
