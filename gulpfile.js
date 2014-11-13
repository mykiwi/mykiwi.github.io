var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    imagemin   = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    sass       = require('gulp-sass'),
    del        = require('del'),
    livereload = require('gulp-livereload');

var asset  = 'app/Resources/public/';
var view   = 'app/Resources/views/';
var vendor = 'vendor_frontend/';

var paths = {
    stylesheets : asset + 'scss/**/*.scss',
    javascripts : [vendor + 'jquery/dist/jquery.js', vendor + 'anchorify/src/anchorify.js', vendor + 'ace-builds/src-noconflict/ace.js', asset + 'js/**/*.js'],
    images      : asset + 'img/**/*.{png,jpg,gif}',
    fonts       : [vendor + 'font-awesome/fonts/*.{ttf,woff,eof,svg}', vendor + 'devicons/fonts/*.{ttf,woff,eof,svg}'],
    templates   : view + '**/*.html.twig'
};

gulp.task('clean', function(cb) {
  del(['web/build'], cb);
});

gulp.task('css', function() {
  return gulp.src(paths.stylesheets)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', function (err) {
        var displayErr = gutil.colors.red(err);
        gutil.log(displayErr);
        gutil.beep();
      })
      .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/build'))
    .pipe(livereload({ auto: false }));
});

gulp.task('js', function() {
  return gulp.src(paths.javascripts)
    .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/build'))
    .pipe(livereload({ auto: false }));
});

gulp.task('img', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('web/build/img'))
    .pipe(livereload({ auto: false }));
});

gulp.task('font', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('web/build/font'))
    .pipe(livereload({ auto: false }));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.stylesheets, ['css']);
  gulp.watch(paths.javascripts, ['js']);
  gulp.watch(paths.images, ['img']);
  gulp.watch(paths.templates).on('change', livereload.changed);
});

gulp.task('default', ['js', 'css', 'img', 'font']);