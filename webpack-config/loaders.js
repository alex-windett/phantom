module.exports = loaders = {
    js: {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
            presets: ['es2015', 'react']
        }

    },
    css: {
        test: /\.css$/,
        loaders: [
          "css?modules=true",
          "postcss"
        ]
    },
    fonts: {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]?[hash]'
    },
    images: {
        test: /\.(gif|png|jpg|svg)$/i,
        exclude: /scss/,
        loaders: [
            'file?name=images/[path][name].[ext]&context=./resources/assets/src/images',
            'image-webpack'
        ]
    },
    foundation: {
        test: /foundation.js$/,
        loader: 'exports?foundation!imports?jquery'
    }
}
