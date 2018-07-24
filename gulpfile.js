/* global require */
const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');


/**
 * Clean up by deleting old files
 */
gulp.task('clean', () => {
  del.sync([ 'dist' ]);
});


/**
 * Compile JS into one JS file suitable to run on browser
 */
gulp.task('build:js', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

/**
 * Build both
 */
gulp.task('build', [ 'build:js' ] );


/**
 * Default
 */
gulp.task('default', [ 'clean', 'build' ]);
