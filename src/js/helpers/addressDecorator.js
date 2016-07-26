export class AddressDecorator {

    constructor(address) {
        this.address = address.split(', ')
        return this
    }

    addressLineOne() {
        return this.address[0]
    }

    addressLineTwo() {
        return this.address[1]
    }

    addressLineThree() {
        return this.address[2]
    }

    addressLineFour() {
        return this.address[3]
    }

    locality() {
        return this.address[4]
    }

    town() {
        return this.address[5]
    }

    county() {
        return this.address[6]
    }

    toString() {
        return this.address
    }
}
