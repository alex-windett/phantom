import axios        from 'axios'


/**
    * @param name   {string} - the name of the query
    * @param url    {string} - the url to search, defaults to current location

    * @return       {string} - the query value
*/
export function getQueryFromURL(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
* @param source - array of bojects to filter through
* @param id     - the ID of the item to be returned
*
* Returns object in array where ID's match
*/
export function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id === id) {
            return source[i]
        }
    }
    throw `Couldn't find object with id: ${id}`
}

export function deleteById(arr, idToRemove) {
    for ( var i = 0; i < arr.length; i++ ){
        if ( arr[i].id == idToRemove ){
            //removes 1 element at position i
            arr.splice(i, 1)
            break
        }
    }
}

/**
* @param input {element} - input to validate
*
* @returns {bool}
*/
export function isInvalidInput(input) {
    if ( input.hasClass('input__error') || input.val() === '') {
        return true
    } else {
        return false
    }
}

export function getURL(path = '') {
    return window.location.hostname + path
}

/**
* @param postcode               {string} - string to search API with
* @callback requestCallback     {string} - do something with the addreses recieved
*/
export function getPostcodes(postcode, callback = '') {
    const url = `https://api.getAddress.io/v2/uk/${postcode}?api-key=-x5yKLpFEUmtwiQorPf97g4700`
    axios.get(url)
        .then( response => {
            let addresses = response.data.Addresses
                addresses = {
                    success: true,
                    addresses
                }
            callback(addresses)
        })
        .catch( error => {
            error = {
                success: false,
                error
            }
            callback(error)
        })
}

/**
* @param postcode   {string} - string to sanatize
*
* @returns {string} -  String upercased and no spaces
*/
export function sanatizePostcode(postcode) {
    postcode = postcode.replace(/ /g, '')
    postcode = postcode.toUpperCase()
    return postcode
}

/**
* @param postcode   {string} - postcode to seach for
* @param obj        {obj} - the object to have its state state, this is usaully "this"
*
* @returns {array} -  Sets objects state to be returned array of postcodes
*/
export function getDeliveryDay(postcode, obj) {

    if ( !obj ) {
        throw 'Please pass an object as the second arguemnt to set the state, usually "this"'
    }

    axios.post(`/checkout/lookup?pc=${postcode}`)
        .then( response => {
            obj.setState({
                deliveryDay: response.data.message
            })
        })
        .catch( error => {
            obj.setState({
                deliveryDay: error.data.message
            })
        })
}

/**
    * @param input {element} - the input box to format
*/
export function addDividerToExpiryInput(input) {

    $(input).on('keyup', _ => {

        // Make sure that there are no spaces, i.e user has hit space bar
        var inputVal = $(input).val().split(' ').join('')

        // if there are characters present
        if (inputVal.length > 0) {

            // Split the values so we can count how many characters there are
            const inputValSplit = inputVal.split('')

            // If there is more the one character
            if ( inputValSplit.length > 1 ) {

                // Create a variable that only containts the first two
                let firstTwoDigits  = inputValSplit[0] + inputValSplit[1]

                // If they are greater then 12 (12 months in a year)
                // Add a divider after the first digit and prepend a 0.
                // Then set the value of the input
                if ( firstTwoDigits > 12 ) {
                    inputVal = `0${inputValSplit[0]}/${inputValSplit[1]}`

                    $(input).val(inputVal);
                    return
                }
            }

            // If the user has already added a '/' themselves, do nothing
            if ( inputVal.indexOf('/') > 0 ) {
                return
            }

            // Otherwise, the month is correct, add a '/' after the
            // second digig
            inputVal = inputVal.match(new RegExp('.{1,2}', 'g')).join('/')
            $(input).val(inputVal)
        }
    })
}

/**
    * @param input {element} - the input box to format
*/
export function addSpaceToCardInput(input) {
    var previousInputVal = $(input).val()

    $(input).on('keydown', _ => {
        var inputVal = $(input).val().split(' ').join('')

        if (inputVal.length > 0 && previousInputVal !== inputVal) {
            inputVal = inputVal.match(new RegExp('.{1,4}', 'g')).join(" ")
            $(input).val(inputVal);
        }
    })
}

export function validateUniqueEmailURL(email) {
    return `api/validate/email/${email}`
}

export function validateReferalCode(code){
    return `api/discount/${code}`
}
