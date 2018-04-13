'use strict';

//dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';

//Compile SCSS
gulp.task('compile_scss', function() {
  gulp.src(SCSS_SRC)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min'}))
  .pipe(changed(SCSS_DEST))
  .pipe(gulp.dest(SCSS_DEST));

});

//detect changes in SCSS
gulp.task('watch_scss',function() {
  gulp.watch(SCSS_SRC,['compile_scss']);
});

//Run tasks
gulp.task('default', ['watch_scss']);