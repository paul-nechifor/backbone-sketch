var eslint = require('gulp-eslint');
var fs = require('fs');
var gulp = require('gulp');
var karma = require('karma');
var webpackStream = require('webpack-stream');

gulp.task('default', function () {
    return gulp.src('frontend/src')
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(gulp.dest('build/'));
});

gulp.task('test', ['lint'], function (done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        autoWatch: true,
        singleRun: !!process.env.single_run,
    }, done).start();
});

gulp.task('lint', function () {
    return gulp.src(['frontend/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
