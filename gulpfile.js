var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    imagemin   = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    sass       = require('gulp-sass'),
    del        = require('del'),
    livereload = require('gulp-livereload');

var paths = {
    stylesheets : 'app/Resources/public/scss/**/*.scss',
    javascripts : 'app/Resources/public/js/**/*.js',
    images      : 'app/Resources/public/img/**/*'
};

gulp.task('clean', function(cb) {
  del(['web/build'], cb);
});

gulp.task('css', function() {
  return gulp.src(paths.stylesheets)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/build'));
});

gulp.task('js', function() {
  return gulp.src(paths.javascripts)
    .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/build'));
});

gulp.task('img', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('web/build/img'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.stylesheets, ['css']).on('change', livereload.changed);
  gulp.watch(paths.javascripts, ['js']).on('change', livereload.changed);
  gulp.watch(paths.images, ['img']).on('change', livereload.changed);
});

gulp.task('default', ['js', 'css', 'img', 'watch']);