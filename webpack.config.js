const path                  = require('path')
var PATHS = {
    assets      : path.join(__dirname, './'),
    src         : path.join(__dirname, './src/'),
    build       : path.join(__dirname, './build/')
}
module.exports = PATHS

module.exports = config = {

    common: {
        entry: {
            app: PATHS.src + 'index.jsx',
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
            resourcesPath: './public'
        },
        resolve: {
            root: PATHS.assets,
            modulesDirectories: ['./src', 'node_modules', PATHS.assets + 'bower_components'],
            extensions: ['', '.js', '.jsx', '.scss', '.sass']
        }
    }
}
