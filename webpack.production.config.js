/**
Run file using -
    NODE_ENV=production webpack --progress --config webpack.production.config.js
*/
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const merge                 = require('webpack-merge');
var loaders                 = require('./webpack-config/loaders')
var postcss                 = require('./webpack-config/postcss')
var resolves                = require('./webpack-config/resolves')
var externals               = require('./webpack-config/externals')
var imageWebpackLoader      = require('./webpack-config/imageWebpackLoader')
var plugins                 = require('./webpack-config/plugins')
var sassLoader              = require('./webpack-config/sassLoader')
const config                = require('./webpack.config');

module.exports = merge(config.common, {
    module: {
        loaders: [
            loaders.js,
            loaders.css,
            loaders.fonts,
            loaders.images,
            loaders.foundation,
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            }
        ]
    },

    resolve     : resolves,
    sassLoader  : sassLoader,
    postcss     : postcss,
    externals   : externals,
    plugins     : plugins.production.concat(plugins.common)
})
