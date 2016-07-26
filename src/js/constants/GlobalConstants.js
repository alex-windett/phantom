const GlobalConstants = {

    CHANGE_EVENT            : 'change',
    MAX_ORDERS              : 4,
    MIN_ORDERS              : 1,
    MIN_ADDRESSES           : 1,
    MAX_DELIVERIES_PER_PAGE : 5,
}

export const accountURL             = "/account"

// CSRF Token
export const CSRFToken              = $('meta[name="csrf_token"]').attr('content')

// Registration
export const stripePublishableKey   = $('meta[name="stripe_publishable_key"]').attr('content')
export const registrationAPIURL     = '/api/register'
export const requiredFormCountry    = 'United Kingdom'

// homepage
export const scheduleAPIURL         = '/api/schedule'

export default GlobalConstants
