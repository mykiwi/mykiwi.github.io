var gulp       = require('gulp')
    jshint     = require('gulp-jshint'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    watch      = require('gulp-watch');

var src = 'app/Resources/public/';
var dst = 'web/';

// Lint Task
gulp.task('lint', function() {
    return gulp.src(root + 'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(root + 'js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {

});
