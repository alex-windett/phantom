const path                  = require('path')
const webpack               = require('webpack');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const LiveReloadPlugin      = require('webpack-livereload-plugin');
const BowerWebpackPlugin    = require("bower-webpack-plugin");
const NpmInstallPlugin      = require('npm-install-webpack-plugin');
const PATHS                 = require('../webpack.config');
const ClosureCompilerPlugin = require('closure-compiler-webpack-plugin');

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

         new ClosureCompilerPlugin({
            compilation_level: 'ADVANCED',
            create_source_map: false
            // Use 'create_source_map: false' to override your webpack
            // config. Otherwise, anything you set for this option will be
            // ignored in favour of your 'devtool' and filename configuration.
        })
    ],
    dev: [
        new webpack.OldWatchingPlugin(),
        new LiveReloadPlugin(),
        new NpmInstallPlugin({
            save: true
        }),
    ],
    production: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false }
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
}
