import './scss/app'

import React        from 'react'
import { render }   from 'react-dom'
import { devTools } from './devTools'
import Register     from './js/Register'
// import ThisWeeksFlowers     from './js/ThisWeeksFlowers'
// import Account from './js/Account'

// const registration  = $('#registration')
// const account       = $('#account')
// const thisWeeksFlowers = $('#thisWeeksFlowers')

// const isDev         = window.location.hostname.indexOf('.dev') > 0
// isDev ? devTools() : null

render(
    <Register />,
    document.getElementById('registration')
)

// if ( thisWeeksFlowers.length > 0 ) {
//     render(
//         <ThisWeeksFlowers />,
//         document.getElementById('thisWeeksFlowers')
//     )
// }

//
// if ( account.length > 0 ) {
//     render(
//         <Account />,
//         document.getElementById('account')
//     )
// }
