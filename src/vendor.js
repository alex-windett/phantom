/**
    FOUNDATION IMPORTS

    As there is still some issues with importing Foundation into Webpack, we have
    to import each foundation file individually. It is worth baring in mind that
    on file may have other Foundation dependencies.
    Look at Foundation Sites 6 module docs for its dependencies.
        e.g
            - Foundation itself requires foundation.util.mediaQuery.js
            - Reveal is dependent on util.triggers.js, util.box.js and util.keyboard.js

    Make sure to also add in the SCSS in app.scss

    TODO: Look into a way that we can import the whole directory - maybe a loader
*/

import 'script!foundation-sites/js/foundation.core.js'
import 'script!foundation-sites/js/foundation.util.mediaQuery.js'
import 'script!foundation-sites/js/foundation.util.triggers.js'
import 'script!foundation-sites/js/foundation.util.box.js'
import 'script!foundation-sites/js/foundation.util.keyboard.js'
import 'script!foundation-sites/js/foundation.reveal.js'
import 'script!foundation-sites/js/foundation.util.motion.js'
import 'script!foundation-sites/js/foundation.util.timerAndImageLoader.js'
import 'script!foundation-sites/js/foundation.equalizer.js'

$(document).ready( $ => {
  $(document).foundation()
})
