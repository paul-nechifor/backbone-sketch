var eslint = require('gulp-eslint');
var gulp = require('gulp');
var karma = require('karma');
var path = require('path');
var webpackStream = require('webpack-stream');

var eslintOptions = require('./.eslintrc.js');

gulp.task('default', function () {
    return gulp.src('frontend/src')
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(gulp.dest('build/'));
});

gulp.task('test', ['lint'], function (done) {
    new karma.Server({
        configFile: path.resolve(__dirname, 'karma.conf.js'),
        autoWatch: true,
        singleRun: !!process.env.single_run,
    }, done).start();
});

gulp.task('lint', ['lint:frontend', 'lint:backend']);

gulp.task('lint:frontend', function () {
    return gulp.src(['frontend/**/*.js'])
    .pipe(eslint(eslintOptions.getForEs2015()))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:backend', function () {
    // return gulp.src(['backend/**/*.js', '*'])
    return gulp.src(['backend/**/*.js', '*.js'])
    .pipe(eslint(eslintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
