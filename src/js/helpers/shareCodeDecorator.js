import { getURL } from './functions'

export class ShareCodeDecorator {

    constructor(code) {
        this.code = code
        return this
    }

    getTwitterURL() {
        return `http://www.twitter.com/share?url=hwww.freddiesflowers.com&text=Sign+up+for+a+bunch+of+free+flowers+using+my+invitation+code+at+${this.code}+${getURL(`/invite/email/${this.code}`)}`
    }

    getFacebookURL() {
        return 'https://www.facebook.com/sharer/sharer.php?u=http%3A//www.freddiesflowers.com/'
    }

    getEmailContent() {
        return `mailto:?subject=Fancy free flowers?&body=I've signed up to have Freddie's Flowers delivered every week for just £20 a pop. If you fancy giving it a whirl – with free flowers for the first week! – just sign up using my offer code ${ this.code }. You can do that, or find out more, right here: ${ window.location.hostname }/invite/email/${ this.code }`
    }

    getSMSContet() {
        return 'sms'
    }

    getCode() {
        return this.code
    }
}
