module.exports = imageWebpackLoader = {
    optimizationLevel: 4,
    pregressive: true,
    interlaced: true,
    svgo:{
        plugins: [
            {
                removeViewBox: false
            },
            {
                removeEmptyAttrs: false
            }
        ]
    }
}
