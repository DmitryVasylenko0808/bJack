const gulp = require('gulp');
const babel = require('gulp-babel');
const { dest } = require('vinyl-fs');

module.exports = function script() {
    return gulp.src('src/script/*.js')
           .pipe(babel({
               presets: ['@babel/env']
           }))
           .pipe(dest('build'))
}

