var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint')
;

gulp.task('serve', function() {
  nodemon({script: './app/server.js', ignore: 'node_modules/**/*.js'})
    .on('restart', function () {

    });
});


// lint out JavaScript
gulp.task('lint', function () {
  return gulp.src('./app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});


gulp.task('default', ['lint', 'serve']);
