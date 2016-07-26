const autoprefixer          = require('autoprefixer');

module.exports = postcss = {
    defaults: [ autoprefixer ],
    cleaner:  [
        autoprefixer({
            browsers: [
                'last 3 versions',
                '> 5%',
                'Explorer >= 9'
            ]
        }).info()
    ]
}
