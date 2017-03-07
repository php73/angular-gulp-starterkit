(function () {
    const gulp = require('gulp');
    const fs = require('fs');
    const rmdir = require('../components/rmdir');
    const CONFIG = require('../config');

    gulp.task('clean', function (done) {
        rmdir(CONFIG.distFolder);
        done();
    });

    gulp.task('clean-dev', function (done) {
        rmdir(CONFIG.buildFolder);
        done();
    });

    gulp.task('clean-all', gulp.parallel('clean', 'clean-dev', function (done) {
        done();
    }));
})();