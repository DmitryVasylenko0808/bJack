const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssclean = require('gulp-clean-css');
// const {styles} = require('./gulp/tasks');
// const script = require('./gulp/tasks/script');

function styles() {
    return gulp.src('src/*.css')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(cssclean())
           .pipe(gulp.dest('build/css'));
}

module.exports.style = styles

module.exports.default = gulp.series(styles);