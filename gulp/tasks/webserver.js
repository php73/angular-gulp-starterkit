(function (undefined) {
    const gulp = require('gulp');
    const server = require('gulp-server-livereload');
    const argv = require('yargs').argv;
    const CONFIG = require('../config');

    var defaultHost = '127.0.0.1';
    var defaultPort = '4200';
    var livereload = argv.livereload !== undefined ? argv.livereload : true;

    var gServer = {
        host: argv.host || defaultHost,
        port: argv.port || defaultPort,
        livereload: {
            enable: livereload
        },
        directoryListing: false,
        open: livereload
    };

    gulp.task('webserver', gulp.parallel('watch', function () {
        gulp.src(CONFIG.buildFolder).pipe(server(gServer));
    }));
})();