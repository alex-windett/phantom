const path                  = require('path')
const PATHS                 = require('../webpack.config')

module.exports = sassLoader = {
    includePaths: [
        PATHS.src,
        path.resolve(__dirname),
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, PATHS.assets + 'bower_components/foundation-sites/assets/scss')
    ]
}
