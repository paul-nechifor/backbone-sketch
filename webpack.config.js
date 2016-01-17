var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require('webpack');

var babelLoader = {
    test: /.*\.js$/,
    exclude: /(node_modules|build\/bower)/,
    loader: 'babel',
    query: {presets: ['es2015'], compact: true, cacheDirectory: true},
};

var alterConfig = {
    ignoreSourceInBabel: function () {
        babelLoader.test = /.*\.spec\.js$/;
    },
    instrumentSource: function () {
        config.module.postLoaders = [{
            test: /.*\.js$/,
            include: path.resolve('./frontend'),
            loader: 'babel-istanbul-instrumenter',
        }];
    },
    noEntryAndOutput: function () {
        delete config['entry'];
        delete config['output'];
    },

    getTestingConfig: function () {
        if (process.env.single_run) {
            alterConfig.ignoreSourceInBabel();
            alterConfig.instrumentSource();
        }
        alterConfig.noEntryAndOutput();
        return config;
    },
};

var config = {
    entry: './frontend',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            babelLoader,
            {
                test: /\.jade$/,
                loader: 'jade-ejs-loader?variable=d',
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader', 'css-loader!stylus-loader'
                ),
            },
        ],
        postLoaders: [],
    },
    resolve: {
        modulesDirectories: ['', 'frontend', 'node_modules'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'underscore',
        }),
        new ExtractTextPlugin('bundle.css', {allChunks: true}),
    ],
    stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl'],
    },
    alterConfig: alterConfig,
};

if (process.env.uglify) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {warnings: false},
        comments: false,
    }));
}

module.exports = config;
