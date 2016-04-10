/*global console, require, this*/
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sourcemaps = require('gulp-sourcemaps');

function logError(error) {
    'use strict';
    console.error.bind(error);
    error.emit('end');
}

// Minified JS 
// Uglify Scripts 

gulp.task('scripts', function () {
    "use strict";
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('minjs'))
        .pipe(livereload());
});

// Uglify Styles 

gulp.task('styles', function () {
    "use strict";
    return sass('sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(livereload())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('mincss'));
});


// Watch Task 
// JS and CSS
gulp.task('watch', function () {
    "use strict";
    var server = livereload();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/*.scss', ['styles']);
});

// imageMin
// Compressed img jpg,png,gif,svp

gulp.task('imgmin', function () {
    "use strict";
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'));
});



gulp.task('default', ['scripts', 'styles', 'watch', 'imgmin']);