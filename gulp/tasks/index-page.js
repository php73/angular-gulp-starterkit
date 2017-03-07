(function () {
    const gulp = require('gulp');
    const CONFIG = require('../config');
    const twig = require('gulp-twig');

    function buildIndexPageTask(dev) {
        return function () {
           return gulp.src(CONFIG.indexHtmlTemplate)
                .pipe(twig({
                    data: {
                        dev: dev,
                        CONFIG: CONFIG
                    }
                }))
                .pipe(gulp.dest(dev ? CONFIG.buildFolder : CONFIG.distFolder));
        }
    }

    gulp.task('index-page', buildIndexPageTask());
    gulp.task('index-page-dev', buildIndexPageTask(true));
})();