(function () {
    const gulp = require('gulp');
    const CONFIG = require('../config');

    gulp.task('node-modules', function () {
        return gulp.src('./node_modules')
            .pipe(gulp.symlink(CONFIG.buildFolder));
    });
})();