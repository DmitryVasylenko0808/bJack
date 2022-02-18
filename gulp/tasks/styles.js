const gulp = require('gulp');
const sass = require('gulp-sass');

exports.default = function styles() {
    return gulp.src('src/styles/*.css')
           .pipe(sass())
           .pipe(dest('build'));
}