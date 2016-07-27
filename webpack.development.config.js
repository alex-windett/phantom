/**
Run file using -
    webpack --progress --config webpack.development.config.js
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
    debug: true,
    module: {
        loaders: [
            loaders.js,
            loaders.css,
            loaders.fonts,
            loaders.images,
            loaders.foundation,
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css?sourceMap', 'postcss', 'sass?sourceMap'])
            }
        ]
    },

    resolve             : resolves,
    // postcss             : postcss,
    sassLoader          : sassLoader,
    // imageWebpackLoader  : imageWebpackLoader,
    // externals           : externals,
    // devtool             : "source-map",
    watch               : true,
    plugins             : plugins.dev.concat(plugins.common)
});
