var eslint = require('gulp-eslint');
var gulp = require('gulp');
var karma = require('karma');
var mocha = require('gulp-mocha');
var path = require('path');
var webpackStream = require('webpack-stream');

var eslintOptions = require('./.eslintrc.js');

gulp.task('default', function () {
  return gulp.src('frontend/src')
  .pipe(webpackStream(require('./webpack.config')))
  .pipe(gulp.dest('build/'));
});

gulp.task('test', ['test:frontend', 'test:backend']);
gulp.task('lint', ['lint:frontend', 'lint:backend']);

gulp.task('test:frontend', ['lint:frontend'], function (done) {
  new karma.Server({
    configFile: path.resolve(__dirname, 'karma.conf.js'),
    autoWatch: true,
    singleRun: !!process.env.single_run,
  }, done).start();
});

gulp.task('test:backend', ['lint:backend'], function () {
  return gulp.src('backend/**/*.spec.js', {read: false})
  .pipe(mocha());
});

gulp.task('test:backend:watch', ['test:backend'], function () {
  return gulp.watch('./backend/**/*js', ['test:backend']);
});

gulp.task('lint:frontend', function () {
  return lint(['frontend/**/*.js'], eslintOptions.getForEs2015());
});

gulp.task('lint:backend', function () {
  return lint(['backend/**/*.js', '*.js'], eslintOptions);
});

function lint(src, opts) {
  return gulp.src(src)
  .pipe(eslint(opts))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}
