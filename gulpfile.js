const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssclean = require('gulp-clean-css');

const babel = require('gulp-babel');
const terser = require('gulp-terser');

const server = require('browser-sync').create();

function styles() {
    return gulp.src('src/style/*.scss')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(concat('styledef.min.css'))
           .pipe(cssclean())
           .pipe(gulp.dest('build/css'));
}

function script(cb) {
    gulp.src('src/script/*.js')
    .pipe(babel(
        { presets: ['@babel/env'] }
    ))
    .pipe(terser())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('build/js'));
    return cb();
}

function serve(cb) {
    server.init({
        server: './',
        notify: false,
        open: true,
        cors: true
    });

    gulp.watch('src/style/*.scss', gulp.series(styles, cb => 
        gulp.src('build/css').pipe(server.stream()).on('end', cb)));

    gulp.watch('src/script/*.js', gulp.series(script)).on('change', server.reload);

    return cb();
}

module.exports.style = styles;
module.exports.script = script;
module.exports.serve = serve;

module.exports.default = gulp.series(styles, script, serve);