(function () {
    const gulp = require('gulp');
    const sass = require('gulp-sass');
    const concat = require('gulp-concat');
    const autoprefixer = require('gulp-autoprefixer');
    const sourcemaps = require('gulp-sourcemaps');
    const uglifycss = require('gulp-uglifycss');
    const CONFIG = require('../config');

    function sassTask(dev) {
        return function () {
            var css;

            css = gulp.src(CONFIG.sassFolder+'/**.scss');

            if (dev) {
                css = css.pipe(sourcemaps.init())
            }

            css = css.pipe(sass().on('error', sass.logError));
            css = css.pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }));

            if (dev) {
                css = css.pipe(sourcemaps.write('.'));
            } else {
                css = css.pipe(uglifycss({uglyComments: true}));
                css = css.pipe(concat('app.min.css'));
            }

            return css.pipe(gulp.dest((dev ? CONFIG.buildFolder : CONFIG.distFolder)+'/'+CONFIG.sassTargetFolder));
        }
    }

    gulp.task('sass', sassTask());

    gulp.task('sass-dev', sassTask(true));
})();