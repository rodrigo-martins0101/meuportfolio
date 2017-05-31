var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('./src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('templates', function() {
 
  gulp.src('./src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
});


gulp.task('browser-watch', ['templates','sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['sass','templates'], function() {

  browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });

  gulp.watch(['./src/scss/**/*.scss'], ['browser-watch']);
  gulp.watch(['./src/jade/**/*.jade'], ['browser-watch']);
});


