const path                  = require('path')
const webpack               = require('webpack');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const LiveReloadPlugin      = require('webpack-livereload-plugin');
const BowerWebpackPlugin    = require("bower-webpack-plugin");
const NpmInstallPlugin      = require('npm-install-webpack-plugin');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const PATHS                 = require('../webpack.config')

module.exports = plugins = {
    common: [
        new ExtractTextPlugin('[name].css'),
        new BowerWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            waypoints: 'waypoints'
        }),

        /**
            Image min only occurs if image is reference in the CSS of JS
            For when it doesn,t this copies the files accross
        */
        new CopyWebpackPlugin([
            {
                // from: path.join(__dirname, PATHS.assets + './src/images/'),
                // to: path.join(__dirname, PATHS.build + './images')
                from: path.join(__dirname, '../resources/assets/src/images'),
                to: path.join(__dirname, '../public/build/images')
            }
        ])
    ],
    dev: [
        new webpack.OldWatchingPlugin(),
        new LiveReloadPlugin(),
        new NpmInstallPlugin({
            save: true
        }),
    ],
    production: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
}
