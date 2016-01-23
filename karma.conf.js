module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['mocha', 'coverage'],
    browsers: ['PhantomJS'],

    basePath: '',
    files: [
      'frontend/test.entrypoint',
      'build/bower/bootswatch-dist/js/bootstrap.min.js',
      {
        pattern: './build/**/*',
        included: false,
        served: true,
        watched: false,
        nocache: true,
      },
    ],

    preprocessors: {
      'frontend/test.entrypoint': ['webpack', 'sourcemap'],
    },
    webpack: require('./webpack.config.js').alter.getTestingConfig(),
    webpackServer: {noInfo: true},

    coverageReporter: {type: 'html', dir: 'build/coverage/'},
    proxies: {
      '/bower/': '/base/build/bower/',
    },
  });
};
