var gulp = require('gulp'),
    nodemon = require('gulp-nodemon')
;

gulp.task('default', function() {
  nodemon({script: './app/server.js', ignore: 'node_modules/**/*.js'})
    .on('restart', function () {

    });
});
