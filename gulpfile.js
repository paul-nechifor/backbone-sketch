var eslint = require('gulp-eslint');
var fs = require('fs');
var gulp = require('gulp');
var karma = require('karma');
var templateBuilder = require('underscore-template-builder');
var webpackStream = require('webpack-stream');

gulp.task('default', ['templates'], function () {
    return gulp.src('frontend/src')
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(gulp.dest('build/'));
});

gulp.task('test', ['templates', 'lint'], function (done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('templates', function (cb) {
    var inDir = __dirname + '/frontend/templatesdir';
    var outFile = __dirname + '/build/templates.js'
    templateBuilder.saveModule(inDir, outFile, cb);
});

gulp.task('lint', function () {
    return gulp.src(['frontend/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
