const gulp = require('gulp')

const styles = require('./styles');
const script = require('./script');

const server = require('browser-sync').create();

module.exports = function serve() {
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch()
}