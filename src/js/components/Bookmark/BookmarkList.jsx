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

class BookmarkList extends Component {

    constructor(props) {
        super(props)
        this.increase       = 'increase'
        this.decrease       = 'decrease'
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
            inputValid: true,
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
        var value = event.target.value
        this.setState({
            inputValue: event.target.value,
            inputValid: validateStringAsURL(value),
        }, _ => {
            this.checkButton()
        })
    }

    checkButton() {
        this.setState({
            disabledButton: this.state.inputValid ? false : true
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

    showInputErrors() {
        if ( !this.state.inputValid ) {
            return (
                <p clasName="error">That doesn't seem to be a valid url</p>
            )
        }

        return
    }

    jumpToPage(pageNumber) {
        this.setState({
            currentPage: pageNumber
        })
    }

    getResultsPerPage(event) {
        // Needs refactoring
        var val = event.target.value
        if ( val !== '' ) {
            this.setState({
                itemsPerPage: parseInt(val),
                numberOfPages: Math.ceil(parseInt(val) / this.itemsPerPage),
                latest: parseInt(val) - 1,
            })
        }
    }

    render () {
        var earliest                = this.state.earliest
        var latest                  = this.state.latest

        if ( this.props.store.bookmarks && this.props.store.bookmarks.items ) {
            var items   = this.props.store.bookmarks.items
                items   = items.reverse() // Get reverse order i.e newest first
                items   = this.props.store.bookmarks.items.map( (bookmark, index) => {

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

        var paginateNumbers = []
        for (var i = 0; i <= this.state.numberOfPages; i++) {
            // Todo: add in links to jump between pages
            paginateNumbers.push(
                <li key={i} className={`items__more paginate__item ${i === this.state.currentPage ? 'paginate__item--active' : ''} `}>
                    {/*<a href="#" onClick={() => this.jumpToPage(i - 1)}>*/}
                        {i + 1}
                    {/*</a>*/}
                </li>
            )
        }

        return (
            <div>
                <h1 className="text-center">React - Redux Bookmark Manager</h1>

                <input type="number" onChange={this.getResultsPerPage.bind(this)} placeholder="How many would you like to paginate by (default 3)" />

                <form refs="addNewBookark" onSubmit={this.submitForm.bind(this)} className="form form__create">
                    <input type="text" placeholder="Add a new bookmark" onChange={this.handleInputChange.bind(this)}/>

                    {this.showInputErrors()}

                    <button disabled={this.state.disabledButton} className="button button__success" type="submit" >Add a bookmark</button>
                </form>

                <h2>Check out all the bookmarks</h2>
                <ol className="bookmarklist">
                    {items}
                </ol>

                <footer className="clearfix bookmarklist__footer">


                    <ul className="plainlist paginate">
                        { this.state.showEarlier ? <li className="items__more paginate__item"><a
                            href="#"
                            onClick={this.earlierDeliveries.bind(this)}
                            className='no-link items__more paginate__item'>
                            &#60;
                        </a></li> : undefined }

                        {paginateNumbers}

                        { this.state.showLater ? <li className="items__more paginate__item"><a
                            href="#"
                            onClick={this.laterDeliveries.bind(this)}
                            className='no-link items__more paginate__item' >
                            &#62;
                        </a></li> : undefined }
                    </ul>
                </footer>
            </div>
        );
    }
}

export default BookmarkList
