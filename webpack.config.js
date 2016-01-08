var path = require('path');
var webpack = require('webpack');

var debug = !!process.env.debug;

var babelLoader = {
    test: /.*/,
    exclude: /(node_modules|build\/bower)/,
    loader: 'babel',
    query: {presets: ['es2015'], compact: !debug, cacheDirectory: true},
};

var alterConfig = {
    ignoreSourceInBabel: function () {
        babelLoader.exclude = /(node_modules|build\/bower|frontend\/src)/;
    },
    instrumentSource: function () {
        config.module.postLoaders = [{
            test: /.*/,
            include: path.resolve('./frontend/src'),
            loader: 'babel-istanbul-instrumenter',
        }];
    },
    noEntryAndOutput: function () {
        delete config['entry'];
        delete config['output'];
    },

    getTestingConfig: function () {
        alterConfig.ignoreSourceInBabel();
        alterConfig.instrumentSource();
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
        loaders: [babelLoader],
        postLoaders: [],
    },
    resolve: {
        modulesDirectories: ['', 'frontend', 'node_modules'],
    },
    plugins: [],
    alterConfig: alterConfig,
};

if (!debug) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {warnings: false},
        comments: false,
    }));
}

module.exports = config;
